const express = require('express')
const { check, validationResult } = require('express-validator')
const ROUT = express.Router()
const auth_middleware = require('../Authentication/auth_middleware')
const PlaylistModel = require('../Database/PlaylistModel')

// # GET api/playlist
// # Private
// # Get Users Playlists
ROUT.get('/', auth_middleware, async (req, res) => {
    try {
        const foundPlaylist = await PlaylistModel.find({myOwnerID: req.user}).sort({title: 1})
        res.json(foundPlaylist)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "catch err | getting playlist"})
    }
})

// # GET api/playlist/:id
// # Private
// # Get Playlist Items
ROUT.get('/:id', auth_middleware, async (req, res) => {
    try {
        const foundPlaylist = await PlaylistModel.findById(req.params.id)
        res.json(foundPlaylist)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "catch err | getting playlist items"})
    }
})


// # POST api/playlist
// # Private
// # create a new Playlists
ROUT.post('/', 
[
    auth_middleware,
    [
        check('title').exists().withMessage('Title is required')
    ]
]
, async (req, res) => {
    const validator_errors = validationResult(req);
    if(!validator_errors.isEmpty()){
        return res.status(400).json({ msg: validator_errors.array()[0].msg });
    }

    try {
        const foundPlaylist = await PlaylistModel.findOne({ $and: [{title: req.body.title}, {myOwnerID: req.user}]})
        if(foundPlaylist) {
            return res.status(400).json({ msg: "playlist already exist" })
        }

        const playlistField = {
            myOwnerID: req.user,
            title: req.body.title
        }
        if (req.body.movieID) playlistField.movieIDs = req.body.movieID

        const newPlaylist = await new PlaylistModel(playlistField)

        newPlaylist.save()

        res.json(newPlaylist)
    } catch (err) {
        console.log(err);
        res.status(400).json({msg: "catch err | creating playlist"})
    }
})

// # PUT api/playlist/:id
// # Private
// # Add item to Playlists
ROUT.put('/:id', auth_middleware, async (req, res) => {
    try {
        let foundPlaylist = await PlaylistModel.findById(req.params.id)
        if(!foundPlaylist) {
            return res.status(401).json({ msg: "playlist doesn't exist" })
        }

        if(foundPlaylist.movieIDs.includes(req.body.movieID)){
            return res.status(401).json({msg: "Movie already in playlist"})
        }

        await PlaylistModel.findByIdAndUpdate( {_id: req.params.id}, {$push: {movieIDs: req.body.movieID}} )
        foundPlaylist = await PlaylistModel.findById(req.params.id)
        res.json(foundPlaylist)
    } catch (err) {
        console.log(err.msg);
        res.status(400).json({msg: "catch err | Adding item to playlist"})
    }
})
// # PUT api/playlist/deleteItem/:id
// # Private
// # Delete item from Playlists
ROUT.put('/deleteItem/:id', auth_middleware, async (req, res) => {
    try {
        let foundPlaylist = await PlaylistModel.findById(req.params.id)
        if(!foundPlaylist) {
            return res.status(401).json({ msg: "playlist doesn't exist" })
        }
        if(!foundPlaylist.movieIDs.includes(req.body.movieID)){
            return res.status(401).json({msg: "Movie doesn't exist in the playlist"})
        }

        await PlaylistModel.findByIdAndUpdate(req.params.id, {$pull: {movieIDs: req.body.movieID}} )
        foundPlaylist = await PlaylistModel.findById(req.params.id)
        console.log(foundPlaylist, "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        res.json(foundPlaylist)
    } catch (err) {
        console.log(err.msg);
        res.status(400).json({msg: "catch err | Deleting item from playlist"})
    }
})
// # DELETE api/playlist/:id
// # Private
// # Delete a Playlist
ROUT.delete('/:id', auth_middleware, async (req, res) => {
    try {
        const foundPlaylist = await PlaylistModel.findByIdAndRemove(req.params.id)
        if(!foundPlaylist) {
            return res.status(401).json({ msg: "playlist doesn't exist" })
        }
        res.json({msg: 'Playlist removed'})
    } catch (err) {
        console.log(err.msg);
        res.status(400).json({msg: "catch err | Deleting playlist"})
    }
})





module.exports = ROUT