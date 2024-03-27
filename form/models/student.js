const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StudetnSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Student email is required"]
    },
    studentId: {
        type: String,
        required: [true, "Student D number is required"],
        validate: {
            validator: function (v) {
                return /^\d{8}.test(v);
            },
            message: props => `${props.value} is not valid 8-digit student ID number!`
        }
    }
})

const StudentModel = mongoose.model("Students", StudetnSchema)

module.exports = StudentModel