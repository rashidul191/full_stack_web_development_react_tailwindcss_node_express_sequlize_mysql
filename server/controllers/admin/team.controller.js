const { Team } = require("../../models/index.js");
const { sendSuccess } = require("../../utility/response.handle.js");
const ImageFile = require("../../lib/ImageFile.js");
const generateUniqueSlug = require("../../utility/generateSlug");

const imageHandler = new ImageFile("teams");

const {
  indexService,
  createService,
  showService,
  updateService,
  deleteService,
} = require("../../utility/curd.service.js");

// ================= INDEX =================
module.exports.index = async (req, res, next) => {
  try {
    const result = await indexService(Team, {});
    sendSuccess(res, "Find all data successful", result);
  } catch (error) {
    next(error);
  }
};

// ================= CREATE =================
module.exports.create = async (req, res, next) => {
  try {
    const data = req.body;

    // slug generate
    data.slug = await generateUniqueSlug(Team, data.title || data.name);

    // image manage
    data.image = req.file ? imageHandler.store(req.file) : null;

    const result = await createService(Team, data);

    sendSuccess(res, "Successfully create Team!", result);
  } catch (error) {
    next(error);
  }
};

// ================= SHOW =================
module.exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await showService(Team, id);

    sendSuccess(res, "Successfully found single data!!", result);
  } catch (error) {
    next(error);
  }
};

// ================= UPDATE =================
module.exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const record = await Team.findByPk(id);
    if (!record) throw new Error("Record not found");

    // check name/title change
    if (
      (data.name && data.name !== record.name) ||
      (data.title && data.title !== record.title)
    ) {
      data.slug = await generateUniqueSlug(Team, data.title || data.name);
    }

    // image update
    if (req.file) {
      data.image = imageHandler.store(req.file);
    } else {
      data.image = record.image;
    }

    const result = await updateService(Team, id, data);

    sendSuccess(res, "Updated successfully!!", result);
  } catch (error) {
    next(error);
  }
};

// ================= DELETE =================
module.exports.delete = async (req, res, next) => {
  try {
    const result = await deleteService(Team, req.params.id);

    sendSuccess(res, "Delete successfully!!", result);
  } catch (error) {
    next(error);
  }
};
