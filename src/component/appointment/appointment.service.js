const AppError = require("../../utils/AppError")
const { catchAsyncError } = require("../../utils/catchAsyncErr")
const patientModel = require("../patient/patient.model")
const AppointmentModel = require("./appointment.model")
diagnosesModel = require('../diagnosis/diagnosis.model')
exports.createAppointment = catchAsyncError(async (req, res, next) => {
    req.body.nurse = req.User._id
    const patient = await patientModel.findOne({Id:req.body.Id})
    if(!patient) return next(new AppError("patient not found", 404));
    req.body.patient = patient._id
    const appointment = AppointmentModel(req.body)
    await appointment.save()
    res.status(200).json({ message: "add new appointment to patient success" })
})
exports.addNotes = catchAsyncError(async (req, res, next) => {

    const { appointmentId } = req.params;
    const { doctorNotes } = req.body;

    if (!appointmentId || !doctorNotes) return next(new AppError("Invalid input data", 400));
    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) return next(new AppError("Appointment not found", 404));

    const diagnosis = await diagnosesModel.findOne({ patient: appointment.patient, doctor: req.User._id });
    if (!diagnosis) return next(new AppError("You are not authorized to add notes to this appointment", 403));

    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(appointmentId, { doctorNotes }, { new: true });
    res.status(200).json({ message: "Successfully added notes to the appointment", appointment: updatedAppointment });
});

exports.hasDuplicateMedications =catchAsyncError(async (req,res,next)=>{
    const {medications} =req.body
    const medicationIds = new Set();
    for (const medication of medications) {
      if (medicationIds.has(medication.medication)) {
        return next(new AppError("Duplicate medications"))
      }
      medicationIds.add(medication.medication);
    }
    next()
})

exports.getPatientAppointments = catchAsyncError(async (req, res, next) => {
    const appointments = await AppointmentModel.find({ patient: req.params.patient_id }).populate([{
        path: 'patient',
        select: 'name Id -_id'
    }, {
        path: 'nurse',
        select: 'name Id -_id'
    }, {
        path: 'medications.medication',
        select: 'name -_id'
    }])
    if (!appointments) return next(new AppError("appointments not found", 404))
    res.status(200).json({ result: appointments })
})

exports.getSpcificAppointment = catchAsyncError(async (req, res, next) => {

    const appointment = await AppointmentModel.findById(req.params.appointmentId).populate([{
        path: 'patient',
        select: 'name Id -_id'
    }, {
        path: 'nurse',
        select: 'name Id -_id'
    }, {
        path: 'medications.medication',
        select: 'name -_id'
    }])
    if (!appointment) return next(new AppError(`Appointment with patientId ${req.params.patientId} not found`, 404))
    res.status(200).json({ result: appointment })
})

exports.complateappointment = catchAsyncError(async (req, res, next) => {
    const { appointmentId } = req.params;
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(appointmentId, { completed: true }, { new: true });
    if (!updatedAppointment) return next(new AppError(`No Appointment found for this id: ${req.params.appointmentId}`, 404));
    res.status(200).json({ message: "Successfully completed appointment" });
})
exports.getAppointmentToComplate = catchAsyncError(async (req, res, next) => {
    const currentTime = new Date();
    const tasks = await AppointmentModel.find({ completed: false })
    .populate('patient')
    .populate('nurse')
    .populate('medications.medication');;
    const completedTasks = tasks.filter(task => {
        const thresholdTime = new Date(task.createdAt.getTime() + task.schedule * 60 * 60 * 1000);
        return currentTime > thresholdTime;
    });
    if (completedTasks.length === 0) return res.status(404).json({ message: "No unfinished tasks found" });
    res.status(200).json({ result: completedTasks });
})

