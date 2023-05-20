
const DoctorMode=require('./doctor.model')
const factory=require("../Handler/handle.refactor");
const { Signin, changePassword, getProfile } = require('../auth/authentcation');

// authenticate login in doctor
exports.loginDoctor = Signin(DoctorMode)

// craete Doctor account 
exports.createDoctorAccount = factory.create(DoctorMode)

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