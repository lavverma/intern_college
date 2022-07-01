const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")

// create college collection
router.post("/functionup/colleges", collegeController.createCollege)

// create interns collection
router.post("/functionup/interns",internController.createIntern)

// fetching details of college along with interns applied
router.get("/functionup/collegeDetails",internController.getInternByCollege)

module.exports = router;