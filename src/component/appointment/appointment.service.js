const AppError = require("../../utils/AppError")
const { catchAsyncError } = require("../../utils/catchAsyncErr")
const AppointmentModel = require("./appointment.model")

exports.createAppointment = catchAsyncError(async (req, res, next) => {
    req.body.nurse = req.User._id
    const appointment = AppointmentModel(req.body)
    await appointment.save()
})

exports.addNotes = catchAsyncError(async (req, res, next) => {
    const { appointmentId } = req.params
    const { doctorNotes } = req.body
    const appointment = await AppointmentModel.findByIdAndUpdate(appointmentId, { doctorNotes }, { new: true })
    !appointment && next(
        new AppError(`No appointment for this id ${req.params.appointmentId}`, 404)
    );
    appointment && res.status(200).json({ message: "Sucessful to add Notes to Appointment " });
})

exports.getPatientAppointments = catchAsyncError(async (req, res, next) => {
    const appointments = await AppointmentModel.find({ patient: req.params.patientId }).populate([{
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
    const tasks = await AppointmentModel.find({ completed: false });
    const completedTasks = tasks.filter(task => {
        const thresholdTime = new Date(task.createdAt.getTime() + task.schedule * 60 * 60 * 1000);
        return currentTime > thresholdTime;
    });
    if (completedTasks.length === 0) return res.status(404).json({ message: "No unfinished tasks found" });
    res.status(200).json({ result: completedTasks });
})

