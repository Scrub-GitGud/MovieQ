const express = require('express');
const app = express();
const ConnectDB = require('./Database/MongoConnect');
const path = require('path')

ConnectDB()

app.use(express.json({extended: false}))

// app.get("/", (req, res) => {
//     res.send("<h1>🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆</h1>")
// })

app.use('/api/reg', require('./Authentication/Register'))
app.use('/api/login', require('./Authentication/Login'))
app.use('/api/playlist', require('./route/Playlist'))
app.use('/api/rating', require('./route/Rating'))


// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    // '*' means get for any route except paths declared above
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));