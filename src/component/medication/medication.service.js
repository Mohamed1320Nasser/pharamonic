const medivationMode=require('./medication.model')
const factory=require("../Handler/handle.refactor");

// craete medication 
exports.createMedicate = factory.create(medivationMode)

// get all medications
exports.getAllMedicate = factory.getAll(medivationMode)

// get specific medication
exports.getSpcificMedicate = factory.getOne(medivationMode)

//delete specific medication
exports.deleteMedicate = factory.deleteOn(medivationMode)

// update specific medication
exports.UpdateMedicate = factory.updateOne(medivationMode)