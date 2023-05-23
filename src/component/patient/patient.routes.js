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

const router = require('express').Router()
router.post('/auth', validation(loginSchema),patientLogin)
router.get('/profile',protectedRoutes(patientModel),allowedTo('patient'), patientProfile)
router.post('/profile/changePass',protectedRoutes(patientModel),allowedTo('patient'),validation(changePassSchema), patientChangePass)
router.use(protectedRoutes(mangerModel),allowedTo('manger'))
router.route('/').post(validation(PatientSchema),createPatientAccount).get(getAllPatientAccounts)
router
    .route('/:id')
    .get(getSpcificPatientAccount)
    .put(validation(UpadtePatientSchema),UpdatePatientAccount)
    .delete(deletePatientAccount)
module.exports = router