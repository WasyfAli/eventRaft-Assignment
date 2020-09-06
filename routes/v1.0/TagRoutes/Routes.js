const express = require("express");
const router = express.Router();
import TagController from "@/controllers/v1.0/TagController";
//PARAMETERS
router.param("tagId", TagController.getTagById);

router.route("/testing").get(TagController.Testing);
router.route("/add").post(TagController.addTag);
router.route("/tags").get(TagController.getAllTag);
router.route("/:tagId").put(TagController.updateTag);

router.route("/:tagId").delete(TagController.deleteTag);
router.route("/:tagId").get(TagController.getSingleTag);

module.exports = router;
