const express=require('express')
const userController=require('../controllers/userController')
const router=express.Router()

const verifyToken=require('../middleware/VerifyToken')
const checkRole=require('../middleware/CheckRole')



router.post('/adduser',userController.signup)
router.post('/login',userController.login)
router.get('/protected',verifyToken,userController.protected)
router.get('/protected',checkRole(['user']),userController.protected)





module.exports=router