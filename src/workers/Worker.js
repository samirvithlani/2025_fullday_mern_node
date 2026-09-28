const { Worker } = require("bullmq");
const Redis = require("ioredis");

const redisConnection = new Redis(
  "redis://default:6tbWZktiC5gQFbTQkeuFPxnrfacdZ2Ti@pencil-milk-pipe-29456.db.redis.io:13643",
  {
    maxRetriesPerRequest:null
  }
);
const worker = new Worker(
  "taskQueue",
  async (job) => {
    console.log(`job has been started for ${job.data.name}`);
    console.log(`email = ${job.data.email}`)
    await new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve()
        }, 10000);
    })
    //business logc....
  },
  { connection: redisConnection },
);

worker.on("completed",(job)=>{
    console.log(`task done for ${job.id}`)
})
worker.on("failed",(err)=>{
    console.log(`err`)
})