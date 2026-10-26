const express = require("express"); //express module name
//create an object of express
const app = express();
// const cors = require("cors")
// app.use(cors())
// const Redis = require("ioredis");
// const {Queue} = require("bullmq")
require("dotenv").config();
const getDBConnection = require("./src/utils/DBConnection");
getDBConnection();
const cron = require('node-cron')

//glob middleware
app.use(express.json()); //--> () ==> dont forget

// const redisConnection = new Redis(
//   "redis://default:6tbWZktiC5gQFbTQkeuFPxnrfacdZ2Ti@pencil-milk-pipe-29456.db.redis.io:13643",
// );

// redisConnection.on("connect",()=>{
//     console.log("redis connected !!")
// })

//const myQueue = new Queue("taskQueue",{connection:redisConnection})

// app.post("/add-task",async(req,res)=>{
//     console.log("adding task to queue...")
//     const name = req.body.name
//     const email = req.body.email
//     await myQueue.add("task",{name,email},{delay:0})
//     res.json({
//         message:"task has been assigend"
//     })
// })


//require

//localhost:3000/user/users
const userRoutes = require("./src/routes/UserRoutes");
app.use("/user", userRoutes);

const categoryRoutes = require("./src/routes/CategoryRoutes");
app.use("/category", categoryRoutes);

const productRoutes = require("./src/routes/ProductRoutes");
app.use("/product", productRoutes);

const roleRoutes = require("./src/routes/RoleRoutes");
app.use("/role", roleRoutes);


cron.schedule("*/30 * * * * *",()=>{

  console.log("every second..")
})


//const PORT = 3000
const PORT = process.env.PORT || 3000;
//server creation
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
