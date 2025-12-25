const User = require("../models/User");

// REGISTER
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({ error: "Name and email required" });

    // if user already exists — return existing user
    let existing = await User.findOne({ email });
    if (existing) return res.status(200).json(existing);

    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN (or fetch by email)
exports.getUsers = async (req, res) => {
  try {
    const { email } = req.query;

    // login request
    if (email) {
      const user = await User.find({ email });
      return res.json(user);
    }

    // fallback: list all (not used in UI)
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.findOrCreateByName = async (req, res) => {
  try {
    const { name } = req.body;

    let user = await User.findOne({ name });

    if (!user) {
      user = await User.create({ name });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
