const collegeModel = require("../models/collegeModel");
const {valid, isValidRequestBody} = require("../validator/validator")
 

let createCollege = async function(req, res){

    const requestBody = req.body;
    if(!isValidRequestBody(requestBody)){
      return  res.status(400).send({status:false,message:'invalid request parameters.plz provide College details...'})
        
    }
    const {name,fullName, LogoLink, isDeleted} =requestBody;

     if(!valid(name)){
        res.status(400).send({status:false,message:'College Name is required'})
        return
     }
     checkName = await collegeModel.findOne(name)
     if(checkName){
        return res.status(400).send({status:false, message:"College name already exist"})
     }

    if(!valid(fullName)){
        res.status(400).send({status:false,message:'Fullname of College is required...'})
        return
    }

    // let {name,fullName, LogoLink, isDeleted} =req.body
     
    
     if(valid(name)){

     }
    

    saveCollege = await collegeModel.create()
    res.status(200).send({status:true, data: saveCollege})



}
module.exports.createCollege =createCollege