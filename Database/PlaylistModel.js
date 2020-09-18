const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    myOwnerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    title:{
        type: String,
        required: true
    },
    movieIDs: [String]
})

module.exports = PlaylistModel = mongoose.model("PlaylistCollection", PlaylistSchema);