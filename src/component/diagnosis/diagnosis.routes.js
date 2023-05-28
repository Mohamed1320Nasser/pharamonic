const { validation } = require('../../utils/validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const { createDiagnostics, getDiagnostics, updateDiagnostics, deleteDiagnostics } = require('./diagnosis.service')
const { diagnosisSchema, updateDiagnosisSchema } = require('./diagnosis.validation')


const router = require('express').Router({ mergeParams: true })

router.get('/', protectedRoutes, allowedTo('manger', "doctor"), getDiagnostics)
router.use(protectedRoutes, allowedTo("doctor"))
router.post('/', validation(diagnosisSchema), createDiagnostics)
router.put('/', validation(updateDiagnosisSchema), updateDiagnostics)
router.delete('/', deleteDiagnostics)

module.exports = router