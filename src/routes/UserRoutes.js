const router = require("express").Router()
const userController = require("../controllers/UserController")
// router.get("/users",(req,res)=>{

// })

//loclhost:3000/users
router.get("/users",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)
router.get("/searchuser",userController.searchUser)
module.exports = router