const router =require("express").Router()
const user =require("../app/controllers/user.controller")
router.post('/register',user.register)
router.get('/all',user.all)
router.get('/all/:id',user.single)
router.delete('/all/:id',user.delete)
// router.patch('/all/:id',user.edit)

module.exports =router