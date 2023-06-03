const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
    patient: {
        type: Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    nuse:{
        type: Types.ObjectId,
        ref: 'Nurse',
        required: true
    },
    title:String,
    description:String
})
module.exports = model('Natification', schema)