const AppError = require("../../utils/AppError")
const { catchAsyncError } = require("../../utils/catchAsyncErr")
const medicationModel = require("../medication/medication.model")

exports.create = (Model) => {
    return catchAsyncError(async (req, res, next) => {
        const Document = new medicationModel(req.body)
        await Document.save()
        res.status(200).json({ message: "Sucessful Save"})
    })
}
exports.getOne = (Model) => {
    return catchAsyncError(async (req, res, next) => {
        const Document = await Model.findById(req.params.id)
        !Document && next(new AppError("Document not found", 404));
        Document && res.status(200).json({ result: Document })
    })
}
exports.getAll = (Model) => {
    return catchAsyncError(async (req, res, next) => {
        let filter={}
        if(req.query.keyword){
            let {keyword}=req.query
            filter={
                $or: [
                  { name: { $regex: keyword, $options: "i" } },
                  { Id: { $regex: keyword, $options: "i" } },
                ],
              }
        }
        const Document = await Model.find(filter).sort({ name: 1 })
        !Document && next(new AppError("Document not found", 404));
        Document && res.status(200).json({ result: Document })
    })
}

exports.deleteOn = (Model) => {
    return catchAsyncError(async (req, res, next) => {
      const { id } = req.params;
      const Document = await Model.findById(id);
      if (!Document) return next(new AppError("Document not found", 404));
      await Model.findByIdAndDelete(id);
      res.status(200).json({message:"Sucessful Delete"});
    });
  };

//update any document 
exports.updateOne = (Model) =>{
   return catchAsyncError(async (req, res, next) => {
        const Document = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        Document.save();
        !Document && next(
            new AppError(`No document for this id ${req.params.id}`, 404)
        );
        Document && res.status(200).json({message:"Sucessful Update"});
    });
}
exports.serDefaultPassword=(Model,password)=>{
    return catchAsyncError(async(req,res,next)=>{
        const {id}=req.params
       const user= await Model.findByIdAndUpdate(id,{password},{new :true})
       if(!user) return next(new AppError(`No user for this id ${id}`, 404));
       res.status(200).json({"message":"set default password successfully"})
     })
}


