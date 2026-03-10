const express = require("express");
const router = express.Router();
const sliderController = require("../../controllers/admin/slider.controller");
const uploadFile = require("../../middleware/upload.middleware");
const upload = uploadFile("sliders");

router.get("/", sliderController.index); // index
router.post("/", upload.single("image"), sliderController.create);
router.get("/:id", sliderController.show); // show
router.put("/:id", upload.single("image"), sliderController.update); // edit then update
router.delete("/:id", sliderController.delete); // destroy

module.exports = router;
