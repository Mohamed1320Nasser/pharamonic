const nurseMode=require('./nurse.model')
const factory=require("../Handler/handle.refactor");
const { Signin, getProfile, changePassword } = require('../auth/authentcation');
const { catchAsyncError } = require('../../utils/catchAsyncErr');
const AppError = require('../../utils/AppError');


// craete nurse account 
exports.createNurseAccount = catchAsyncError(async (req, res, next) => {
    const IsNurse = await nurseMode.findOne({ Id: req.body.Id });
    if(IsNurse)  return next(new AppError("Nurse alredy exist", 401));
    req.body.password=process.env.DEFAULT_NURES
    const Nurse = new nurseMode(req.body);
    await Nurse.save();
    return res.status(200).json({ message:"success to Create Nurse"});
  });

// authentication login Nurse
exports.nurseLogin=Signin(nurseMode)

// get Nurse profile information
exports.nurseprofile = getProfile(nurseMode)

// change password for Nurse 
exports.nurseCangePass = changePassword(nurseMode)


// get all nurses
exports.getAllNurseAccounts = factory.getAll(nurseMode)

// get specific nurse
exports.getSpcificNurseAccount = factory.getOne(nurseMode)

//delete specific nurse
exports.deleteNurseAccount = factory.deleteOn(nurseMode)

// update specific nurse
exports.UpdateNurseAccount = factory.updateOne(nurseMode)

