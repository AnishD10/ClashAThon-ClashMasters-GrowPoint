const User = require("../models/User");
const UserProgress = require("../models/UserProgress");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

exports.uploadMiddleware = upload.single("avatar");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      education_level,
      interests,
      profile_completed,
      phone,
      date_of_birth,
      gender,
      city,
      bio,
      academic_performance,
      budget_preference,
    } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (education_level !== undefined) updateFields.education_level = education_level;
    if (interests !== undefined) updateFields.interests = interests;
    if (profile_completed !== undefined) updateFields.profile_completed = profile_completed;
    if (phone !== undefined) updateFields.phone = phone;
    if (date_of_birth !== undefined) updateFields.date_of_birth = date_of_birth;
    if (gender !== undefined) updateFields.gender = gender;
    if (city !== undefined) updateFields.city = city;
    if (bio !== undefined) updateFields.bio = bio;
    if (academic_performance !== undefined) updateFields.academic_performance = academic_performance;
    if (budget_preference !== undefined) updateFields.budget_preference = budget_preference;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    const progress = await UserProgress.find({ user_id: userId })
      .populate("skill_id assessment_id");

    const totalAttempted = progress.length;
    const completed = progress.filter((p) => p.status === "Completed").length;
    const inProgress = progress.filter((p) => p.status === "In Progress").length;
    const avgScore = progress.length > 0 
      ? Math.round(progress.reduce((sum, p) => sum + (p.score || 0), 0) / progress.length)
      : 0;

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        education_level: user.education_level,
      },
      stats: {
        total_attempted: totalAttempted,
        completed: completed,
        in_progress: inProgress,
        average_score: avgScore,
        completion_percentage: totalAttempted > 0 
          ? Math.round((completed / totalAttempted) * 100)
          : 0,
      },
      recent_assessments: progress.slice(-5).reverse(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { skill_id } = req.query;

    let filter = { user_id: userId };
    if (skill_id) filter.skill_id = skill_id;

    const progress = await UserProgress.find(filter)
      .populate("skill_id assessment_id")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user.avatar_public_id) {
      await cloudinary.uploader.destroy(user.avatar_public_id);
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "knowyourpotential/avatars",
          transformation: [{ width: 400, height: 400, crop: "fill" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    user.avatar_url = result.secure_url;
    user.avatar_public_id = result.public_id;
    await user.save();

    res.status(200).json({
      success: true,
      avatar_url: user.avatar_url,
      message: "Avatar uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user.avatar_public_id) {
      return res.status(400).json({ error: "No avatar to delete" });
    }

    await cloudinary.uploader.destroy(user.avatar_public_id);

    user.avatar_url = null;
    user.avatar_public_id = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Avatar deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
