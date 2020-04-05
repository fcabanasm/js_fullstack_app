const express = require("express");
const mongoose = require("mongoose");
const dbHandler = require("../db_handler");
const publicationFactory = require("../factories/publicationFactory");
const Publication = mongoose.model("Publication");
const app = express();
require("../../routes/publicationsRoute")(app);

beforeAll(async () => await dbHandler.connect());
afterAll(async () => await dbHandler.closeDatabase());

describe("Publication Model", () => {
  it("should create a publication correctly", async (done) => {
    await Publication.create(publicationFactory);
    const publications = await Publication.find({});
    expect(publications.length).toBe(1);
    done();
  });

  it("should create publication with default softDeleted", async (done) => {
    const publication = await Publication.findOne({
      objectID: publicationFactory.objectID,
    });
    expect(publication.softDeleted).toBe(false);
    done();
  });

  it("should perform soft delete function correctly", async (done) => {
    const publication = await Publication.findOne({
      objectID: publicationFactory.objectID,
    });
    await publication.softDelete();
    expect(publication.softDeleted).toBe(true);
    done();
  });
});
