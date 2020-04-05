const faker = require("faker");

module.exports = {
  title: faker.name.title(),
  url: faker.internet.url(),
  story_title: faker.name.title(),
  story_url: faker.internet.url(),
  created_at: faker.date.past(),
  objectID: faker.random.number(),
};
