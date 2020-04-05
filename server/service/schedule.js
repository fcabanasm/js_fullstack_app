const schedule = require("node-schedule");
const { insertPosts } = require("./algoliaService");

schedule.scheduleJob("0 * * * *", () => {
  insertPosts();
});
