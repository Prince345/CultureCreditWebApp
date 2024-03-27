var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

// Middleware to parse JSON and urlencoded bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

// Serves static files
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/PEMACS');

var db = mongoose.connection;

db.on('error',()=>console.log("Error with Connecting to Database"));
db.once('open',()=>console.log("Successfully connected to Database"));

// Route to handle form submission
app.post("/signup",(req,res)=>{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var id = req.body.studentId;

    var studentData = {
        "fname": firstName,
        "lName": lastName,
        "email": email,
        "studentId": id,
    }

    db.collection('Students').insertOne(studentData,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')
})

app.get("/", (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen((3000));

console.log("Listening on PORT 3000")