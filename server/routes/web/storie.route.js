const express = require("express");
const router = express.Router();
const storieController = require("../../controllers/web/storie.controller");

router.get("/", storieController.index); // index
router.get("/:slug", storieController.show); // show


module.exports = router;
