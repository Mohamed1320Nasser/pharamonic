const { validation } = require('../../utils/validation')
const { loginSchema, changePassSchema } = require('../auth/auth.validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const mangerModel = require('../maanger/manger.model')
const nurseModel = require('./nurse.model')
const {
    createNurseAccount,
    getAllNurseAccounts,
    getSpcificNurseAccount,
    UpdateNurseAccount,
    deleteNurseAccount,
    nurseLogin,
    nurseprofile,
    nurseCangePass
} = require('./nurse.service')
const { NurseSchema } = require('./nurse.validation')


const router = require('express').Router()

router.post('/auth',validation(loginSchema), nurseLogin)
router.get('/profile',protectedRoutes(nurseModel),allowedTo('nurse'), nurseprofile)
router.post('/profile/changePass', protectedRoutes(nurseModel),allowedTo('nurse'),validation(changePassSchema),nurseCangePass)

router.use(protectedRoutes(mangerModel),allowedTo('manger'))
router.route('/').post(validation(NurseSchema),createNurseAccount).get(getAllNurseAccounts)
router
    .route('/:id')
    .get(getSpcificNurseAccount)
    .put(validation(NurseSchema),UpdateNurseAccount)
    .delete(deleteNurseAccount)
module.exports = router