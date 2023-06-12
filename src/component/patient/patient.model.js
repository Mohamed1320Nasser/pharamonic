const { Schema, model } = require("mongoose")
const bcrypt = require('bcrypt')
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    Id:{
     type:String,
     required: true,
     unique: true,
    },
    password:{
        type:String,
    },
    passwordChangeAt:{
        type:Date,
      },
      sex:{
        type:String,
        enum:["male", "female"]
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
        default:"https://res.cloudinary.com/dufrfkj11/image/upload/v1685220950/defult/4228704_bcumy9.png"
    },
    fcmToken:{
        type:String,
        default:null
    },
    role:{
        type:String,
        default:"patient",
    },
})
schema.pre("save", function () {
    this.password = bcrypt.hashSync(
      this.password,
      Number(process.env.saltRounds)
    );
  });
module.exports = model('Patient', schema)