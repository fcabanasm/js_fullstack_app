import { scheduleJob } from "node-schedule";
import { fetchAndInsertPost } from "./algoliaService.js";

scheduleJob("0 * * * *", async () => {
  console.log("scheduleJob is running...");
  fetchAndInsertPost();
});
