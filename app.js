const express = require("express") //express module name
//create an object of express
const app = express()
const getDBConnection =  require("./src/utils/DBConnection")
getDBConnection()

//glob middleware
app.use(express.json()) //--> () ==> dont forget



//require

//localhost:3000/user/users
const userRoutes = require("./src/routes/UserRoutes")
app.use("/user",userRoutes)

const PORT = 3000
//server creation
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})