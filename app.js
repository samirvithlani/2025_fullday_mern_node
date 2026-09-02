const express = require("express") //express module name
//create an object of express
const app = express()
require("dotenv").config()
const getDBConnection =  require("./src/utils/DBConnection")
getDBConnection()

//glob middleware
app.use(express.json()) //--> () ==> dont forget





//require

//localhost:3000/user/users
const userRoutes = require("./src/routes/UserRoutes")
app.use("/user",userRoutes)

const categoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category",categoryRoutes)

const productRoutes = require("./src/routes/ProductRoutes")
app.use("/product",productRoutes)


//const PORT = 3000
const PORT = process.env.PORT || 3000
//server creation
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})