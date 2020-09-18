const express = require('express')
const { check, validationResult } = require('express-validator')
const ROUT = express.Router()
const auth_middleware = require('../Authentication/auth_middleware')
const RatingModel = require('../Database/RatingModel')


// # GET api/rating
// # Private
// # Get Users Rating for all moives
ROUT.get('/', auth_middleware, async (req, res) => {
    try {
        const foundRating = await RatingModel.find({myOwnerID: req.user})
        res.json(foundRating)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "catch err | getting all movie rating"})
    }
})

// # GET api/rating/:movieID
// # Private
// # Get Rating of one moive
ROUT.get('/:movieID', auth_middleware, async (req, res) => {
    try {
        const foundRating = await RatingModel.findOne({ $and: [{movieID: req.params.movieID}, {myOwnerID: req.user}]})
        if(!foundRating) {
            return res.status(200).json({ msg: "You haven't rated this movie" })
        }
        res.json(foundRating)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "catch err | getting one movie rating"})
    }
})

// # POST api/rating
// # Private
// # Rate a movie
ROUT.post('/', 
[
    auth_middleware,
    [
        check('rate').exists().withMessage('Please Rate')
    ]
]
,async (req, res) => {
    const validator_errors = validationResult(req);
    if(!validator_errors.isEmpty()){
        return res.status(400).json({ msg: validator_errors.array()[0].msg });
    }

    try {
        const foundRating = await RatingModel.findOne({ $and: [{movieID: req.body.movieID}, {myOwnerID: req.user}]})
        if(foundRating) {
            return res.status(400).json({ msg: "You already rated this movie" })
        }

        const ratingField = {
            myOwnerID: req.user,
            movieID: req.body.movieID,
            rate: req.body.rate
        }
        if (req.body.comment) ratingField.comment = req.body.comment

        const newRating = await new RatingModel(ratingField)

        newRating.save()

        res.json(newRating)
    } catch (err) {
        console.log(err);
        res.status(400).json({msg: "catch err | Rating a movie"})
    }
})


module.exports = ROUT