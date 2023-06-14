const { Schema, model } = require("mongoose")
const bcrypt = require('bcrypt')
const schema = new Schema({
     name: {
          type: String,
          required: true
     },
     specialty: {
          type: String,
          required: true
     },
     phone: {
          type: String,
          required: true
     },
     email: { type: String },
     Id: {
          type: String,
          required: true,
          unique: true,
     },
     password: {
          type: String,
     },
     passwordChangeAt:{
       type:Date,
     },
     profileImage: {
          type: String,
          default: "https://res.cloudinary.com/dufrfkj11/image/upload/v1683993434/defult/3774299_fscjbd.png"
     },
     role: {
          type: String,
          default: "doctor",
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

module.exports = model('Doctor', schema)