const { Menu, ContentManage } = require("../../models/index.js");
const { sendSuccess } = require("../../utility/response.handle.js");
const ImageFile = require("../../lib/ImageFile.js");

const imageHandler = new ImageFile("menus");

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
    const result = await indexService(Menu, {
      include: [
        {
          model: Menu,
          attributes: ["id", "name", "slug"],
          as: "parent",
        },
        {
          model: Menu,
          attributes: ["id", "name", "slug"],
          as: "children",
        },
        {
          model: ContentManage,
          attributes: ["id", "title", "slug"],
          as: "posts",
        },
      ],
    });

    sendSuccess(res, "Find all data successful", result);
  } catch (error) {
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const data = req.body;

    // generate unique slug
    data.slug = await generateUniqueSlug(Menu, data.title || data.name);

    // image manage
    data.image = req.file ? imageHandler.store(req.file) : null;

    const result = await createService(Menu, data);

    sendSuccess(res, "Successfully create Menu!", result);
  } catch (error) {
    console.log("create: ", error);
    next(error);
  }
};

module.exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await showService(Menu, id, {
      include: [
        {
          model: Menu,
          attributes: ["id", "name", "slug"],
          as: "parent",
        },
        {
          model: Menu,
          attributes: ["id", "name", "slug"],
          as: "children",
        },
        {
          model: ContentManage,
          attributes: ["id", "title", "slug"],
          as: "posts",
        },
      ],
    });

    sendSuccess(res, "Successfully found single data!!", result);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const record = await Menu.findByPk(id);
    if (!record) throw new Error("Record not found");

    // check name/title change
    if (
      (data.name && data.name !== record.name) ||
      (data.title && data.title !== record.title)
    ) {
      data.slug = await generateUniqueSlug(Menu, data.title || data.name);
    }

    if (req.file) {
      data.image = imageHandler.store(req.file);
    } else {
      data.image = record.image;
    }

    const result = await updateService(Menu, id, data);

    sendSuccess(res, "Updated successfully!!", result);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const result = await deleteService(Menu, req.params.id);

    sendSuccess(res, "Delete successfully!!", result);
  } catch (error) {
    next(error);
  }
};
