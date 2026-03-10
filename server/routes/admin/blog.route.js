const express = require("express");
const router = express.Router();
const blogController = require("../../controllers/admin/blog.controller");
const uploadFile = require("../../middleware/upload.middleware");
const upload = uploadFile("categoris");

router.get("/", blogController.index); // index
router.post("/", upload.single("image"), blogController.create);
router.get("/:id", blogController.show); // show
router.put("/:id", upload.single("image"), blogController.update); // edit then update
router.delete("/:id", blogController.delete); // destroy

// router.get("/", blogController.index); // index
// router.post("/", blogController.create); // create
// router.get("/:id", blogController.show); // show
// router.put("/:id", blogController.update); // edit then update
// router.delete("/:id", blogController.delete); // destroy

module.exports = router;
