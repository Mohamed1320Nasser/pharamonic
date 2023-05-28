const { Schema, model } = require("mongoose")

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    activeIngredients: {
        type: String,
        required: true
    },
    doses: {
        type: String,
        required: true
    },
    warnings: {
        type: String
    },
    sideEffects: {
        type: String
    },
})

module.exports = model('Medication', schema)