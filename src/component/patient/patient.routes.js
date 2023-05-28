const { validation } = require('../../utils/validation')
const { loginSchema, changePassSchema } = require('../auth/auth.validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const mangerModel = require('../maanger/manger.model')
const patientModel = require('./patient.model')
const {
    createPatientAccount,
    getAllPatientAccounts,
    getSpcificPatientAccount,
    UpdatePatientAccount,
    deletePatientAccount,
    patientLogin,
    patientProfile,
    patientChangePass
} = require('./patient.service')
const { PatientSchema, UpadtePatientSchema } = require('./patient.validation')
const diagnosis = require('../diagnosis/diagnosis.routes')

const router = require('express').Router()

router.use('/:id/diagnosis', diagnosis)
router.post('/auth', validation(loginSchema), patientLogin)
router.get('/profile', protectedRoutes, allowedTo('patient'), patientProfile)
router.post('/profile/changePass', protectedRoutes, allowedTo('patient'), validation(changePassSchema), patientChangePass)
router
    .get('/', protectedRoutes, allowedTo('manger', 'doctor', "nurse"), getAllPatientAccounts)
    .get('/:id', protectedRoutes, allowedTo('manger', 'doctor', "nurse"), getSpcificPatientAccount)
router.use(protectedRoutes, allowedTo('manger'))
router.route('/').post(validation(PatientSchema), createPatientAccount)
router
    .route('/:id')
    .put(validation(UpadtePatientSchema), UpdatePatientAccount)
    .delete(deletePatientAccount)
module.exports = router