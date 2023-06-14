const patientMode=require('./patient.model')
const factory=require("../Handler/handle.refactor");
const { Signin, getProfile, changePassword } = require('../auth/authentcation');
const { catchAsyncError } = require('../../utils/catchAsyncErr');
const AppError = require('../../utils/AppError');
const appointmentModel = require('../appointment/appointment.model');
const diagnosisModel = require('../diagnosis/diagnosis.model');

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

// get Patient profile
exports.patientProfile=getProfile(patientMode)

exports.defaultPasswordforPatient=factory.serDefaultPassword(patientMode,process.env.DEFAULT_PATIENT)



exports.patientAppointments=catchAsyncError(async(req,res,next)=>{
  pationetId =req.User._id
  const appointments = await appointmentModel.find({patient:pationetId}).populate([{
    path: 'patient',
    select: 'name Id -_id'
}, {
    path: 'nurse',
    select: 'name Id -_id'
}, {
    path: 'medications.medication',
    select: 'name -_id'
}])
  if(!appointments) return next(new AppError("You do not have any appointment",404))
res.status(200).json({result:appointments})
})
exports.patientDiagnosis=catchAsyncError(async(req,res,next)=>{
  pationetId =req.User._id
  const Diagnosis = await diagnosisModel.find({patient:pationetId}).populate([{
    path: 'patient',
    select: 'name Id -_id dateOfBirth phone'
}, {
    path: 'doctor',
    select: 'name Id -_id specialty'
}])
  if(!Diagnosis) return next(new AppError("Soon you will be diagnosed",404))
res.status(200).json({result:Diagnosis})
})



