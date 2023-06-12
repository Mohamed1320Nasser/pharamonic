const router = require('express').Router({ mergeParams: true })

const { validation } = require('../../utils/validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const { createAppointment, addNotes, hasDuplicateMedications, getPatientAppointments, getSpcificAppointment, getAppointmentToComplate, complateappointment } = require('./appointment.service')
const { appointmentSchema, addNots } = require('./appointment.validation')

router.post(
    '/',
    protectedRoutes,
    allowedTo("nurse"),
    validation(appointmentSchema),
    hasDuplicateMedications,
    createAppointment
)
router.get(
    '/',
    protectedRoutes,
    allowedTo("doctor", "nurse", "manger"),
    getPatientAppointments
)
router.get(
    '/complated',
    protectedRoutes,
    allowedTo("doctor", "nurse", "manger"),
    getAppointmentToComplate
)
router.put(
    '/:appointmentId',
    protectedRoutes,
    allowedTo("doctor"),
    validation(addNots),
    addNotes
)
router.get(
    '/:appointmentId',
    protectedRoutes,
    allowedTo("doctor", "nurse", "manger"),
    getSpcificAppointment
)
router.get(
    '/complated/:appointmentId',
    protectedRoutes,
    allowedTo("nurse"),
    complateappointment
)
module.exports = router