const { createMedicate, getAllMedicate, getSpcificMedicate, UpdateMedicate, deleteMedicate } = require('./medication.service')

const router = require('express').Router()

router.route('/').post(createMedicate).get(getAllMedicate)
router
.route('/:id')
.post(createMedicate)
.get(getSpcificMedicate)
.put(UpdateMedicate)
.delete(deleteMedicate)


module.exports = router