const express = require("express") //express module name
//create an object of express
const app = express()




const PORT = 3001
//server creation
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})