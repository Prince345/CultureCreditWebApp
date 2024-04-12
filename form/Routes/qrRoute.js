const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const qrcode = require('qrcode');
const randomstring = require('randomstring');
const QRModel = require('../Models/qr-data')
const {Timestamp} = require("mongodb");

mongoose.connect('mongodb://localhost:27017/PEMACS');
const db = mongoose.connection;

db.on('error', () => console.log("Error with Connecting to Database for QR"));
db.once('open', () => console.log("Successfully connected to Database for QR"));

// Define QR Generation route
router.get('/qrcode', async (req, res) => {
    try {
        // Generate the current date and time
        const currentDate = new Date()
        const generationTime = new Timestamp(currentDate / 1000, 0) // Divided by 1000 to convert to seconds
        const deletionTime = new Timestamp((currentDate.getTime() + 5000) / 1000, 0) // Added 5 seconds
        const randomString = randomstring.generate(10)

        // New QR document to add to MongoDB
        const newQR = new QRModel({
            eventName: "Test Event",
            eventDate: currentDate,
            dataString: randomString,
            generationTime,
            deletionTime
        })

        // Insert the QR document to the database
        db.collection('QR-Codes').insertOne(newQR)
        res.status(200).json({message: "QR Code data inserted successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }

    // Define URL that will be converted into QR code
    const url = `http://localhost:3000?data=${encodeURIComponent(randomString)}`;

    // Convert URL into dataUrl (QR image representation)
    qrcode.toDataURL(url, (err, qrCodeUrl) => {
        // Handle QR generation errors
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send(`
                <!DOCTYPE HTML>
                <html>
                    <head>
                        <title>QR Code Generator</title>
                    </head>
                    <body>
                        <h1>QR Code Generator</h1>
                        <img src="${qrCodeUrl}" alt="QR Code">
                        <p>Scan the QR Code to Sign In</p>
                    </body>
                </html>
            `)
        }
    })
});

module.exports = router;
