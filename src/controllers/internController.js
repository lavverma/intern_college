let isValid = function (attribute) {
    return (/^[a-zA-Z]{2,20}$/.test(attribute.trim()))
}

const isvalidEmail = function (gmail) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/   //.test(gmail);
    return regex.test(gmail)
}
const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.valid(ObjectId);   // to validate a MongoDB ObjectId we are use .isValid() method on ObjectId
  };
