const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

// middleware
app.use(express.json()); // all data are in json format
dotenv.config();
app.use(cors());

// file path
app.use(express.static("public"));
app.use("/api/uploads", express.static("public/uploads"));

// Web Routes
const blogRoutes = require("./routes/web/blog.route");
// posting to database
// app.use("/api/blogs", blogRoutes);
app.use("/api/blogs", blogRoutes);

// User Auth Routes
const loginRoutes = require("./routes/auth/login.route");
app.use("/api/login", loginRoutes);
const registerRoutes = require("./routes/auth/register.route");
app.use("/api/register", registerRoutes);

// Admin Routes
const adminLoginRoutes = require("./routes/admin/auth/login.route");
app.use("/api/admin/login", adminLoginRoutes);
const adminRegisterRoutes = require("./routes/admin/auth/register.route");
app.use("/api/admin/register", adminRegisterRoutes);

const adminCategory = require("./routes/admin/category.route");
app.use("/api/admin/category", adminCategory);

const adminBlog = require("./routes/admin/blog.route");
app.use("/api/admin/blog", adminBlog);

const businessRoutes = require("./routes/admin/business.route");
app.use("/api/admin/business-setting", businessRoutes);

// here we are export model
app.get("/", (req, res) => {
  res.send("server is running...");
});
module.exports = app;
