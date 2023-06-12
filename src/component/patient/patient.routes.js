const router = require('express').Router();
const { validation } = require('../../utils/validation');
const { loginSchema, changePassSchema } = require('../auth/auth.validation');
const diagnosis = require('../diagnosis/diagnosis.routes');
const appointment = require('../appointment/appointment.routes');
const {
  createPatientAccount,
  getAllPatientAccounts,
  getSpcificPatientAccount,
  UpdatePatientAccount,
  deletePatientAccount,
  patientLogin,
  patientProfile,
  patientChangePass,
  patientAppointments,
  patientDiagnosis,
} = require('./patient.service');
const { PatientSchema, UpadtePatientSchema } = require('./patient.validation');
const { protectedRoutes, allowedTo } = require('../auth/authentcation');

router.use('/:patient_id/diagnosis', diagnosis);
router.use('/:patient_id/appointments', appointment);

router.post('/auth', validation(loginSchema), patientLogin);

router.get(
  '/profile',
  protectedRoutes,
  allowedTo('patient'),
  patientProfile
);
router.get(
  '/profile/appointmentes',
  protectedRoutes,
  allowedTo('patient'),
  patientAppointments
);
router.get(
  '/profile/diagnoses',
  protectedRoutes,
  allowedTo('patient'),
  patientDiagnosis
);
router.post(
  '/profile/changePass',
  protectedRoutes,
  allowedTo('patient'),
  validation(changePassSchema),
  patientChangePass
);

router
  .route('/')
  .post(validation(PatientSchema), createPatientAccount)
  .get(
    protectedRoutes,
    allowedTo('manager', 'doctor', 'nurse'),
    getAllPatientAccounts
  );

router
  .route('/:id')
  .get(
    protectedRoutes,
    allowedTo('manager', 'doctor', 'nurse'),
    getSpcificPatientAccount
  )
  .put(validation(UpadtePatientSchema), UpdatePatientAccount)
  .delete(deletePatientAccount);

module.exports = router;
