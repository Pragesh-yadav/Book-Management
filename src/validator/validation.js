const mongoose = require("mongoose");


const validateEnum = function validateEnum(value) {


  var titleEnum = ["Mr", "Mrs", "Miss"];
  if (titleEnum.includes(value)) {
    return true;
  }

  return false;
};

const validateNumber = function validateNumber(value) {
  if (typeof value == "number") {
    return true;
  }
  return false;
};

const validateString = function (name) {
  if (typeof name == undefined || typeof name == null) return false;
  if (typeof name == "string" && name.trim().length == 0) return false;

  return true;
};

const checkValue = function (value) {
  let arrValue = [];
  value.map((x) => {
    x = x.trim();
    if (x.length) arrValue.push(x);
  });
  return arrValue.length ? arrValue : false;
};

const convertToArray = function (value) {
  if (typeof value == "string") {
    value = value.trim();
    if (value) {
      return [value];
    }
  } else if (value?.length > 0) {
    return checkValue(value);
  }
  return false;
};

const validateEmail = function (value) {
  let re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  let validEmail = re.test(value);

  if (!validEmail) {
    return false;
  }

  return true;
};

const validatePassword = function (value) {
  let re = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
  let validPassword = re.test(value);

  if (!validPassword) {
    return false;
  }

  return true;
};

const validateRequest = function (value) {
  if (Object.keys(value).length == 0) {
    return false;
  } else return true;
};
let validateObjectId = function (ObjectId) {
  return mongoose.isValidObjectId(ObjectId)
}
const passwordLength = function (password) {
  if (password.length >= 8 && password.length <= 15) {
    return true;
  } else return false;
};


const isValidISBN = function (ISBN) {

  if (/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN) || /^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN) || /^(?=(?:\D*\d){17}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN)) {
    return true
  }
  else { return false }
}
module.exports = {
  validateString,
  convertToArray,
  checkValue,
  validateEmail,
  validatePassword,
  validateRequest,
  validateNumber,
  validateObjectId,
  passwordLength,

  validateEnum,
  isValidISBN
};