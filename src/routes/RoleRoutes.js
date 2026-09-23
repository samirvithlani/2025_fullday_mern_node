const router = require("express").Router()
const roleController = require("../controllers/RoleController")

router.post("/",roleController.createRole)
module.exports = router