const AppError = require("../../utils/AppError")
const { catchAsyncError } = require("../../utils/catchAsyncErr")

exports.create = (Model) => {
    return catchAsyncError(async (req, res, next) => {
        const Document = new Model(req.body)
        await Document.save
        res.status(200).json({ message: "sucessful save", result: Document })
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
        const Document = await Model.find({})
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
      res.status(200).json("deleted");
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
        Document && res.status(200).json({ data: Document });
    });
}


