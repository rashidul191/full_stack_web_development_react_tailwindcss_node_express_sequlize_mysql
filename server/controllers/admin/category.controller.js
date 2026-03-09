const { Category } = require("../../models/index.js");
const { sendSuccess, sendError } = require("../../utility/response.handle.js");
const ImageFile = require("../../lib/ImageFile.js");
const imageHandler = new ImageFile("categoris");
const {
  indexService,
  createService,
  showService,
  updateService,
  deleteService,
} = require("../../utility/curd.service.js");

module.exports.index = async (req, res) => {
  try {
    const result = await indexService(Category);
    sendSuccess(res, "Find All successful", result);
  } catch (error) {
    sendError(res, "Can't find data in the database!!", error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    data.image = req.file ? imageHandler.store(req.file) : null;
    const result = await createService(Category, req.body);
    sendSuccess(res, "Successfully create category!", result);
  } catch (error) {
    next();
    console.log("create: ", error);
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

module.exports.delete = async (req, res, next) => {
  const result = await deleteService(Category, req.params.id);
  try {
    sendSuccess(res, "Delete successfully!!", result);
  } catch (error) {
    next();
    sendError(res, "Can't delete data!!", error);
  }
};
