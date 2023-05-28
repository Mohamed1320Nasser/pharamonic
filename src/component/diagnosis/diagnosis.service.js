const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const pationtModel = require('../patient/patient.model');
const diagnosisModel = require("./diagnosis.model");
exports.createDiagnostics = catchAsyncError(async (req,res,next)=>{
    const Patient=await pationtModel.findOne({Id:req.body.Id})
    if(!Patient) return next(new AppError("Patient not found",404))
    req.body.doctor=req.User._id
    req.body.patient=Patient._id
    req.body.date = Date.now()
    const diagnosis = diagnosisModel(req.body)
    await diagnosis.save()
    res.status(200).json({message:'Create Diagnostic Successfully'})
})

exports.getDiagnostics=catchAsyncError(async (req,res,next)=>{
    const diagnostic = await diagnosisModel.findOne({patient: req.params.id}).populate([{
      path: 'patient',
      select: 'name Id -_id'
  }, {
      path: 'doctor',
      select: 'name Id -_id'
  }])
    if(!diagnostic) return  next(new AppError("diagnostic not found",404))
    res.status(200).json({result:diagnostic})
})
exports.updateDiagnostics=catchAsyncError(async (req,res,next)=>{
    patient=req.params.id
    const {diagnosis,prescription}= req.body
    const diagnostic = await diagnosisModel.findOne({patient})
    if(!diagnostic) return  next(new AppError("diagnostic not found",404))
      await diagnosisModel.findOneAndUpdate({patient},{diagnosis,prescription},{new:true})
    res.status(200).json({message:"Updated diagnostic successfully"})
})
exports.deleteDiagnostics=catchAsyncError(async (req,res,next)=>{
    patient=req.params.id
    const diagnostic = await diagnosisModel.findOne({patient})
    if(!diagnostic) return  next(new AppError("diagnostic not found",404))
      await diagnosisModel.findOneAndDelete({patient})
    res.status(200).json({message:"Delete diagnostic successfully"})
})
