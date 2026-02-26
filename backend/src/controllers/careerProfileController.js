const CareerProfile = require("../models/CareerProfile");

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

const qualificationMatches = (qualifications, educationLevel) => {
  if (!educationLevel) return true;
  const level = educationLevel.toLowerCase();
  const normalized = (qualifications || []).map((q) => q.toLowerCase());

  if (level.includes("+2")) {
    return normalized.some((q) => q.includes("+2") || q.includes("diploma"));
  }

  if (level.includes("bachelor")) {
    return normalized.some(
      (q) =>
        q.includes("bachelor") || q.includes("diploma") || q.includes("+2")
    );
  }

  if (level.includes("master")) {
    return true;
  }

  return true;
};

const riskMatches = (riskIndex, riskTolerance, academicPerformance) => {
  if (academicPerformance && academicPerformance.toLowerCase() === "low") {
    return riskIndex !== "High";
  }

  if (!riskTolerance) return true;
  if (riskTolerance === "Low") return riskIndex === "Low";
  if (riskTolerance === "Medium") return riskIndex !== "High";
  return true;
};

exports.getAllCareerProfiles = async (req, res) => {
  try {
    const { category, demand, location } = req.query;

    // Validate demand if provided
    if (demand && !["High", "Medium", "Low"].includes(demand)) {
      return res.status(400).json({
        error: "demand must be one of: High, Medium, Low",
      });
    }

    const filter = { is_active: true };
    if (category) filter.category = category;
    if (demand) filter.demand_indicator = demand;
    if (location) filter.locations = { $in: [location] };

    const careers = await CareerProfile.find(filter).sort({ demand_indicator: 1, title: 1 });
    res.status(200).json({ success: true, count: careers.length, careers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCareerProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        error: "Invalid career profile ID format. Must be a valid MongoDB ObjectId (24 hex characters)." 
      });
    }
    
    const career = await CareerProfile.findById(id);
    if (!career) {
      return res.status(404).json({ error: "Career profile not found" });
    }
    res.status(200).json({ success: true, career });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getConstraintRecommendations = async (req, res) => {
  try {
    const {
      budget_max,
      location,
      education_level,
      academic_performance,
      risk_tolerance,
    } = req.body || {};

    // Validate budget_max if provided
    if (budget_max !== undefined && (typeof budget_max !== "number" || budget_max < 0)) {
      return res.status(400).json({
        error: "budget_max must be a positive number",
      });
    }

    // Validate risk_tolerance if provided
    if (risk_tolerance && !["Low", "Medium", "High"].includes(risk_tolerance)) {
      return res.status(400).json({
        error: "risk_tolerance must be one of: Low, Medium, High",
      });
    }

    const profiles = await CareerProfile.find({ is_active: true });

    const filtered = profiles.filter((profile) => {
      if (location && !profile.locations.includes(location)) {
        return false;
      }

      if (!qualificationMatches(profile.qualification_required, education_level)) {
        return false;
      }

      if (!riskMatches(profile.risk_index, risk_tolerance, academic_performance)) {
        return false;
      }

      if (
        budget_max &&
        profile.education_cost_range &&
        typeof profile.education_cost_range.max === "number" &&
        profile.education_cost_range.max > budget_max
      ) {
        return false;
      }

      return true;
    });

    const ranked = filtered
      .map((profile) => {
        const demandScore = demandScoreMap[profile.demand_indicator] || 0;
        const riskScore = riskScoreMap[profile.risk_index] || 0;
        const locationScore = location && profile.locations.includes(location) ? 5 : 0;
        const budgetScore =
          budget_max &&
          profile.education_cost_range &&
          typeof profile.education_cost_range.max === "number" &&
          profile.education_cost_range.max <= budget_max
            ? 5
            : 0;

        return {
          ...profile.toObject(),
          relevance_score: demandScore + riskScore + locationScore + budgetScore,
          rationale: {
            demand_score: demandScore,
            risk_score: riskScore,
            location_score: locationScore,
            budget_score: budgetScore,
          },
        };
      })
      .sort((a, b) => b.relevance_score - a.relevance_score);

    res.status(200).json({
      success: true,
      filters_applied: {
        budget_max,
        location,
        education_level,
        academic_performance,
        risk_tolerance,
      },
      recommendations: ranked.slice(0, 5),
      message: "Career recommendations filtered by constraints",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCareerProfile = async (req, res) => {
  try {
    const career = await CareerProfile.create(req.body);
    res.status(201).json({ success: true, career });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCareerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        error: "Invalid career profile ID format",
      });
    }

    const career = await CareerProfile.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!career) {
      return res.status(404).json({ error: "Career profile not found" });
    }

    res.status(200).json({ success: true, career });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCareerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        error: "Invalid career profile ID format",
      });
    }

    const career = await CareerProfile.findByIdAndUpdate(
      id,
      { is_active: false },
      { new: true }
    );

    if (!career) {
      return res.status(404).json({ error: "Career profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Career profile deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
