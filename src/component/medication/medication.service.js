const medicationModel=require('./medication.model')
const factory=require("../Handler/handle.refactor");

// craete medication 
exports.createMedicate = factory.create(medicationModel)

// get all medications
exports.getAllMedicate = factory.getAll(medicationModel)

// get specific medication
exports.getSpcificMedicate = factory.getOne(medicationModel)

//delete specific medication
exports.deleteMedicate = factory.deleteOn(medicationModel)

// update specific medication
exports.UpdateMedicate = factory.updateOne(medicationModel)