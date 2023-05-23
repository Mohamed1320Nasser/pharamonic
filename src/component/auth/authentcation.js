const jwt=require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { catchAsyncError } = require('../../utils/catchAsyncErr');
const AppError = require('../../utils/AppError');



module.exports.Signin = (Model)=>{
return catchAsyncError(async (req, res, next) => {
    const User = await Model.findOne({ Id: req.body.Id });
    if (!User || !(await bcrypt.compare(req.body.password, User.password)))
      return next(new AppError("incorrect Id or password", 401));
    const token = jwt.sign(
      { UserId: User._id, name: User.name ,role:User.role},
      process.env.secrit_key
    );
    return res.status(200).json({ message:"Login success",token});
  });
}
exports.protectedRoutes = (Model)=>{
    return catchAsyncError(async (req, res, next) => {
    const { token } = req.headers;
    if (!token) return next(new AppError("You Should Make login", 401));
    let decoded = jwt.verify(token, process.env.secrit_key);
    const User = await Model.findById(decoded.UserId);
    if (!User) return next(new AppError("User not found", 404));
    if (User.passwordChangeAt) {
      let changePassword = parseInt(User.passwordChangeAt.getTime() / 100);
      if (changePassword > decoded.iat)
        return next(new AppError("password changed please login agine", 401));
    }
    req.User = User;
    next();
  });
}
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