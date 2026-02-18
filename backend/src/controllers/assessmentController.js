const Assessment = require("../models/Assessment");
const UserProgress = require("../models/UserProgress");
const LearningPath = require("../models/LearningPath");
const Skill = require("../models/Skill");

/**
 * Get All Assessments
 * WHY: Returns available assessments for skill evaluation
 */
exports.getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ is_active: true });
    res.status(200).json({ success: true, count: assessments.length, assessments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Start Assessment
 * WHY: Initializes assessment attempt and tracks start time
 * Returns questions (without answers) for the user to attempt
 */
exports.startAssessment = async (req, res) => {
  try {
    const { assessment_id } = req.body;
    const userId = req.user.id;

    const assessment = await Assessment.findById(assessment_id);
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    // Create progress record
    const progress = await UserProgress.create({
      user_id: userId,
      assessment_id,
      status: "In Progress",
      started_at: new Date(),
    });

    // Return questions without answers
    const questionsWithoutAnswers = assessment.questions.map((q) => ({
      _id: q._id,
      question: q.question,
      options: q.options,
    }));

    res.status(200).json({
      success: true,
      assessment: {
        title: assessment.title,
        duration_minutes: assessment.duration_minutes,
        questions: questionsWithoutAnswers,
        total_questions: assessment.questions.length,
      },
      progress_id: progress._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Submit Assessment
 * WHY: Evaluates answers, calculates score, and stores performance
 * Core function for skill aptitude measurement
 */
exports.submitAssessment = async (req, res) => {
  try {
    const { assessment_id, progress_id, answers } = req.body;
    const userId = req.user.id;

    // Get assessment
    const assessment = await Assessment.findById(assessment_id);
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    // Calculate score
    let correctCount = 0;
    const detailed_results = assessment.questions.map((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correct_answer;
      if (isCorrect) correctCount++;

      return {
        question: question.question,
        user_answer: userAnswer,
        correct_answer: question.correct_answer,
        is_correct: isCorrect,
        explanation: question.explanation,
      };
    });

    const score = Math.round((correctCount / assessment.questions.length) * 100);

    // Update progress
    const progress = await UserProgress.findByIdAndUpdate(
      progress_id,
      {
        status: score >= assessment.passing_score ? "Completed" : "In Progress",
        score,
        completion_percentage: score,
        completed_at: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      score,
      passing_score: assessment.passing_score,
      passed: score >= assessment.passing_score,
      detailed_results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Personalized Recommendations
 * WHY: CORE ENGINE - Analysis algorithm that solves decision paralysis
 * 
 * ALGORITHM LOGIC:
 * 1. Fetch user's assessment scores
 * 2. Identify top 3 skill categories by performance
 * 3. Find learning paths matching those categories
 * 4. Rank paths by market demand + user aptitude
 * 5. Return personalized recommendations
 */
exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Step 1: Get user's assessment results
    const userScores = await UserProgress.find({ user_id: userId })
      .populate("assessment_id")
      .sort({ score: -1 });

    if (userScores.length === 0) {
      return res.status(200).json({
        recommendations: [],
        message: "Complete assessments to receive recommendations",
      });
    }

    // Step 2: Extract category performance
    const categoryScores = {};
    for (const score of userScores) {
      if (score.assessment_id && score.assessment_id.category) {
        const category = score.assessment_id.category;
        categoryScores[category] = (categoryScores[category] || 0) + score.score;
      }
    }

    // Step 3: Get top categories
    const topCategories = Object.entries(categoryScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category);

    // Step 4: Find matching learning paths
    const learningPaths = await LearningPath.find({
      category: { $in: topCategories },
      is_active: true,
    }).populate("skills.skill_id");

    // Step 5: Score and rank paths
    const rankedPaths = learningPaths
      .map((path) => ({
        ...path.toObject(),
        relevance_score: categoryScores[path.category] || 0,
      }))
      .sort((a, b) => b.relevance_score - a.relevance_score);

    res.status(200).json({
      success: true,
      user_performance: categoryScores,
      recommendations: rankedPaths.slice(0, 5),
      message: "Personalized learning paths based on your strengths",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get User Assessment History
 * WHY: Shows user's past assessments, scores, and improvement
 */
exports.getUserAssessmentHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await UserProgress.find({ user_id: userId })
      .populate("assessment_id")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
