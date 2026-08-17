const router = require("express").Router()
const userController = require("../controllers/UserController")
// router.get("/users",(req,res)=>{

// })

//loclhost:3000/users
router.get("/users",userController.getAllUsers)
module.exports = router