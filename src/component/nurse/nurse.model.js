const { Schema, model } = require("mongoose")
const bcrypt = require('bcrypt')
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    department: {
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
       },
       passwordChangeAt:{
        type:Date,
      },
    profileImage:{
        type:String,
        default:"https://res.cloudinary.com/dufrfkj11/image/upload/v1683993602/defult/119044_mec8za.png"
    },
    fcmToken:{
        type:String,
        default:null
    },
    role:{
        type:String,
        default:"nurse",
    },
})
schema.pre("save", function () {
    this.password = bcrypt.hashSync(
      this.password,
      Number(process.env.saltRounds)
    );
  });
  schema.pre("findOneAndUpdate", function () {
    if (!this._update.password) return;
    this._update.password = bcrypt.hashSync(
      this._update.password,
      Number(process.env.saltRounds)
    );
  });

module.exports = model('Nurse', schema)