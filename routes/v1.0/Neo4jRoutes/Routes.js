const express = require("express");
const router = express.Router();
import Neo4jController from "@/controllers/v1.0/Neo4jController";

router.route("/testing").get(Neo4jController.Testing);
router.route("/add").post(Neo4jController.addPeople);
router.route("/peoples").get(Neo4jController.getAllPeoples);
router.route("/add/relation").post(Neo4jController.addRelation);
router.route("/get/relation").post(Neo4jController.getRelation);

// router.route("/:nameId").delete(Neo4jController.deletePeople);
// router.route("/:nameId").get(Neo4jController.getSinglePeople);

module.exports = router;
