const express = require("express");
const router = express.Router();
const menuController = require("../../controllers/web/menu.controller");

router.get("/", menuController.index); // index
router.get("/:slug", menuController.show); // show


module.exports = router;
