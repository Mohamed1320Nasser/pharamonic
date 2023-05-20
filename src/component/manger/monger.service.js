
const factory=require("../Handler/handle.refactor");
const { Signin, getProfile, changePassword } = require("../auth/authentcation");
const mangerModel = require("./manger.model");

// authenticate login in manger
exports.mangerLogin = Signin(mangerModel)

// show  manger profile
exports.mangerProfile=getProfile(mangerModel)

// change password for manger
exports.changePassManger=changePassword(mangerModel)

// craete manager account 
exports.createManager= factory.create(mangerModel)

// get all  managers account 
exports.getAllMangersAccunts=factory.getAll(mangerModel)

// get spcific manager account 
exports.getMangerAccunt=factory.getOne(mangerModel)

// delete spcific managers account account
exports.deleteMangerAccunt=factory.deleteOn(mangerModel)

// update spcific manger account
exports.updateMangerAccunt=factory.updateOne(mangerModel)


