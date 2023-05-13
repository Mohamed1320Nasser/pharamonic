const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    medicalHistory: {
        type: String
    },
    lastVisited: {
        type: Date
    },
    profileImage:{
        type:String,
        default:"https://res.cloudinary.com/dufrfkj11/image/upload/v1683993281/defult/950150_fix89l.png"
    },
    cloudinary_id:{
        type:String,
        default:"default"
    },
    role:{
        type:String,
        default:" patient",
    },
})
module.exports = model('Patient', schema)