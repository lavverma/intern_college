const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/functionup/colleges", collegeController.createCollege)

router.post("/functionup/interns",internController.createIntern)

router.get("/functionup/collegeDetails",internController.getInternByCollege)

module.exports = router;