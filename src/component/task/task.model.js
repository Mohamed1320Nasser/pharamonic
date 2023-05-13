const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
    patient: {
        type: Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    medication: {
        type: Types.ObjectId,
        ref: 'Medication',
        required: true
    },
    dose: {
        type: String,
        required: true
    },
    scheduledTime: {
        type: Date,
        required: true
    },
    nurse: {
        type: Types.ObjectId,
        ref: 'Nurse',
        required: true
    },
    doctorNotes: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
})

module.exports = model('Task', schema)