const { createManager, getManger } = require('./monger.service')

const router =require('express').Router()


router.post('/',createManager).get('/',getManger)


module.exports=router