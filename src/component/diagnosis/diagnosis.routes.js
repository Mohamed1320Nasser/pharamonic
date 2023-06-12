const router = require('express').Router({ mergeParams: true })
const { validation } = require('../../utils/validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const { getDiagnostic, updateDiagnostic, deleteDiagnostic, createDiagnostic } = require('./diagnosis.service')
const { diagnosisSchema, updateDiagnosisSchema } = require('./diagnosis.validation')



router.get('/', protectedRoutes, allowedTo('manger',"doctor","nurse"), getDiagnostic)
router.use(protectedRoutes, allowedTo("doctor"))
router.post('/', validation(diagnosisSchema), createDiagnostic)
router.put('/', validation(updateDiagnosisSchema), updateDiagnostic)
router.delete('/', deleteDiagnostic)

module.exports = router