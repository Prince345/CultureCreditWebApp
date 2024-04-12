var express = require("express")
var bodyParser = require("body-parser")
var qrRoute = require('./Routes/qrRoute')
var signupRoute = require("./Routes/signupRoute")

const app = express()

// Middleware to parse JSON and urlencoded bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

// Serves static files
app.use(express.static('public'))

// Using Routes
app.use(signupRoute)
app.use(qrRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
