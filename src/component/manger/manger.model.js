const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
    name: {
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
    id: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type:String,
        default:" manger",
    },
    password: {
        type: String,
        required: true,
    },
    profileImage:{
        type: String,
        default:"https://res.cloudinary.com/dufrfkj11/image/upload/v1683993281/defult/950150_fix89l.png"
    },
    cloudinary_id:{
        type:String,
        default:"default"
    },
   
});

module.exports=model('Manger',schema)