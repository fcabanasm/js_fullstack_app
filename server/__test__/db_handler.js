const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("../models/Publication");

const Publication = mongoose.model("Publication");
const mongod = new MongoMemoryServer();

/**
 * Connect to the mongo-memory database.
 */
module.exports.connect = async () => {
  const uri = await mongod.getConnectionString();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close all connections and stop mongod pid.
 */
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

/**
 * Remove all data for all db collections.
 */
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

/**
 * Populate database with n publications
 */
module.exports.populateDatabase = async (number = 5) => {
  for (let step = 0; step < number; step++) {
    let publication = require("./factories/publicationFactory");
    await Publication.create(publication);
  }
};

/**
 * Send one publication
 */
module.exports.getFirstPublication = async () => {
  const publications = await Publication.find({});
  if (publications) return publications[0];
};
