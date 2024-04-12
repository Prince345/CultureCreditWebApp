// Import dependencies
const express = require('express');
const qrcode = require('qrcode');
const app = express ();
const PORT = 3000;

// Define QR Generation route
app.get('/qrcode', (req, res) => {
    // Define URL that will be converted into QR code
    const url = 'http://localhost:3000';

    // Convert URL into dataUrl (QR image representation)
    qrcode.toDataURL(url, (err, qrCodeUrl) => {
        // Handle QR generation errors
        if (err) {
            res.status(500).send('Internal Server Error');
        } else  {
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
})

