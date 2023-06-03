const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
    patient: {
        type: Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    medications: [{
        medication: {
            type: Types.ObjectId,
            ref: 'Medication',
            required: true
        },
        dose: {
            type: String,
            required: true
        },
    }],
    schedule: {
        type: Number,
        required: true,
        index: true
    },
    createdAt:{
        type: Date,
        default: new Date
    },
    nurse: {
        type: Types.ObjectId,
        ref: 'Nurse',
        required: true
    },
    doctorNotes: {
        type: String,
        default:null
    },
    completed: {
        type: Boolean,
        default: false,
        index: true
    },
})

module.exports = model('Task', schema)