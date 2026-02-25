const CareerProfile = require("../models/CareerProfile");

exports.getAllCareerProfiles = async (req, res) => {
  try {
    const { category, demand, location } = req.query;

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
    const career = await CareerProfile.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ error: "Career profile not found" });
    }
    res.status(200).json({ success: true, career });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
