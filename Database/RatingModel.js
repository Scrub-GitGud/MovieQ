const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    myOwnerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    movieID:{
        type: String,
        required: true
    },
    rate:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
    }
})

module.exports = RatingModel = mongoose.model("RatingCollection", RatingSchema);