const { validation } = require('../../utils/validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const mangerModel = require('../maanger/manger.model')
const {
    createMedicate,
    getAllMedicate,
    getSpcificMedicate,
    UpdateMedicate,
    deleteMedicate
} = require('./medication.service')
const { MedicationSchema, UpdateMedicationSchema } = require('./medication.validation')

const router = require('express').Router()
router.use(protectedRoutes(mangerModel), allowedTo('manger'))
router.route('/').post(validation(MedicationSchema),createMedicate).get(getAllMedicate)
router
    .route('/:id')
    .get(getSpcificMedicate)
    .put(validation(UpdateMedicationSchema),UpdateMedicate)
    .delete(deleteMedicate)


module.exports = router