const router = require("express").Router()
const productController = require("../controllers/ProductController")

router.post("/",productController.createProduct)
router.get("/",productController.getAllProducts)
router.put("/updatestockstatus",productController.updateStockStatus)

module.exports = router
