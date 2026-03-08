const app = require("./app");
const db = require("./models");
const port = 5000;

// default error handler

const errorHandler = (err, req, res, next) => {
  if (req.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

// datatable auto creae for [db.sequelize.sync()]
// db.sequelize.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`App is running on port: ${port}`);
//   });
// });

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
