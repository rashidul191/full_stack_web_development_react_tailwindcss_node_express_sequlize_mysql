const { Admin } = require("../../../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendSuccess,
  sendError,
} = require("../../../utility/response.handle.js");

const { Roles } = require("../../../constants/enums/roles.enum.js");

const {
  indexService,
  createService,
  showService,
  updateService,
  deleteService,
} = require("../../../utility/curd.service.js");
const { generateToken } = require("../../../utility/jwt-token.js");

module.exports.login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // 1️⃣ Find user by username
    const auth = await Admin.findOne({ where: { email } });
    // console.log(auth)
    if (!auth) {
      return sendError(
        res,
        "Authorization failed!",
        (error = { message: "Invalid email or password" }),
        (statusCode = 401),
      );
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, auth.password);
    // console.log(isMatch);
    if (!isMatch) {
      return sendError(
        res,
        "Authorization failed!",
        (error = { message: "Invalid email or password" }),
        (statusCode = 401),
      );
    }

    const token = generateToken(auth);

    // 4️⃣ Send success response
    sendSuccess(res, "Admin Login successful", { auth: auth, token: token });
  } catch (error) {
    sendError(res, "Can't find data in the database!!", error);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    // console.log(Roles.ADMIN);
    const { username, name, phone, email, password, role } = req.body;

    // 1️⃣ Basic validation
    if (!username || !name || !phone || !email || !password) {
      return sendError(res, "All fields are required");
    }

    // 2️⃣ Check if user already exists (username or email)
    const existingAuth = await Admin.findOne({
      where: {
        email: email,
      },
    });

    if (existingAuth) {
      return sendError(res, "Email already exists");
    }

    // 3️⃣  Create user
    const newAuthData = {
      username,
      name,
      phone,
      email,
      password, // password hash form model
      role: role ?? Roles.ADMIN,
    };

    const authCreated = await createService(Admin, newAuthData);
    const token = generateToken(authCreated);
    // console.log(userResponse, newUserData);
    sendSuccess(res, "Successfully create account!!", {
      auth: authCreated,
      token: token,
    });
  } catch (error) {
    next();
    sendError(res, "Can't create data!!", error);
  }
};

module.exports.show = async (req, res) => {
  try {
    const data = await showService(Blog, req.params.id);
    sendSuccess(res, "Successfully found single data!!", data);
  } catch (error) {
    sendError(res, "Can't find data in the database!!", error);
  }
};

module.exports.update = (req, res) => {
  res.send("Update blog");
};

module.exports.delete = (req, res) => {
  res.send("Delete blog");
};
