const { Schema, model } = require("mongoose")

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
    Id:{
        type:String,
        required: true,
        unique: true,
       },
       password:{
           type:String,
          default:"Nurse#2023"
       },
       passwordChangeAt:{
        type:Date,
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
schema.pre("save", function () {
    this.password = bcrypt.hashSync(
      this.password,
      Number(process.env.saltRounds)
    );
  });

module.exports = model('Nurse', schema)