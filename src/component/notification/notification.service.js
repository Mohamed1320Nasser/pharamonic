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
    const currentTime = new Date();
  
    const appointments = await Appointment.aggregate([
      { $match: { completed: false } },
      { $lookup: { from: 'patients', localField: 'patient', foreignField: '_id', as: 'patient' } },
      { $unwind: '$patient' },
      { $lookup: { from: 'nurses', localField: 'nurse', foreignField: '_id', as: 'nurse' } },
      { $unwind: '$nurse' },
      {
        $lookup: {
          from: 'medications',
          localField: 'medications.medication',
          foreignField: '_id',
          as: 'medications.medication',
        },
      },
      { $unwind: '$medications.medication' },
    ]);
    const messages = [];
    for (const appointment of appointments) {
      const nextScheduledTime = new Date(appointment.createdAt.getTime() + appointment.schedule * 60 * 60 * 1000);
      if (currentTime >= nextScheduledTime) {
        const { patient, nurse, medications } = appointment;
  
        const nurseNotificationTitle = 'Medication Reminder';
        const nurseNotificationBody = `Please assist ${patient.name} with their medication.`;
        messages.push({
          token: nurse.fcmToken,
          notification: {
            title: nurseNotificationTitle,
            body: nurseNotificationBody,
            sound: 'default',
          },
        })
        const patientNotificationTitle = 'Medication Reminder';
        const medicationNames = medications.map((med) => med.medication.name).join(',');
        const patientNotificationBody = `It's time to take your medication. Please take the following medications: ${medicationNames}`;
        messages.push({
          token: patient.fcmToken,
          notification: {
            title: patientNotificationTitle,
            body: patientNotificationBody,
            sound: 'default',
          },
        });
      }
    }
    await sendNotificationsBulk(messages);
  };
  


