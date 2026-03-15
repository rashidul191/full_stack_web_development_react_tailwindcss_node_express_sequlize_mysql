const express = require("express");
const router = express.Router();
const contentManageController = require("../../controllers/web/content-manage.controller");

router.get("/", contentManageController.index); // index
router.get("/:slug", contentManageController.show); // show


module.exports = router;
