const collegeModel = require("../models/collegeModel");
const mongoose = require('mongoose');




const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const valid = function (value) {
   
  if(typeof (value) ==='undefined'|| value ===null ) return false
  if(typeof (value) !== "string") return false 
  if (typeof (value) === "string" && value.trim().length == 0)  return false 

  return true   //jo bhi input aa rha h wo string ke form me aayega
}

let isValid = function (attribute) {
  return (/^[a-zA-Z]{2,20}$/.test(attribute.trim()))
}

let createCollege = async function(req, res){
try{
  const requestBody = req.body;
  const {name,fullName, LogoLink, isDeleted} =requestBody;

  if(!isValidRequestBody(requestBody)){
    return  res.status(400).send({status:false,message:'invalid request parameters.plz provide College details...'})
      
  }

  if(!valid(name)){
    res.status(400).send({status:false,message:'College Name is required'})
    return
 }

   if(!isValid(name)) {
    res.status(400).send({status:false,message:' Enter College Name in proper format'}) 
   }

   checkName = await collegeModel.findOne({name:name})
   if(checkName){
      return res.status(400).send({status:false, message:"College name already exist"})
   }

  if(!valid(fullName)){
      res.status(400).send({status:false,message:'Fullname of College is required...'})
      return
  }
 

  if(!valid(LogoLink)){
    res.status(400).send({status:false, message:"valid format url is required..."})
  }
  
  // if(!(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*\.(?:jpg|gif|png)*)?\/?$/.test(LogoLink))){
  //   return res.status(400).send({status:false, message:"Provide Proper url in request..."})
  // }

  checkLogo = await collegeModel.findOne({logoLink:LogoLink})
   if(checkLogo){
      return res.status(400).send({status:false, message:"LogoLink already exist"})
   }
  

  saveCollege = await collegeModel.create(requestBody)
  res.status(201).send({status:true, data: saveCollege})


}catch(err){
  res.status(500).send({status:false, message:err.message })
}
  

}
module.exports.createCollege =createCollege