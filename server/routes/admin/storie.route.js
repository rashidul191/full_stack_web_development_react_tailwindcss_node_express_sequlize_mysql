const express = require("express");
const router = express.Router();
const storeController = require("../../controllers/admin/storie.controller");
const uploadFile = require("../../middleware/upload.middleware");
const upload = uploadFile("stories");

router.get("/", storeController.index); // index
router.post("/", upload.single("image"), storeController.create);
router.get("/:id", storeController.show); // show
router.put("/:id", upload.single("image"), storeController.update); // edit then update
router.delete("/:id", storeController.delete); // destroy

module.exports = router;
