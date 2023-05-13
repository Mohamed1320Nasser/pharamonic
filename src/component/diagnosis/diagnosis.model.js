const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
    patient: {
        type: Types.ObjectId,
        ref: 'Patient', required: true
    },
    doctor: {
        type: Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    prescription: { type: String },
})
module.exports = model('Diagnosis', schema)