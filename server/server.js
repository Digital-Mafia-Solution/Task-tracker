const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const Task = require("./models/Task");
const taskRoutes = require("./routes/Tasks");

const app = express();
app.use(
  cors({
    // origin: true,
    origin: true,
  })
);
app.use(express.json());

app.use("/task-manager/tasks", taskRoutes);

sequelize.sync().then(() => {
  console.log("✅ DB synced");
  app.listen(5000, () => {
    console.log("🚀 Server running at https://api.digital-mafia.co.za");
  });
});
