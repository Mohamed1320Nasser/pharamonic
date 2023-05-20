const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const mangerModel = require('../manger/manger.model')
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


const router = require('express').Router()
router.post('/auth', patientLogin)
router.get('/profile',protectedRoutes(patientModel),allowedTo('patient'), patientProfile)
router.post('/profile/changePass',protectedRoutes(patientModel),allowedTo('patient'), patientChangePass)
router.use(protectedRoutes(mangerModel),allowedTo('manger'))
router.route('/').post(createPatientAccount).get(getAllPatientAccounts)
router
    .route('/:id')
    .post(createPatientAccount)
    .get(getSpcificPatientAccount)
    .put(UpdatePatientAccount)
    .delete(deletePatientAccount)

module.exports = router