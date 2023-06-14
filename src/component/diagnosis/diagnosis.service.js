const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const PationtModel = require('../patient/patient.model');
const DiagnosisModel = require("./diagnosis.model");

exports.createDiagnostic = catchAsyncError(async (req, res, next) => {
  const { Id } = req.body;

  try {
    const Patient = await PationtModel.findOne({ Id }, 'Id');
    if (!Patient) {
      return next(new AppError('Patient not found', 404));
    }

    const hasDiagnosis = await DiagnosisModel.findOne({ patient: Patient._id });
    if (hasDiagnosis) {
      return next(new AppError('The patient already has a diagnosis', 404));
    }

    req.body = {
      ...req.body,
      doctor: req.User._id,
      patient: Patient._id,
      date: Date.now(),
    };

    await DiagnosisModel.create(req.body);

    res.status(200).json({ message: 'Diagnostic created successfully' });
  } catch (error) {
    next(new AppError(error, 404))
  }
});


exports.getDiagnostic=catchAsyncError(async (req,res,next)=>{
    const diagnostic = await DiagnosisModel.findOne({patient: req.params.patient_id}).populate([{
      path: 'patient',
      select: 'name Id -_id dateOfBirth phone'
  }, {
      path: 'doctor',
      select: 'name Id -_id specialty'
  }])
    if(!diagnostic) return  next(new AppError("diagnostic not found",404))
    res.status(200).json({result:diagnostic})
})
exports.updateDiagnostic=catchAsyncError(async (req,res,next)=>{
    patient=req.params.id
    const {diagnosis,prescription}= req.body
    const diagnostic = await DiagnosisModel.findOne({patient})
    if(!diagnostic) return  next(new AppError("diagnostic not found",404))
      await DiagnosisModel.findOneAndUpdate({patient},{diagnosis,prescription},{new:true})
    res.status(200).json({message:"Updated diagnostic successfully"})
})
exports.deleteDiagnostic=catchAsyncError(async (req,res,next)=>{
    patient=req.params.id
    const diagnostic = await DiagnosisModel.findOne({patient})
    if(!diagnostic) return  next(new AppError("diagnostic not found",404))
      await DiagnosisModel.findOneAndDelete({patient})
    res.status(200).json({message:"Delete diagnostic successfully"})
})
