const express = require('express')
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const ROUT = express.Router()
const auth_middleware = require('./auth_middleware')
const UserModel = require('../Database/UserModel')


// # GET api/login
// # Private
// # Get Current User Data
ROUT.get('/', auth_middleware, async (req, res) => {
    try {
        const userData = await UserModel.findById(req.user).select("-password")
        res.json(userData)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'catch error | GET current user | api/login'})
    }
})


// # POST api/login
// # Public
// # Authenticate User & Get Token
ROUT.post('/',
[
    check('email', 'Enter valid email').isEmail(),
    check("password","Password can't be empty.").exists()
],
async (req, res) => {
    const validator_errors = validationResult(req);
    if(!validator_errors.isEmpty()){
        return res.status(400).json({ msg: validator_errors.array()[0].msg });
    }

    let {email, password} = req.body

    try {
        let foundUser = await UserModel.findOne({email})

        if(!foundUser) {
            return res.status(400).json({msg: "User doesn't exist"})
        }

        const isPasswordCorrect = await bcryptjs.compare(password, foundUser.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({msg: "Password doesn't match"})
        }

        const paylaod = {
            user: foundUser.id
        }

        jwt.sign(paylaod, config.get('jwt_secret_key'), {expiresIn: 360000}, (err, token) => {
            if(err) throw err
            res.json({token})
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'catch err | JWT Login'})
    }
})

module.exports = ROUT