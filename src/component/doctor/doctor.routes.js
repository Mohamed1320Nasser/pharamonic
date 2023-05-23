const { validation } = require('../../utils/validation')
const { loginSchema, changePassSchema } = require('../auth/auth.validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const mangerModel = require('../maanger/manger.model')
const doctorModel = require('./doctor.model')
const {
    createDoctorAccount,
    getAllDoctorAccounts,
    getSpcificDoctorAccount,
    UpdateDoctorAccount,
    deleteDoctorAccount,
    loginDoctor,
    changePassDoctor,
    doctorProfile
} = require('./doctor.service')
const { DoctorSchema } = require('./doctor.validation')

const router = require('express').Router()
router.post('/auth', validation(loginSchema), loginDoctor)
router.get('/profile', protectedRoutes(doctorModel), allowedTo('doctor'), doctorProfile)
router.post('/profile/changePass', protectedRoutes(doctorModel), allowedTo('doctor'), validation(changePassSchema), changePassDoctor)

router.use(protectedRoutes(mangerModel), allowedTo('manger'))
router.route('/')
    .post(validation(DoctorSchema), createDoctorAccount)
    .get(getAllDoctorAccounts)
router
    .route('/:id')
    .get(validation(DoctorSchema), getSpcificDoctorAccount)
    .put(UpdateDoctorAccount)
    .delete(deleteDoctorAccount)

module.exports = router