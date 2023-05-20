const nurseMode=require('./nurse.model')
const factory=require("../Handler/handle.refactor");
const { Signin, getProfile, changePassword } = require('../auth/authentcation');


// authentication login Nurse
exports.nurseLogin=Signin(nurseMode)

// get Nurse profile information
exports.nurseprofile = getProfile(nurseMode)

// change password for Nurse 
exports.nurseCangePass = changePassword(nurseMode)



// craete nurse account 
exports.createNurseAccount = factory.create(nurseMode)

// get all nurses
exports.getAllNurseAccounts = factory.getAll(nurseMode)

// get specific nurse
exports.getSpcificNurseAccount = factory.getOne(nurseMode)

//delete specific nurse
exports.deleteNurseAccount = factory.deleteOn(nurseMode)

// update specific nurse
exports.UpdateNurseAccount = factory.updateOne(nurseMode)

