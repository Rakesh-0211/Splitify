const Balance = require("../models/Balance");

exports.getBalances = async (req, res) => {
  try {
    const userId = req.query.userId;

    let query = {};

    if (userId) {
      query = {
        $or: [
          { fromUser: userId }, // user owes others
          { toUser: userId }    // others owe user
        ]
      };
    }

    const balances = await Balance.find(query)
      .populate("fromUser")
      .populate("toUser");

    res.json(balances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
