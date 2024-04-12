const mongoose = require("mongoose")
const {Timestamp} = require("mongodb");
const Schema = mongoose.Schema

const QRSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    generationDate: {
        type: Date,
        required: true
    },
    dataString: {
        type: String,
        required: true
    },
    generationTime: {
        type: Timestamp,
        required: true
    },
    deletionTime: {
        type: Timestamp,
        required: true
    }
})

const QRModel = mongoose.model("qr", QRSchema)

module.exports = QRModel