const router = require("express").Router()
const userController = require("../controllers/UserController")
// router.get("/users",(req,res)=>{

// })

//loclhost:3000/users
router.get("/users",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)
router.get("/searchuser",userController.searchUser)
router.delete("/user/:id",userController.deleteUser)

//localhost:3000/user/user
router.post("/user",userController.createUser)
router.put("/user/:id",userController.updateUser)
module.exports = router