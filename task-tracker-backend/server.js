const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const Task = require('./models/Task');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

sequelize.sync().then(() => {
  console.log('✅ DB synced');
  app.listen(5000, () => {
    console.log('🚀 Server running at http://localhost:5000');
  });
});
