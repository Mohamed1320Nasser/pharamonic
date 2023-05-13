const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
    name: {
        type: String,
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
    email: { type: String },
    ID: {
        type: String,
        required: true,
        unique: true
    },
    profileImage:{
        type:String,
        default:"https://res.cloudinary.com/dufrfkj11/image/upload/v1683993602/defult/119044_mec8za.png"
    },
    cloudinary_id:{
        type : String,
        default:"default"
    },
    role:{
        type:String,
        default:" nurse",
    },
})

module.exports = model('Nurse', schema)