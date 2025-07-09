const { Sequelize } = require("sequelize");

const DB_URL =
  "postgresql://dm_admin:qoQVIFwRAJBkgO0aYl426h5MWu7ealwB@dpg-d1j6m2emcj7s73a9t45g-a.frankfurt-postgres.render.com/tasktracker_2chf";
// const DB_NAME = process.env.DB_NAME || "tasktracker";
// const DB_USER = process.env.DB_USER || "postgres";
// const DB_PASSWORD = process.env.DB_PASSWORD || "admin";
// const DB_HOST = process.env.DB_HOST || "localhost";

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Render requires SSL
      rejectUnauthorized: false, // disable cert verification (usually fine for dev; consider true for prod)
    },
  },
});

module.exports = sequelize;
