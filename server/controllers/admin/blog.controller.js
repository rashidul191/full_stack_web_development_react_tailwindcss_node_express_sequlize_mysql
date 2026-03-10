const { Blog } = require("../../models/index.js");
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
    const result = await indexService(Blog);
    sendSuccess(res, "Find All successful", result);
  } catch (error) {
    sendError(res, "Can't find data in the database!!", error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    data.image = req.file ? imageHandler.store(req.file) : null;
    const result = await createService(Blog, data);
    sendSuccess(res, "Successfully create Blog!", result);
  } catch (error) {
    next();
    console.log("create: ", error);
    sendError(res, "Can't create data!!", error);
  }
};

module.exports.show = async (req, res) => {
  try {
    const result = await showService(Blog, req.params.id);
    sendSuccess(res, "Successfully found single data!!", result);
  } catch (error) {
    sendError(res, "Can't find data in the database!!", error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const record = await Blog.findByPk(id);
    if (!record) throw new Error("Record not found");
    if (req.file) {
      data.image = imageHandler.store(req.file);
    } else {
      data.image = record.image;
    }
    const result = await updateService(Blog, id, data);
    sendSuccess(res, "Updated successfully!!", result);
  } catch (error) {
    sendError(res, "Can't update Blog!!", error);
  }
};

module.exports.delete = async (req, res, next) => {
  const result = await deleteService(Blog, req.params.id);
  try {
    sendSuccess(res, "Delete successfully!!", result);
  } catch (error) {
    next();
    sendError(res, "Can't delete data!!", error);
  }
};
