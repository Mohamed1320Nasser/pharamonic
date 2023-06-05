const patientMode=require('./patient.model')
const factory=require("../Handler/handle.refactor");
const { Signin, getProfile, changePassword } = require('../auth/authentcation');
const { catchAsyncError } = require('../../utils/catchAsyncErr');
const AppError = require('../../utils/AppError');

// craete Patient account 
exports.createPatientAccount =  catchAsyncError(async (req, res, next) => {
    const IsPatient = await patientMode.findOne({ Id: req.body.Id });
    if(IsPatient)  return next(new AppError("Patient ID alredy exist", 401));
    req.body.password=process.env.DEFAULT_PATIENT
    const Patient = new patientMode(req.body);
    await Patient.save();
    return res.status(200).json({ message:"success to Create Patient"});
  });

// authenticate login for Patient
exports.patientLogin = Signin(patientMode,"patient")

// get Patient profile
exports.patientProfile=getProfile(patientMode)

// change password for Patient
exports.patientChangePass= changePassword(patientMode)



// get all Patients
exports.getAllPatientAccounts = factory.getAll(patientMode)

// get specific Patient
exports.getSpcificPatientAccount = factory.getOne(patientMode)

//delete specific Patient
exports.deletePatientAccount = factory.deleteOn(patientMode)

// update specific Patient
exports.UpdatePatientAccount = factory.updateOne(patientMode)

