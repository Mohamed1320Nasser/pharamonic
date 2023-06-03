const { validation } = require('../../utils/validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const { createAppointment } = require('./appointment.service')
const { appointmentSchema } = require('./appointment.validation')


const router = require('express').Router({ mergeParams: true })

router.post('/', protectedRoutes, allowedTo("nurse"), validation(appointmentSchema), createAppointment)

module.exports = router