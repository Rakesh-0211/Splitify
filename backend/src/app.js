const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users.routes");
const groupRoutes = require("./routes/groups.routes");
const balanceRoutes = require("./routes/balances.routes");
const expenseRoutes = require("./routes/expenses.routes");
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/balances", balanceRoutes);
app.use("/expenses", expenseRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});
module.exports = app;
