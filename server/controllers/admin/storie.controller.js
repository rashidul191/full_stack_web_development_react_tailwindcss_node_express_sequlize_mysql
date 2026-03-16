const { Storie } = require("../../models/index.js");
const { sendSuccess } = require("../../utility/response.handle.js");
const ImageFile = require("../../lib/ImageFile.js");

const imageHandler = new ImageFile("stories");

const {
  indexService,
  createService,
  showService,
  updateService,
  deleteService,
} = require("../../utility/curd.service.js");
const generateUniqueSlug = require("../../utility/generateSlug.js");

module.exports.index = async (req, res, next) => {
  try {
    const result = await indexService(Storie);

    sendSuccess(res, "Find all data successful", result);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    // generate unique slug
    data.slug = await generateUniqueSlug(
      Storie,
      data.title || data.name,
    );
    // image manage
    data.image = req.file ? imageHandler.store(req.file) : null;

    const result = await createService(Storie, data);

    sendSuccess(res, "Successfully create Storie!", result);
  } catch (error) {
    console.log("create: ", error);
    next(error);
  }
};

module.exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await showService(Storie, id);

    sendSuccess(res, "Successfully found single data!!", result);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const record = await Storie.findByPk(id);
    if (!record) throw new Error("Record not found");

    // check name/title change
    if (
      (data.name && data.name !== record.name) ||
      (data.title && data.title !== record.title)
    ) {
      data.slug = await generateUniqueSlug(Storie, data.title || data.name);
    }

    if (req.file) {
      data.image = imageHandler.store(req.file);
    } else {
      data.image = record.image;
    }

    const result = await updateService(Storie, id, data);

    sendSuccess(res, "Updated successfully!!", result);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const result = await deleteService(Storie, req.params.id);

    sendSuccess(res, "Delete successfully!!", result);
  } catch (error) {
    next(error);
  }
};
