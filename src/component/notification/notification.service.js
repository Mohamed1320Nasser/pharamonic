const admin = require("./firebase")
const Appointment = require('../appointment/appointment.model')

const { PatientNotification, NurseNotification } = require('./notofocation.model');
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const AppError = require("../../utils/AppError");


const sendNotificationsBulk = async (messages) => {
    try {
      const notifications = messages.map(async (message) => {
        const response = await admin.messaging().send(message);
        const { notification, data } = message;

        // Check if the notification was sent successfully
        if (response) {
          const patientNotificationPromise = data.patient
            ? PatientNotification.create({
                patient: data.patient,
                title: notification.title,
                description: notification.body,
              })
            : Promise.resolve();
  
          const nurseNotificationPromise = data.nurse
            ? NurseNotification.create({
                nurse: data.nurse,
                title: notification.title,
                description: notification.body,
              })
            : Promise.resolve();
  
          await Promise.allSettled([patientNotificationPromise, nurseNotificationPromise]);
        }
      });
      await Promise.allSettled(notifications);
      console.log("sucess sending",response);
    } catch (error) {
        if (error.errorInfo && Array.isArray(error.errorInfo.errors)) {
            for (const err of error.errorInfo.errors) {
                console.error('Error sending notification:', err.error);
            }
        } else {
            console.error('Error sending notifications:', error);
        }
    }
}

exports.scheduleMedicationNotifications = async () => {
  try {
    const appointments = await Appointment.find({ completed: false })
      .populate('patient')
      .populate('nurse')
      .populate('medications.medication');

    const currentTime = new Date();
    const messages = [];

    const processAppointment = async (appointment) => {
      const nextScheduledTime = new Date(appointment.createdAt.getTime() + appointment.schedule * 60 * 60 * 1000);

      if (currentTime > nextScheduledTime) {
        const { patient, nurse, medications } = appointment;

        const nurseNotificationTitle = 'Medication Reminder';
        const medicationNames = medications.map((med) => med.medication.name).join(',');
        const nurseNotificationBody = `Please assist ${patient.name} with their medications: ${medicationNames} `;

        messages.push({
          token: nurse.fcmToken,
          notification: {
            title: nurseNotificationTitle,
            body: nurseNotificationBody,
          },
          data: {
            nurse: nurse._id.toString(),
          },
        });

        const patientNotificationTitle = 'Medication Reminder';
        const patientNotificationBody = `Hi ${patient.name}, it's time to take your medication. Please take the following medications: ${medicationNames} `;

        messages.push({
          token: patient.fcmToken,
          notification: {
            title: patientNotificationTitle,
            body: patientNotificationBody,
          },
          data: {
            patient: patient._id.toString(),
          },
        });
      }
    };

    const processAppointmentPromises = appointments.map(processAppointment);
    await Promise.allSettled(processAppointmentPromises);
    await sendNotificationsBulk(messages);
  } catch (error) {
    console.error('Error scheduling medication notifications:', error);
  }
}

  exports.getPatientNotifications=catchAsyncError(async(req,res,next)=>{
     const PatientId=req.User._id
   const notifications= await PatientNotification.find({patient: PatientId})
   if(!notifications) return next(new AppError("You have no notifications",404))
    res.status(200).json({message:notifications})
  })
  exports.getNurseNotifications=catchAsyncError(async(req,res,next)=>{
    const NurseId=req.User._id
  const notifications= await NurseNotification.find({nurse: NurseId})
  if(!notifications) return next(new AppError("You have no notifications",404))
   res.status(200).json({message:notifications})
 })

 exports.deleteAllPatientNotifications = catchAsyncError(async(req,res,next)=>{
  const PatientId=req.User._id
  await PatientNotification.deleteMany({patient:PatientId})
  res.status(200).json({message:"all Notifications were deleted"})
 })

 exports.deleteAllNurseNotifications = catchAsyncError(async(req,res,next)=>{
  const NurseId=req.User._id
  await NurseNotification.deleteMany({nurse:NurseId})
  res.status(200).json({message:"all Notifications were deleted"})
 })

 exports.deleteOneNurseNotifications = catchAsyncError(async(req,res,next)=>{
  const NurseId=req.User._id
  const {id}=req.params
  await NurseNotification.findOneAndDelete({nurse:NurseId,_id:id})
  res.status(200).json({message:"delete notification successfully"})
 })
 
 exports.deleteOnePatientNotifications = catchAsyncError(async(req,res,next)=>{
  const PatientId=req.User._id
  const {id}=req.params
  await PatientNotification.findOneAndDelete({patient:PatientId,_id:id})
  res.status(200).json({message:"delete notification successfully"})
 })


