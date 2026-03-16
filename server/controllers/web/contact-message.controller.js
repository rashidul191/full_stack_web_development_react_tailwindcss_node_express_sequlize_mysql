const { ContactMessage } = require("../../models/index.js");
const { sendSuccess } = require("../../utility/response.handle.js");
const { createService } = require("../../utility/curd.service.js");

module.exports.index = async (req, res, next) => {
  res.json("success contact-message");
};

module.exports.create = async (req, res, next) => {
  try {
    const data = req.body;

    const result = await createService(ContactMessage, data);

    sendSuccess(res, "Successfully send message!", result);
  } catch (error) {
    next(error);
  }
};
