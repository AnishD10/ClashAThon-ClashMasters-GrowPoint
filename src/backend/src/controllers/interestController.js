const INTEREST_OPTIONS = [
  "Technology & IT",
  "Business & Management",
  "Healthcare & Medicine",
  "Engineering",
  "Creative Arts & Design",
  "Finance & Accounting",
  "Education & Teaching",
  "Agriculture",
  "Hospitality & Tourism",
  "Law & Legal Studies",
  "Science & Research",
  "Social Work & NGO",
];

exports.getInterestOptions = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      interests: INTEREST_OPTIONS,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
