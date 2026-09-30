const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { Worker } = require("bullmq");
const Redis = require("ioredis");
const mailSend = require("../utils/MailUtils");

const redisConnection = new Redis(
  "redis://default:6tbWZktiC5gQFbTQkeuFPxnrfacdZ2Ti@pencil-milk-pipe-29456.db.redis.io:13643",
  {
    maxRetriesPerRequest: null,
  }
);

const worker = new Worker(
  "taskQueue",
  async (job) => {
    console.log(`Job has been started for ${job.data.name}`);
    console.log(`Email = ${job.data.email}`);
    try {
      const result = await mailSend(job.data.email, "ok", "ok");
      console.log("Mail sent successfully:", result);
    } catch (err) {
      console.error("Error in sending mail inside worker:", err);
      throw err;
    }
  },
  { connection: redisConnection }
);

worker.on("completed", (job) => {
  console.log(`Task done for ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`Task failed for job ${job?.id}:`, err);
});