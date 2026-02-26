const Assessment = require("../models/Assessment");
const UserProgress = require("../models/UserProgress");
const LearningPath = require("../models/LearningPath");
const Skill = require("../models/Skill");
const CareerProfile = require("../models/CareerProfile");

exports.getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ is_active: true });
    res.status(200).json({ success: true, count: assessments.length, assessments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.startAssessment = async (req, res) => {
  try {
    const { assessment_id } = req.body;
    const userId = req.user.id;

    if (!assessment_id) {
      return res.status(400).json({ error: "assessment_id is required" });
    }

    const assessment = await Assessment.findById(assessment_id);
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    const progress = await UserProgress.create({
      user_id: userId,
      assessment_id,
      status: "In Progress",
      started_at: new Date(),
    });

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

// Helper function to convert Likert response to numeric value
const getLikertScore = (response) => {
  const likertMap = {
    "Strongly Disagree": 1,
    "Disagree": 2,
    "Neutral": 3,
    "Agree": 4,
    "Strongly Agree": 5,
  };
  return likertMap[response] || 0;
};

// Helper function to interpret category score
const getProfileInterpretation = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return "Very Strong";
  if (percentage >= 60) return "Strong";
  if (percentage >= 40) return "Moderate";
  if (percentage >= 20) return "Developing";
  return "Emerging";
};

exports.submitAssessment = async (req, res) => {
  try {
    const { assessment_id, progress_id, answers } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!assessment_id || !progress_id || !answers) {
      return res.status(400).json({
        error: "assessment_id, progress_id, and answers are required",
      });
    }

    const assessment = await Assessment.findById(assessment_id);
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    if (!Array.isArray(answers) || answers.length !== assessment.questions.length) {
      return res.status(400).json({
        error: `Answers are missing or do not match the number of questions. Expected ${assessment.questions.length}, received ${answers.length}`,
      });
    }

    // Verify progress belongs to user
    const progressCheck = await UserProgress.findById(progress_id);
    if (!progressCheck || progressCheck.user_id.toString() !== userId) {
      return res.status(403).json({
        error: "Progress record not found or does not belong to user",
      });
    }

    // Calculate scores by category
    const categoryScores = {};
    const detailed_results = assessment.questions.map((question, index) => {
      const userAnswer = answers[index];
      const likertValue = getLikertScore(userAnswer);
      const category = question.category || "General";

      if (!categoryScores[category]) {
        categoryScores[category] = { total: 0, count: 0 };
      }
      categoryScores[category].total += likertValue;
      categoryScores[category].count += 1;

      return {
        question: question.question,
        category: category,
        user_answer: userAnswer,
        likert_value: likertValue,
        insight: question.insight,
      };
    });

    // Calculate overall score and category profiles
    const categoryProfiles = {};
    let totalScore = 0;
    let totalMaxScore = 0;

    for (const [category, data] of Object.entries(categoryScores)) {
      const maxCategoryScore = data.count * 5; // Max Likert value is 5
      categoryProfiles[category] = {
        score: data.total,
        max_score: maxCategoryScore,
        percentage: Math.round((data.total / maxCategoryScore) * 100),
        profile: getProfileInterpretation(data.total, maxCategoryScore),
      };
      totalScore += data.total;
      totalMaxScore += maxCategoryScore;
    }

    if (totalMaxScore === 0) {
      return res.status(400).json({
        error: "Assessment has no scorable questions",
      });
    }

    const overallPercentage = Math.round((totalScore / totalMaxScore) * 100);
    const overallProfile = getProfileInterpretation(totalScore, totalMaxScore);

    const progress = await UserProgress.findByIdAndUpdate(
      progress_id,
      {
        status: "Completed",
        score: overallPercentage,
        completion_percentage: overallPercentage,
        completed_at: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      overall_score: overallPercentage,
      overall_profile: overallProfile,
      category_profiles: categoryProfiles,
      detailed_results,
      message: "Assessment completed. Review your psychometric profile above.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    const userScores = await UserProgress.find({ user_id: userId, status: "Completed" })
      .populate("assessment_id")
      .sort({ score: -1 });

     

    if (userScores.length === 0) {
      return res.status(200).json({
        recommendations: [],
        message: "Complete assessments to receive recommendations",
      });
    }

    const categoryScores = {};
    for (const score of userScores) {
      if (
        score.assessment_id &&
        score.assessment_id.category &&
        typeof score.score === "number" &&
        Number.isFinite(score.score)
      ) {
        const category = score.assessment_id.category;
        categoryScores[category] = (categoryScores[category] || 0) + score.score;
      }
    }

    const topCategories = Object.entries(categoryScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category);

    const learningPaths = await LearningPath.find({
      category: { $in: topCategories },
      is_active: true,
    }).populate("skills.skill_id");

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

const demandScoreMap = {
  High: 20,
  Medium: 10,
  Low: 0,
};

const riskScoreMap = {
  Low: 10,
  Medium: 5,
  High: -5,
};

const assessmentCategoryToCareerCategories = {
  aptitude: [
    "Technology",
    "Business",
    "Finance",
    "Engineering",
    "Healthcare",
    "Education",
    "Creative",
    "Hospitality",
    "Agriculture",
  ],
  technical: ["Technology", "Engineering"],
  analytical: ["Finance", "Business", "Technology"],
  personality: ["Education", "Hospitality", "Healthcare", "Business"],
  all: [
    "Technology",
    "Business",
    "Finance",
    "Engineering",
    "Healthcare",
    "Education",
    "Creative",
    "Hospitality",
    "Agriculture",
  ],
};

exports.getCareerRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    const userScores = await UserProgress.find({ user_id: userId, status: "Completed" })
      .populate("assessment_id")
      .sort({ score: -1 });

    if (userScores.length === 0) {
      return res.status(200).json({
        recommendations: [],
        message: "Complete assessments to receive career recommendations",
      });
    }

    const categoryScores = {};
    for (const score of userScores) {
      if (
        score.assessment_id &&
        score.assessment_id.category &&
        typeof score.score === "number" &&
        Number.isFinite(score.score)
      ) {
        const category = score.assessment_id.category;
        categoryScores[category] = (categoryScores[category] || 0) + score.score;
      }
    }

    const profiles = await CareerProfile.find({ is_active: true });
    const careerCategoryScores = {};

    Object.entries(categoryScores).forEach(([assessmentCategory, score]) => {
      const mappedCategories =
        assessmentCategoryToCareerCategories[assessmentCategory] || [];

      if (mappedCategories.length === 0) {
        return;
      }

      const distributedScore = score / mappedCategories.length;
      mappedCategories.forEach((careerCategory) => {
        careerCategoryScores[careerCategory] =
          (careerCategoryScores[careerCategory] || 0) + distributedScore;
      });
    });

    const ranked = profiles
      .map((profile) => {
        const baseScore = careerCategoryScores[profile.category] || 0;
        const demandScore = demandScoreMap[profile.demand_indicator] || 0;
        const riskScore = riskScoreMap[profile.risk_index] || 0;
        const totalScore = baseScore + demandScore + riskScore;

        return {
          ...profile.toObject(),
          relevance_score: totalScore,
          rationale: {
            assessment_score: baseScore,
            demand_score: demandScore,
            risk_score: riskScore,
          },
        };
      })
      .sort((a, b) => b.relevance_score - a.relevance_score);

    res.status(200).json({
      success: true,
      user_performance: categoryScores,
      career_category_scores: careerCategoryScores,
      recommendations: ranked.slice(0, 5),
      message: "Career recommendations based on aptitude and Nepal market data",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

exports.getParentReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const userScores = await UserProgress.find({ user_id: userId, status: "Completed" })
      .populate("assessment_id")
      .sort({ score: -1 });

    if (userScores.length === 0) {
      return res.status(200).json({
        message: "Complete assessments to receive parent report",
      });
    }

    const categoryScores = {};
    for (const score of userScores) {
      if (
        score.assessment_id &&
        score.assessment_id.category &&
        typeof score.score === "number" &&
        Number.isFinite(score.score)
      ) {
        const category = score.assessment_id.category;
        categoryScores[category] = (categoryScores[category] || 0) + score.score;
      }
    }

    const profiles = await CareerProfile.find({ is_active: true });
    const ranked = profiles
      .map((profile) => {
        const baseScore = categoryScores[profile.category] || 0;
        const demandScore = demandScoreMap[profile.demand_indicator] || 0;
        const riskScore = riskScoreMap[profile.risk_index] || 0;
        const totalScore = baseScore + demandScore + riskScore;

        return {
          ...profile.toObject(),
          relevance_score: totalScore,
        };
      })
      .sort((a, b) => b.relevance_score - a.relevance_score)
      .slice(0, 3);

    const summary = ranked.map((career) => ({
      career_title: career.title,
      why_recommended: `Strong match based on aptitude test results. ${career.demand_indicator} demand in Nepal market.`,
      entry_salary: career.salary_range
        ? `NPR ${career.salary_range.entry_min.toLocaleString()} - ${career.salary_range.entry_max.toLocaleString()} per month`
        : "Contact for details",
      education_cost: career.education_cost_range
        ? `NPR ${career.education_cost_range.min.toLocaleString()} - ${career.education_cost_range.max.toLocaleString()}`
        : "Varies",
      education_duration: career.education_duration_years
        ? `${career.education_duration_years} year(s)`
        : "Varies",
      job_locations: career.locations.join(", "),
      risk_level: career.risk_index,
      time_to_job: career.time_to_employment_months
        ? `${career.time_to_employment_months} months after graduation`
        : "Varies",
    }));

    res.status(200).json({
      success: true,
      student_strengths: Object.keys(categoryScores)
        .sort((a, b) => categoryScores[b] - categoryScores[a])
        .slice(0, 3),
      top_recommendations: summary,
      message:
        "Simplified career report for parents. Shows top 3 realistic career paths based on student's aptitude and Nepal job market.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
