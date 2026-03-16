const { BusinessSetting } = require("../../models/index.js");
const { sendSuccess } = require("../../utility/response.handle.js");
const ImageFile = require("../../lib/ImageFile.js");
const imageHandler = new ImageFile("business-settings");

module.exports.index = async (req, res, next) => {
  try {
    const data = await BusinessSetting.findAll({});

    sendSuccess(res, "Find data successfully", data);
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const data = req.body;
    // file handle
    if (req.files) {
      for (const file of req.files) {
        // data[file.fieldname] = imageHandler.store(file);
        const key = file.fieldname;
        const setting = await BusinessSetting.findOne({ where: { key } });
        const oldPath = setting ? setting.value : null;
        data[key] = imageHandler.update(oldPath, file);
      }
    }

    for (const key in data) {
      const setting = await BusinessSetting.findOne({ where: { key } });
      if (setting) {
        await setting.update({ value: data[key] });
      } else {
        await BusinessSetting.create({
          key: key,
          value: data[key],
        });
      }
    }
    sendSuccess(res, "Updated successfully");
  } catch (error) {
    next(error);
  }
};
