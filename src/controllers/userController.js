const User = require("../models/User");
const UserProgress = require("../models/UserProgress");

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
    const { name, education_level, interests, profile_completed } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, education_level, interests, profile_completed },
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
