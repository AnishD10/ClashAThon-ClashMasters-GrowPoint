const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp-relay.brevo.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Email transporter verification failed:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

exports.register = async (req, res) => {
  try {
    const { name, email, password, education_level } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already registered" });
    }

    user = await User.create({
      name,
      email,
      password,
      education_level,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        education_level: user.education_level,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        education_level: user.education_level,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Please provide email" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user found with this email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.passwordResetToken = crypto.createHash("sha256").update(otp).digest("hex");
    user.passwordResetExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    console.log("🔐 Sending OTP to:", user.email);
    console.log("📧 Email Config:", {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      from: process.env.EMAIL_FROM
    });

    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"KnowYourPotential" <noreply@knowyourpotential.com>',
        to: user.email,
        subject: "Password Reset OTP",
        html: `
          <h2>Password Reset Request</h2>
          <p>Your OTP for password reset is:</p>
          <h1 style="font-size: 32px; color: #4F46E5;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      });

      console.log("✅ Email sent successfully!");
      console.log("📬 Message ID:", info.messageId);
      console.log("📊 Response:", info.response);

      // In development mode, return OTP for testing
      const response = {
        success: true,
        message: "OTP sent to your email",
      };

      if (process.env.NODE_ENV === "development") {
        response.otp = otp;
        response.devNote = "OTP included in response for development testing";
        console.log("🔓 DEV MODE - OTP:", otp);
      }

      res.status(200).json(response);
    } catch (emailError) {
      console.error("Email Error Details:", emailError);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      return res.status(500).json({ 
        error: "Error sending email. Please try again.",
        details: emailError.message 
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Please provide email and OTP" });
    }

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      email,
      passwordResetToken: hashedOtp,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const resetToken = jwt.sign(
      { id: user._id, purpose: "password-reset" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      success: true,
      resetToken,
      message: "OTP verified. Use this token to reset password.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({ error: "Please provide reset token and new password" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired reset token" });
    }

    if (decoded.purpose !== "password-reset") {
      return res.status(401).json({ error: "Invalid token purpose" });
    }

    const user = await User.findById(decoded.id).select("+password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
