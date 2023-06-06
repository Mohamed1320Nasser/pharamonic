const admin = require('firebase-admin');
const Appointment = require('../appointment/appointment.model')
const serviceAccount = require('../../../config/puch_notification_key.json');
const certPath = admin.credential.cert(serviceAccount);

admin.initializeApp({
    credential: admin.credential.cert(certPath),
});
const sendNotificationsBulk = async (messages) => {
    try {
        for (const message of messages) {
          console.log(message);
            const response = await admin.messaging().send(message);
            console.log('Notification sent successfully:', response);
        }
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
    
  const appointments = await Appointment.find({ completed: false })
  .populate('patient')
  .populate('nurse')
  .populate('medications.medication');
    // console.log(appointments);
    const messages = [];
    const currentTime = new Date();
    appointments.forEach((appointment)=>{
      const nextScheduledTime =new Date(appointment.createdAt.getTime() + appointment.schedule * 60 * 60 * 1000);
      if (currentTime > nextScheduledTime) {
        // console.log(appointment);
        const { patient, nurse, medications } = appointment;
        // console.log("appoin",appointment);
        const nurseNotificationTitle = 'Medication Reminder';
        // const medicationNames = medications.map((med) => med.medication.name).join(',');
        const nurseNotificationBody = `Please assist ${patient.name} with their medications: `;
        messages.push({
          token: nurse.fcmToken,
          notification: {
            title: nurseNotificationTitle,
            body: nurseNotificationBody,
          },
        })
        const patientNotificationTitle = 'Medication Reminder';
       
        const patientNotificationBody = `It's time to take your medication. Please take the following medications: `;
        messages.push({
          token: patient.fcmToken,
          notification: {
            title: patientNotificationTitle,
            body: patientNotificationBody,
          },
        });
      }
    })
    await sendNotificationsBulk(messages);
  };
  


