const express = require("express");
const router = express.Router();
import PeopleController from "@/controllers/v1.0/PeopleController";
//PARAMETERS
router.param("nameId", PeopleController.getNameById);

router.route("/testing").get(PeopleController.Testing);
router.route("/add").post(PeopleController.addPeople);
router.route("/peoples").get(PeopleController.getAllPeople);
router.route("/:nameId").put(PeopleController.updatePeople);

router.route("/:nameId").delete(PeopleController.deletePeople);
router.route("/:nameId").get(PeopleController.getSinglePeople);

module.exports = router;
