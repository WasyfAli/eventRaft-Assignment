const express = require("express");
const router = express.Router();
import apiVersions from "@/app/enum/apiVersions";
import PeopleRoutes from "@/routes/v1.0/PeopleRoutes/Routes";
import TagRoutes from "@/routes/v1.0/TagRoutes/Routes";
import Neo4jRoutes from "@/routes/v1.0/Neo4jRoutes/Routes";
/**
 * Common ROUTES WITH NO MIDDLEWARE
 */
/**
 * PEOPLE LEVEL ROUTES
 */
router.use("/people", PeopleRoutes);

/**
 * TAG LEVEL ROUTES
 */
router.use("/tag", TagRoutes);

router.use("/", Neo4jRoutes);

module.exports = router;
