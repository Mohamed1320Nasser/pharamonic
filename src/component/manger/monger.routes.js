const { protectedRoutes, allowedTo } = require('../auth/authentcation')
const mangerModel = require('./manger.model')
const {
    createManager,
    getMangerAccunt,
    getAllMangersAccunts,
    updateMangerAccunt,
    deleteMangerAccunt,
    mangerProfile,
    changePassManger,
    mangerLogin
} = require('./monger.service')

const router = require('express').Router()

router.post('/auth', mangerLogin)
router.use(protectedRoutes(mangerModel) , allowedTo('manger'))
router.get('/profile', mangerProfile)
router.post('/profile/changePass', changePassManger)
router.route('/').post(createManager).get(getAllMangersAccunts)
router.route('/:id').get(getMangerAccunt).put(updateMangerAccunt).delete(deleteMangerAccunt)

module.exports = router