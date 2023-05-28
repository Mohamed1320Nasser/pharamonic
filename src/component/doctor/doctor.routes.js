const { validation } = require('../../utils/validation')
const { loginSchema, changePassSchema } = require('../auth/auth.validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
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
const { DoctorSchema, UpdateDoctorSchema } = require('./doctor.validation')

const router = require('express').Router()
router.post('/auth', validation(loginSchema), loginDoctor)
router.get('/profile', protectedRoutes, allowedTo('doctor'), doctorProfile)
router.post('/profile/changePass', protectedRoutes, allowedTo('doctor'), validation(changePassSchema), changePassDoctor)

router.use(protectedRoutes, allowedTo('manger'))
router.route('/')
    .post(validation(DoctorSchema), createDoctorAccount)
    .get(getAllDoctorAccounts)
router
    .route('/:id')
    .get(getSpcificDoctorAccount)
    .put(validation(UpdateDoctorSchema),UpdateDoctorAccount)
    .delete(deleteDoctorAccount)

module.exports = router