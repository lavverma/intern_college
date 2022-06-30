const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel")
const validator = require("../validator/validator")


let createIntern = async function (req, res) {
    try {

        let data = req.body;
        const { name, email, mobile, collegeName,isDeleted} = data

        if (!validator.isValidRequestBody(data))  return res.status(400).send({ status: false, message: "Please provide data in intern body..." })  //nothing in body

        if (!validator.valid(name) || !validator.regexIntern(name))  return res.status(400).send({ status: false, message: "Please provide the intern name in valid format..." })  //valid format of name check

        if (!validator.valid(email) || !validator.isvalidEmail(email))  return res.status(400).send({ status: false, message: "Please provide the email in a valid format..." })
        
        let checkEmail = await internModel.findOne({ email: email })
        if (checkEmail)  return res.status(400).send({ status: false, message: `email: ${email} already exist...` }) 

        if (!validator.valid(mobile) || !validator.moblieRegex(mobile)) return res.status(400).send({ status: false, message: "please provide the mobile number inn valid format..." }) 

        let checkMobile = await internModel.findOne({ mobile: mobile })
        if (checkMobile)  return res.status(400).send({ status: false, message: `mobile no.: ${mobile} is already present...` })

        if (!validator.valid(collegeName))  return res.status(400).send({ status: false, message: "enter the college name..." }) 

        let collegeDetails = await collegeModel.findOne({ name: collegeName })

        if (!collegeDetails)  return res.status(404).send({ status: false, message: `college: ${collegeName} does not exist...` }) 

        if( isDeleted && ( isDeleted !=  (true || false)) ) return res.status(400).send({status:false, message:"please enter Boolean value..."})
        

        let collegeId = collegeDetails._id;

        const data1 = { name, email, mobile, collegeId,isDeleted }

        let internData = await internModel.create(data1)
        return res.status(201).send({ status: true, data: internData })

    } catch (err) { return res.status(500).send({ status: false, message: err.message }) }
}



let getInternByCollege = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;

        if (!validator.valid(collegeName) || !collegeName || !validator.isREgexName(collegeName)) 
            return res.status(400).send({ status: false, message: "Please provide college shortname with correct format..." })

        const dataTobePresented = await collegeModel.findOne({ name: collegeName,isDeleted:false })

        if (!dataTobePresented)  return res.status(404).send({ status: false, message: `college: ${collegeName} not found...` }) 

        let collegeId = dataTobePresented._id

        let intern = await internModel.find({ collegeId: collegeId, isDeleted:false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

        // if (intern.length < 1) {
        //     return res.status(200).send({
        //         status: true,
        //         data: {
        //             name: dataTobePresented.name,
        //             fullName: dataTobePresented.fullName,
        //             logoLink: dataTobePresented.logoLink,
        //             intern: { message: "no intern apllied in this college..." }
        //         }
        //     })
        // }

        return res.status(200).send({
            status: true,
            data: {
                name: dataTobePresented.name,
                fullName: dataTobePresented.fullName,
                logoLink: dataTobePresented.logoLink,
                interns: intern
            }
        })

    } catch (err) {  return res.status(500).send({ status: false, message: err.message })  }
}

module.exports = { createIntern, getInternByCollege };