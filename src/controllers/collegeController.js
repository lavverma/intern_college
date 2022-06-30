const collegeModel = require("../models/collegeModel");
const validator = require("../validator/validator")


let createCollege = async function (req, res) {
  try {


    const requestBody = req.body;
    const { name, fullName, logoLink } = requestBody;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({ status: false, message: 'plz provide College details to create college data...' })

    }

    if (!validator.valid(name)) {
      res.status(400).send({ status: false, message: 'Please Enter the Short Name of college.' })
      return
    }

    if (!validator.isREgexName(name)) {
      return res.status(400).send({ status: false, message: ' Enter College Short Name in valid format' })
    }

    let checkName = await collegeModel.findOne({ name: name })
    if (checkName) {
      return res.status(400).send({ status: false, message: "College short name already exist" })
    }

    if (!validator.valid(fullName)) {
      return res.status(400).send({ status: false, message: 'please enter  Fullname of College...' })

    }

    if (!validator.regexFullname(fullName)) {
      return res.status(400).send({ status: false, message: ' Enter fullName in proper format' })
    }

    if (!validator.valid(logoLink)) {
      return res.status(400).send({ status: false, message: "please enter a logolink..." })
    }

    let regexUrl = /^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?$/gm
    if (!regexUrl.test(logoLink.trim())) {
      return res.status(400).send({ status: false, message: "Provide valid url logolink in request..." })
    }

    let saveCollege = await collegeModel.create(requestBody)
    res.status(201).send({ status: true, data: saveCollege })


  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }


}
module.exports.createCollege = createCollege