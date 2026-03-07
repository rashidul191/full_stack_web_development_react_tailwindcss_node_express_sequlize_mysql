const { User } = require("../../models/index.js");
const bcrypt = require("bcrypt");
const { sendSuccess, sendError } = require("../../utility/response.handle.js");

const { Roles } = require("../../constants/enums/roles.enum.js");
const { generateToken } = require("../../utility/jwt-token.js");

const ImageFile = require("../../lib/ImageFile.js");
const imageHandler = new ImageFile("users");

const {
  indexService,
  createService,
  showService,
  updateService,
  deleteService,
} = require("../../utility/curd.service.js");

module.exports.login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;

    // 1️⃣ Find user by username
    const auth = await User.findOne({ where: { email } });

    if (!auth) {
      return sendError(res, "Invalid email or password");
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, auth.password);

    if (!isMatch) {
      return sendError(res, "Invalid email or password");
    }

    const token = generateToken(auth);
    console.log(token);
    // 4️⃣ Send success response
    sendSuccess(res, "Login successful", { auth: auth, token: token });
  } catch (error) {
    sendError(res, "Can't find data in the database!!", error);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, name, phone, email, password, role } = req.body;

    // 1️⃣ Basic validation
    if (!username || !name || !phone || !email || !password) {
      return sendError(res, "All fields are required");
    }

    // 2️⃣ Check if user already exists (username or email)
    const existingAuth = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingAuth) {
      return sendError(res, "User already exists");
    }

    // 3️⃣  Create user
    const newAuthData = {
      username,
      name,
      phone,
      email,
      password, // password hash form model
      role: role ?? Roles.USER,
      // avatar: req.file ? req.file.path : null,
      avatar: req.file ? imageHandler.store(req.file) : null,
    };

    const authCreated = await createService(User, newAuthData);
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
    // const data = await Blog.findByPk(req.params.id);
    const data = await showService(Blog, req.params.id);
    sendSuccess(res, "Successfully found single data!!", data);
  } catch (error) {
    sendError(res, "Can't find data in the database!!", error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { username, name, phone, email, password, role } = req.body;

    // 1️⃣ Find existing user
    const existingUser = await User.findByPk(userId);
    if (!existingUser) return sendError(res, "User not found!!");

    // 2️⃣ Check if email/username conflict
    if (email && email !== existingUser.email) {
      const emailCheck = await User.findOne({ where: { email } });
      if (emailCheck) return sendError(res, "Email already exists!!");
    }

    if (username && username !== existingUser.username) {
      const usernameCheck = await User.findOne({ where: { username } });
      if (usernameCheck) return sendError(res, "Username already exists!!");
    }

    // 3️⃣ Prepare update data
    const updateData = {
      username: username ?? existingUser.username,
      name: name ?? existingUser.name,
      phone: phone ?? existingUser.phone,
      email: email ?? existingUser.email,
      role: role ?? existingUser.role,
    };

    // 4️⃣ Password update (optional)
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // 5️⃣ Avatar update
    if (req.file) {
      // Delete old avatar
      imageHandler.delete(existingUser.avatar);

      // Store new avatar
      updateData.avatar = imageHandler.store(req.file);
    }

    // 6️⃣ Update user
    const updatedUser = await updateService(User, userId, updateData);

    sendSuccess(res, "User updated successfully!!", updatedUser);
  } catch (error) {
    next();
    sendError(res, "Can't update user!!", error);
  }
};

module.exports.delete = (req, res, next) => {
  res.send("Delete blog");
};
