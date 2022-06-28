const mongoose = require('mongoose');

const valid = function (value) {
   
    if(typeof (value) ==='undefined'|| value ===null) return false

    if (typeof (value) === "string" && value.trim().length == 0)  return false 

    return true   //jo bhi input aa rha h wo string ke form me aayega
}


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.valid(ObjectId);   // to validate a MongoDB ObjectId we are use .isValid() method on ObjectId
  };


module.exports = {valid , isValidRequestBody, isValidObjectId}