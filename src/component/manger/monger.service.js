
const factory=require("../Handler/handle.refactor");
const mangerModel = require("./manger.model");

exports.createManager= factory.create(mangerModel)
// exports.getManger=factory.create(mangerModel)
