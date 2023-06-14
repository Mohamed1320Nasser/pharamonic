const { validation } = require('../../utils/validation')
const { loginSchema, changePassSchema } = require('../auth/auth.validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const {
    createNurseAccount,
    getAllNurseAccounts,
    getSpcificNurseAccount,
    UpdateNurseAccount,
    deleteNurseAccount,
    nurseLogin,
    nurseprofile,
    nurseCangePass,
    defaultPasswordforNurse
} = require('./nurse.service')
const { NurseSchema, UpadteNurseSchema } = require('./nurse.validation')


const router = require('express').Router()

router.post('/auth',validation(loginSchema), nurseLogin)
router.get('/profile',protectedRoutes,allowedTo('nurse'), nurseprofile)
router.post('/profile/changePass', protectedRoutes,allowedTo('nurse'),validation(changePassSchema),nurseCangePass)

router.use(protectedRoutes,allowedTo('manger'))
router.route('/').post(validation(NurseSchema),createNurseAccount).get(getAllNurseAccounts)
router
    .route('/:id')
    .get(getSpcificNurseAccount)
    .put(validation(UpadteNurseSchema),UpdateNurseAccount)
    .delete(deleteNurseAccount)
  router.get('/defaultPassword/:id',defaultPasswordforNurse)

module.exports = router