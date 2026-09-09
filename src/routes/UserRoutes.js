const router = require("express").Router()
const userController = require("../controllers/UserController")
const testMiddleware = require("../middlewares/TestMiddleware")
const zodMiddleware = require("../middlewares/ZodMiddleware")
const userValidationSchema = require("../validationschemas/UserValidationSchema")
const upload = require("../middlewares/UploadMiddleware")

// router.get("/users",(req,res)=>{

// })

//loclhost:3000/users
router.get("/users",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)
router.get("/searchuser",userController.searchUser)
router.delete("/user/:id",userController.deleteUser)

//localhost:3000/user/user
//router.post("/user",testMiddleware,userController.createUser)
//router.post("/user",testMiddleware("MANAGER"),userController.createUser)
//router.post("/user",zodMiddleware(userValidationSchema),userController.createUser)
router.post("/user",upload.single("file"),userController.createUser)
router.put("/user/:id",userController.updateUser)
// router.put("/updatebyage/:age",userController.updateByAge)
module.exports = router