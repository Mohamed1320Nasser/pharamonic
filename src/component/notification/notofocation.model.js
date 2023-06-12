const { Schema, model, Types } = require("mongoose");

const patientNotificationSchema = new Schema({
  patient: {
    type: Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  title: String,
  description: String,
  date:{
    type:Date,
    default: new Date
  },
});

const nurseNotificationSchema = new Schema({
  nurse: {
    type: Types.ObjectId,
    ref: 'Nurse',
    required: true
  },
  title: String,
  description: String,
  date:{
    type:Date,
    default: new Date
  },
});

const PatientNotification = model('PatientNotification', patientNotificationSchema);
const NurseNotification = model('NurseNotification', nurseNotificationSchema);

module.exports = {
  PatientNotification,
  NurseNotification
};
