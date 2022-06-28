const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/functionup/colleges", collegeController.createCollege)


module.exports = router;