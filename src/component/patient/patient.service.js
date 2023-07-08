const patientMode=require('./patient.model')
const factory=require("../Handler/handle.refactor");
const { Signin, getProfile, changePassword } = require('../auth/authentcation');
const { catchAsyncError } = require('../../utils/catchAsyncErr');
const AppError = require('../../utils/AppError');
const appointmentModel = require('../appointment/appointment.model');
const diagnosisModel = require('../diagnosis/diagnosis.model');
const mongoose = require("mongoose");

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
// update specific Patient
exports.UpdatePatientAccount = factory.updateOne(patientMode)

// get Patient profile
exports.patientProfile=getProfile(patientMode)

//delete specific Patient
exports.deletePatientAccount = catchAsyncError(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const patient = await patientMode.findById(id).session(session);
    if (!patient) {
      throw new AppError("Document not found", 404);
    }
    // Delete patient's diagnoses
    await diagnosisModel.deleteMany({ patient: id }).session(session);

    // Delete patient's appointments
    await appointmentModel.deleteMany({ patient: id }).session(session);

    // Delete patient 's notification
    await PatientNotification.deleteMany({ patient: id }).session(session);
    // Delete patient's account
    await patientMode.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Successful Delete" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(new AppError(error,401))
  }
});


exports.getpatientBelongsToDoctor=catchAsyncError(async(req,res,next)=>{
  const diagnoses =await diagnosisModel.find({doctor:req.User._id}).populate('patient')
  if(!diagnoses || diagnoses.length === 0) return next(new AppError("You not have Patients",401))
  const patients = diagnoses.map(diagnosis => diagnosis.patient).filter(patient => patient !== null);;
  res.status(200).json({result: patients})
})

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



