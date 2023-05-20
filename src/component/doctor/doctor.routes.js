const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const mangerModel = require('../manger/manger.model')
const doctorModel = require('./doctor.model')
const {
    createDoctorAccount,
    getAllDoctorAccounts,
    getSpcificDoctorAccount,
    UpdateDoctorAccount,
    deleteDoctorAccount,
    loginDoctor,
    changePassDoctor
} = require('./doctor.service')


const router = require('express').Router()
router.use(protectedRoutes(mangerModel), allowedTo('manger'))
router.post('/auth', loginDoctor)
router.get('/profile',protectedRoutes(doctorModel), allowedTo('doctor'), doctorProfile)
router.post('/profile/changePass',protectedRoutes(doctorModel), allowedTo('doctor'), changePassDoctor)

router.route('/')
    .post(protectedRoutes(mangerModel), allowedTo('manger'), createDoctorAccount)
    .get(protectedRoutes(mangerModel), allowedTo('manger'), getAllDoctorAccounts)
router
    .route('/:id')
    .post(protectedRoutes(mangerModel), allowedTo('manger'), createDoctorAccount)
    .get(protectedRoutes(mangerModel), allowedTo('manger'), getSpcificDoctorAccount)
    .put(protectedRoutes(mangerModel), allowedTo('manger'), UpdateDoctorAccount)
    .delete(protectedRoutes(mangerModel), allowedTo('manger'), deleteDoctorAccount)

module.exports = router