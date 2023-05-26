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
schema.pre("save", function () {
    this.password = bcrypt.hashSync(
      this.password,
      Number(process.env.saltRounds)
    );
  });
module.exports = model('Patient', schema)