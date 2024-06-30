import { connect, connection } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { PublicationModel } from "../models/Publication";
import publicationFactory from "./factories/publicationFactory";

const mongod = await MongoMemoryServer.create();

export async function connect() {
  const uri = mongod.getUri();

  await connect(uri);
}

export async function closeDatabase() {
  await connection.dropDatabase();
  await connection.close();
  await mongod.stop();
}

export async function clearDatabase() {
  const collections = connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

export async function populateDatabase(number = 5) {
  for (let step = 0; step < number; step++) {
    let publication = publicationFactory();
    await PublicationModel.create(publication);
  }
}

export async function getFirstPublication() {
  const publications = await PublicationModel.find({});
  if (publications) return publications[0];
}
