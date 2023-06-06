const { validation } = require('../../utils/validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const {
    createMedicate,
    getAllMedicate,
    getSpcificMedicate,
    UpdateMedicate,
    deleteMedicate
} = require('./medication.service')
const { MedicationSchema, UpdateMedicationSchema } = require('./medication.validation')

const router = require('express').Router()
router
.get(('/'), protectedRoutes, allowedTo("manger","doctor","nurse"), getAllMedicate)
.get("/:id", protectedRoutes, allowedTo("manger","doctor","nurse"), getSpcificMedicate)

router.use(protectedRoutes, allowedTo('manger'))

router.route('/').post(validation(MedicationSchema), createMedicate)
router
    .route('/:id')
    .put(validation(UpdateMedicationSchema), UpdateMedicate)
    .delete(deleteMedicate)

module.exports = router