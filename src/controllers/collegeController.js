const collegeModel = require("../models/collegeModel");
const validator = require("../validator/validator")

// handler of post type api: creating colleges collection
let createCollege = async function (req, res) {
  try {
   
    const requestBody = req.body;
    const { name, fullName, logoLink,isDeleted } = requestBody;

    if (!validator.isValidRequestBody(requestBody)) return res.status(400).send({ status: false, message: 'plz provide College details to create college data...' }) 

    if (!validator.valid(name) || !validator.isREgexName(name))  return res.status(400).send({ status: false, message: ' Enter College Short Name in valid format...' }) 

    let checkName = await collegeModel.findOne({ name: name })
    if (checkName)  return res.status(400).send({ status: false, message: "College short name already exist..." }) 

    if (!validator.valid(fullName))  return res.status(400).send({ status: false, message: 'please enter  FullName of College...' }) 

    if (!validator.regexFullName(fullName))  return res.status(400).send({ status: false, message: ' Enter fullName in proper format...' }) 

    if (!validator.valid(logoLink))  return res.status(400).send({ status: false, message: "please enter a logoLink..." }) 


    if (!validator.regexUrl(logoLink.trim()))  return res.status(400).send({ status: false, message: "Provide valid url logoLink in request..." }) 

    if( isDeleted && ( isDeleted !=  (true || false)) )  return res.status(400).send({status:false, message:"please enter Boolean value..."})
  

    let saveCollege = await collegeModel.create(requestBody)
    return res.status(201).send({ status: true, data: saveCollege })
  

  } catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}
module.exports.createCollege = createCollege