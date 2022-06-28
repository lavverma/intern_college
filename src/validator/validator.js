const mongoose = require('mongoose');

const valid = function (value) {
   
    if(typeof value ==='undefined'|| value ===null) {return false}
    if (typeof value !== "string" || value.trim().length == 0) { return false }
    return true
}


const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


module.exports = {valid , isValidRequestBody}