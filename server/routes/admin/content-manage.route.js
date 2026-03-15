const express = require("express");
const router = express.Router();
const contentManageController = require("../../controllers/admin/content-manage.controller");
const uploadFile = require("../../middleware/upload.middleware");
const upload = uploadFile("content-manages");

router.get("/", contentManageController.index); // index
router.post("/", upload.single("image"), contentManageController.create);
router.get("/:id", contentManageController.show); // show
router.put("/:id", upload.single("image"), contentManageController.update); // edit then update
router.delete("/:id", contentManageController.delete); // destroy

module.exports = router;
