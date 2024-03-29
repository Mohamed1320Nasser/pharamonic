const jwt=require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { catchAsyncError } = require('../../utils/catchAsyncErr');
const AppError = require('../../utils/AppError');
const mangerModel=require('../maanger/manger.model')
const doctorModel=require('../doctor/doctor.model')
const nurseModel=require('../nurse/nurse.model')
const patientModel=require('../patient/patient.model')

module.exports.Signin = (Model, type) => {
  return catchAsyncError(async (req, res, next) => {
    const { Id, password, fcmToken } = req.body;
    const User = await Model.findOne({ Id });
    if (!User) return next(new AppError("You do not have an account, or the ID is incorrect", 401));
    const match = await bcrypt.compare(password, User.password);
    if (!match) return next(new AppError("Incorrect password", 401));
    if (type === "nurse" || type === "patient") {
      if (!fcmToken) {
        return next(new AppError("fcmToken is missing", 400));
      }
      updateFCM(Model,Id,fcmToken)
    }
    const token = jwt.sign(
      { UserId: User._id, name: User.name, role: User.role },
      process.env.secrit_key
    );
    return res.status(200).json({ message: "Login success", token });
  });
};

exports.protectedRoutes = catchAsyncError(async (req, res, next) => {
  try{
    const { token } = req.headers;
    if (!token) return next(new AppError("You Should Make login", 401));
    let decoded = jwt.verify(token, process.env.secrit_key);
    let Model;
    if (decoded.role === "manger") {
      Model = mangerModel;
    } else if (decoded.role === "patient") {
      Model = patientModel;
    } else if (decoded.role === "doctor") {
      Model = doctorModel;
    } else if (decoded.role === "nurse") {
      Model = nurseModel;
    } else {
      return next(new AppError("Invalid role", 401));
    }
    const User = await Model.findById(decoded.UserId);
    if (!User) return next(new AppError("User not found", 404));
    if (User.passwordChangeAt) {
      let changePassword = parseInt(User.passwordChangeAt.getTime() / 1000);
      if (changePassword > decoded.iat)
        return next(new AppError("password changed please login agine", 401));
    }
    req.User = User;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token. Please log in again", 401));
    } else {
      return next(new AppError("Something went wrong", 500));
    }
  }
  });
  /**/ 

  exports.allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
      if (!roles.includes(req.User.role))
        return next(new AppError("You don't have permission to do this", 401));
      next();
    });
  };
  
  exports.getProfile= (Model)=>{
    return catchAsyncError(async (req, res, next) => {
        const User= await Model.findById(req.User._id)
          if(!User) return next(new AppError(`No user NOt found`,404));
          res.status(200).json({ data: User})
    })
}

exports.changePassword =(Model)=>{
  return  catchAsyncError(async (req, res,next) => {
        const { oldPassword, newPassword } = req.body;
        let match = await bcrypt.compare(oldPassword, req.User.password);
        if (match) {
          await Model.findByIdAndUpdate(req.User._id, { password: newPassword ,passwordChangeAt:Date.now() });
          res.status(200).json({ message: "change password is success" });
        } else {
         return next(new AppError("Old password is incorrect",401))
        }
      });
    }
    
      const updateFCM=async(Model,Id,fcmToken)=>{
         const upadtefcmTokent = await Model.findOneAndUpdate({Id},{fcmToken})
         return 
      }