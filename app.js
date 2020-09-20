const express = require('express');
const ConnectDB = require('./Database/MongoConnect');
const app = express();

ConnectDB()

app.use(express.json({extended: false}))

// app.get("/", (req, res) => {
//     res.send("<h1>🍆🍆🍆🍆🍆🍆🍆🍆🍆🍆</h1>")
// })

app.use('/api/reg', require('./Authentication/Register'))
app.use('/api/login', require('./Authentication/Login'))
app.use('/api/playlist', require('./route/Playlist'))
app.use('/api/rating', require('./route/Rating'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));