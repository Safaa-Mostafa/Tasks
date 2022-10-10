const Task =require("../controllers/Tasks.controller")
const router =require("express").Router()
router.get('/',Task.index)
router.get('/add',Task.add)
router.get('/delete/:id',Task.delete)
router.get('/addLogic',Task.addLogic)
router.get('/addPost',Task.addPost)
router.post('/addPostLogic',Task.addPostLogic)
router.get("/edit/:id",Task.edit)
router.post('/edit/:id',Task.editLogic)
router.get('/single/:id',Task.single)
router.get('/change/:id',Task.change)

module.exports = router

