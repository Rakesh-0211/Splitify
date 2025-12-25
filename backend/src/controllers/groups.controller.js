const Group = require("../models/Group");

exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const group = await Group.create({ name, members });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RETURN ONLY USER GROUPS
exports.getGroups = async (req, res) => {
  try {
    const userId = req.query.userId;

    let query = {};

    if (userId) query = { members: { $in: [userId] } };

    const groups = await Group.find(query).populate("members");

    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
