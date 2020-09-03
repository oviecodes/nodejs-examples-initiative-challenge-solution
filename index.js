

const express = require('express')
const hbs = require('hbs')
const dependenciesRoute = require('./routes/dependenciesRoute')
const latestReleaseRoute = require('./routes/latestReleaseRoute')
const minimunSecureRoute = require('./routes/minimumSecureRoute')

const app = express()
const PORT = 3000

app.set('view engine', hbs); 

app.use('/dependencies', dependenciesRoute)
app.use('/latest-release', latestReleaseRoute)
app.use('/minimum-secure', minimunSecureRoute)

app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`)
})

module.exports = app
