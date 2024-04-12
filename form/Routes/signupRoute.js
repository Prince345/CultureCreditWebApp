const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const StudentModel = require("../Models/student")

mongoose.connect('mongodb://localhost:27017/PEMACS');
const db = mongoose.connection;

db.on('error', () => console.log("Error with Connecting to Database for Signup"));
db.once('open', () => console.log("Successfully connected to Database for Signup"));

// Route to handle form submission
router.post("/signup", async (req, res) => {
    const {firstName, lastName, email, studentId} = req.body;

    try {
        const newStudent = new StudentModel({
            firstName,
            lastName,
            email,
            studentId,
        });

        db.collection('Students').insertOne(newStudent)
        console.log("Record Inserted Successfully");
        return res.redirect('signup_success.html')
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
});

module.exports = router;
