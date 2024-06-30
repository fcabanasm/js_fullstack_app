import express from "express";
import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { connect, closeDatabase } from "../db_handler";
import publicationFactory from "../factories/publicationFactory";
import { PublicationModel } from "../../models/Publication";
import publicationRoutes from "./routes/publicationsRoute.js";

const testPublication = publicationFactory();
const app = express();
publicationRoutes(app);

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("Publication Model", () => {
  it("should create a publication correctly", async () => {
    await PublicationModel.create(testPublication);
    const publications = await PublicationModel.find({});
    expect(publications.length).toBe(1);
  });

  it("should create publication with default softDeleted", async () => {
    const publication = await PublicationModel.findOne({
      objectID: testPublication.objectID,
    });
    expect(publication.softDeleted).toBe(false);
  });

  it("should perform soft delete function correctly", async () => {
    const publication = await PublicationModel.findOne({
      objectID: testPublication.objectID,
    });
    await publication.softDelete();
    expect(publication.softDeleted).toBe(true);
  });
});
