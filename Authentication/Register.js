const express = require('express')
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const ROUT = express.Router()
const UserModel = require('../Database/UserModel')


// # POST api/reg
// # Public
// # Register User with name, email, password & Get Token
ROUT.post('/',
[
    check('name', 'Name cannot be empty').exists(),
    check('email', 'Enter valid email').isEmail(),
    check('password').exists().isLength({ min: 5 }).withMessage('Password must contain at least 5 digits')
],
async (req, res) => {
    const validator_errors = validationResult(req);
    if(!validator_errors.isEmpty()){
        return res.status(401).json({ msg: validator_errors.array()[0].msg });
    }

    let {name, email, password} = req.body

    try {
        let foundUser = await UserModel.findOne({email})

        if(foundUser) {
            return res.status(400).json({msg: "User already exist"})
        }

        const salt = await bcryptjs.genSalt(10);
        password = await bcryptjs.hash(password, salt);

        newUser = new UserModel({
            name, email, password 
        })
        await newUser.save()

        const paylaod = {
            user: newUser.id
        }

        jwt.sign(paylaod, config.get('jwt_secret_key'), {expiresIn: 360000}, (err, token) => {
            if(err) throw err
            res.json({token})
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'catch err | JWT Register'})
    }
})

module.exports = ROUT