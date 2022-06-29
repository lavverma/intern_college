const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true,
        required:true,
        trim: true,
        lowercase:true
    },
    fullName: {
        type: String,
        required:"Enter last fullName",
        trim: true
       
    },

   logoLink:{
    type:String
   },

    isDeleted: {
        type: Boolean,
        default: false
    },
   
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);

