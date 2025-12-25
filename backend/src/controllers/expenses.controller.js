const Expense = require("../models/Expense");
const Group = require("../models/Group");
const Balance = require("../models/Balance");

exports.addExpense = async (req, res) => {
  try {
    const { groupId, payments } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });

    const total = payments.reduce((s, p) => s + p.paid, 0);
    const share = total / group.members.length;

    const net = {};

    group.members.forEach(m => net[m.toString()] = 0);
    payments.forEach(p => net[p.userId] += p.paid - share);

    const creditors = [];
    const debtors = [];

    Object.entries(net).forEach(([u, amt]) => {
      if (amt > 0) creditors.push({ userId: u, amount: amt });
      if (amt < 0) debtors.push({ userId: u, amount: -amt });
    });

    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const pay = Math.min(debtors[i].amount, creditors[j].amount);

      await Balance.create({
        fromUser: debtors[i].userId,
        toUser: creditors[j].userId,
        amount: pay
      });

      debtors[i].amount -= pay;
      creditors[j].amount -= pay;

      if (!debtors[i].amount) i++;
      if (!creditors[j].amount) j++;
    }

    await Expense.create({ groupId, payments, total });

    res.json({ message: "Expense added" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
