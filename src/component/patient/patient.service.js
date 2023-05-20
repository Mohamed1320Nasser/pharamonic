const patientMode=require('./patient.model')
const factory=require("../Handler/handle.refactor");
const { Signin, getProfile, changePassword } = require('../auth/authentcation');

// authenticate login for Patient
exports.patientLogin = Signin(patientMode)

// get Patient profile
exports.patientProfile=getProfile(patientMode)

// change password for Patient
exports.patientChangePass= changePassword(patientMode)


// craete Patient account 
exports.createPatientAccount = factory.create(patientMode)

// get all Patients
exports.getAllPatientAccounts = factory.getAll(patientMode)

// get specific Patient
exports.getSpcificPatientAccount = factory.getOne(patientMode)

//delete specific Patient
exports.deletePatientAccount = factory.deleteOn(patientMode)

// update specific Patient
exports.UpdatePatientAccount = factory.updateOne(patientMode)

