let userModel = require("../models/userModel")
let jwt = require("jsonwebtoken")
const {
    validateString,
    convertToArray,
    checkValue,
    validateEmail,
    validatePassword,
    validateRequest,
    validateNumber,
    isValidObjectId,
    passwordLength,
    validateEnum
} = require("../validator/validation");


const validator = require('validator')



const regxValidator = function (val) {
    let regx = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
    return regx.test(val);
}

const regexNumber = function (val) {
    let regx = /^([+]\d{2})?\d{10}$/
    return regx.test(val)
}



//  <=================================>[CREATE USER API] <==============================>


const createUser = async function (req, res) {
    try {
        let user = req.body;

        if (!validateRequest(user)) {
            return res.status(400).send({ status: false, message: "details is required in body" })
        }


        if (!validateString(user.title)) {
            return res.status(400).send({ status: false, message: "title must be required" })
        }
        if (!validateEnum(user.title)) { return res.status(400).send({ status: false, message: "title must be 'Mr' /'Mrs' /'Miss'" }) }

        if (!validateString(user.name)) {
            return res.status(400).send({ status: false, message: "name is required" })
        }
        if (!regxValidator(user.name)) {
            return res.status(400).send({ status: false, message: "please provide a valid name" })
        }


        if (!validateString(user.phone)) {
            return res.status(400).send({ status: false, message: "phone is required" })
        }
        if (!regexNumber(user.phone)) {
            return res.status(400).send({ status: false, message: "please enter a valid number/number must be start with 9/8/7/6" })
        }
        const checkPhone = await userModel.findOne({ phone: user.phone })
        if (checkPhone) {
            return res.status(400).send({ status: false, message: `number ${user.phone} is already used` })
        }
        if (!validateString(user.email)) {
            return res.status(400).send({ status: false, message: "email is required" })
        }
        if (!validator.isEmail(user.email)) {
            return res.status(400).send({ status: false, message: "email is not correct" })
        }
        const checkEmailId = await userModel.findOne({ email:user.email })
        if (checkEmailId) {
            return res.status(400).send({ status: false, message: `email ${user.email} is already used` })
        }
        if (!passwordLength(user.password)) {
            return res.status(400).send({ status: false, message: "password must be between 8 to 15" })
        }
        if (!validateString(user.address)) { return res.status(400).send({ status: false, message: "please provide address" }) }
        if (!validateString(user.address.street)) { return res.status(400).send({ status: false, message: "please provide street" }) }
        if (!validateString(user.address.city)) { return res.status(400).send({ status: false, message: "please provide city" }) }
        if (!validateString(user.address.pincode)) { return res.status(400).send({ status: false, message: "please provide pincode" }) }

        let userCreated = await userModel.create(user)
        res.status(201).send({
            status: true,
            message: "Success",
            data: userCreated
        })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
};


//  <=================================>[USER LOGIN API] <==============================>

let userLogin = async function (req, res) {
    try {
        let email = req.body.email
        let password = req.body.password
        if (!validateString(email)) {
            return res.status(400).send({ status: false, message: "email is required" })
        }
        if (!validateString(password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        }

        let user = await userModel.findOne({ email: email, password: password });
        if (!user)
            return res.status(400).send({
                status: false,
                message: "email or the password is not correct",
            });
        let token = jwt.sign(
            {
                userId: user._id.toString(),
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            "functionup-radon"
        );

        res.status(200).send({ status: true, message: "Success", data:{token: token} });
    }
    catch (err) {

        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = { createUser, userLogin }