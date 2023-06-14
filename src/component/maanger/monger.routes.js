const { validation } = require('../../utils/validation')
const { loginSchema, changePassSchema } = require('../auth/auth.validation')
const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const { MangerSchema, UpadteMangerSchema } = require('./manger.validation')
const {
    createManager,
    getMangerAccunt,
    getAllMangersAccunts,
    updateMangerAccunt,
    deleteMangerAccunt,
    mangerProfile,
    changePassManger,
    mangerLogin,
    defaultPasswordforManger
} = require('./monger.service')

const router = require('express').Router()

router.post('/auth', validation(loginSchema), mangerLogin)
router.use(protectedRoutes, allowedTo('manger'))
router.get('/profile', mangerProfile)
router.post('/profile/changePass', validation(changePassSchema), changePassManger)
router.route('/').post(validation(MangerSchema), createManager).get(getAllMangersAccunts)
router.route('/:id').get(getMangerAccunt).put(validation(UpadteMangerSchema), updateMangerAccunt).delete(deleteMangerAccunt)
  router.get('/defaultPassword/:id',defaultPasswordforManger)
module.exports = router