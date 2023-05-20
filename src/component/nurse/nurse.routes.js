const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const mangerModel = require('../manger/manger.model')
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


const router = require('express').Router()

router.post('/auth', nurseLogin)
router.get('/profile',protectedRoutes(nurseModel),allowedTo('nurse'), nurseprofile)
router.post('/profile/changePass', protectedRoutes(nurseModel),allowedTo('nurse'),nurseCangePass)

router.use(protectedRoutes(mangerModel),allowedTo('manger'))
router.route('/').post(createNurseAccount).get(getAllNurseAccounts)
router
    .route('/:id')
    .post(createNurseAccount)
    .get(getSpcificNurseAccount)
    .put(UpdateNurseAccount)
    .delete(deleteNurseAccount)
module.exports = router