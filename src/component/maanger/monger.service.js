
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const factory=require("../Handler/handle.refactor");
const { Signin, getProfile, changePassword } = require("../auth/authentcation");
const mangerModel = require("./manger.model");

// craete manager account 
exports.createManager=  catchAsyncError(async (req, res, next) => {
        const IsManger = await mangerModel.findOne({ Id: req.body.Id });
        if(IsManger)  return next(new AppError("Manager alredy exist", 401));
        req.body.password=process.env.DEFAULT_MANGER
        const manger = new mangerModel(req.body);
        await manger.save();
        return res.status(200).json({ message:"success to Create Monger"});
      });


// authenticate login in manger
exports.mangerLogin = Signin(mangerModel)

// show  manger profile
exports.mangerProfile=getProfile(mangerModel)

// change password for manger
exports.changePassManger=changePassword(mangerModel)

// get all  managers account 
exports.getAllMangersAccunts=factory.getAll(mangerModel)

// get spcific manager account 
exports.getMangerAccunt=factory.getOne(mangerModel)

// delete spcific managers account account
exports.deleteMangerAccunt=factory.deleteOn(mangerModel)

// update spcific manger account
exports.updateMangerAccunt=factory.updateOne(mangerModel)


