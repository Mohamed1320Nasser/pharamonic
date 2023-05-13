const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
    name: {
         type: String,
          required: true
         },
    specialty: {
         type: String, 
         required: true },
    phone: { 
        type: String,
         required: true 
        },
    email: { type: String },
    Id: { type: String,
         required: true, 
         unique: true 
        },
     profileImage:{
          type: String,
          default:"https://res.cloudinary.com/dufrfkj11/image/upload/v1683993434/defult/3774299_fscjbd.png"
     },
     cloudinary_id:{
          type:String,
          default:"default"
     },
     role:{
          type:String,
          default:" doctor",
      },
})

module.exports = model('Doctor', schema)