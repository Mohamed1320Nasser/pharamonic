
const DoctorMode=require('./doctor.model')
const factory=require("../Handler/handle.refactor");
const { Signin, changePassword, getProfile } = require('../auth/authentcation');
const { catchAsyncError } = require('../../utils/catchAsyncErr');
const AppError = require('../../utils/AppError');

// craete Doctor account 
exports.createDoctorAccount = catchAsyncError(async (req, res, next) => {
    const IsDoctor = await DoctorMode.findOne({ Id: req.body.Id });
    if(IsDoctor)  return next(new AppError("Manager alredy exist", 401));
    req.body.password=process.env.DEFAULT_DOCTOR
    const Doctor = new DoctorMode(req.body);
    await Doctor.save();
    return res.status(200).json({ message:"success to Create Doctor"});
  });

// authenticate login in doctor
exports.loginDoctor = Signin(DoctorMode)

// get all Doctors
exports.getAllDoctorAccounts = factory.getAll(DoctorMode)

// get specific Doctor
exports.getSpcificDoctorAccount = factory.getOne(DoctorMode)

//delete specific Doctor
exports.deleteDoctorAccount = factory.deleteOn(DoctorMode)

// update specific Doctor
exports.UpdateDoctorAccount = factory.updateOne(DoctorMode)

// show  doctor profile
exports.doctorProfile=getProfile(DoctorMode)

// change password
exports.changePassDoctor=changePassword(DoctorMode)

// set password defaults
exports.defaultPasswordforDoctor=factory.serDefaultPassword(DoctorMode,process.env.DEFAULT_DOCTOR)