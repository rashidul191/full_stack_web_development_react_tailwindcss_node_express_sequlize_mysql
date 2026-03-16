const { ContactMessage } = require("../../models/index.js");
const { sendSuccess } = require("../../utility/response.handle.js");

const {
  indexService,
  showService,
  deleteService,
} = require("../../utility/curd.service.js");

module.exports.index = async (req, res, next) => {
  try {
    const result = await indexService(ContactMessage);

    sendSuccess(res, "Find all data successful", result);
  } catch (error) {
    next(error);
  }
};

module.exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await showService(ContactMessage, id);

    sendSuccess(res, "Successfully found single data!!", result);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const result = await deleteService(ContactMessage, req.params.id);

    sendSuccess(res, "Delete successfully!!", result);
  } catch (error) {
    next(error);
  }
};
