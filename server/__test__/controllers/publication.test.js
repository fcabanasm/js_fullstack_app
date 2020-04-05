const express = require("express");
const supertest = require("supertest");
const dbHandler = require("../db_handler");

const app = express();
require("../../routes/publicationsRoute")(app);

beforeAll(async () => await dbHandler.connect());
beforeAll(async () => await dbHandler.populateDatabase(10));
afterAll(async () => await dbHandler.closeDatabase());

describe("Publication Service", () => {
  it("should retrieve publications from API", async (done) => {
    const response = await supertest(app).get("/api/publications");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(10);
    done();
  });

  it("should soft delete a publication via API", async (done) => {
    const publication = await dbHandler.getFirstPublication();
    const response = await supertest(app).delete(
      `/api/publications/${publication._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.softDeleted).toBe(true);
    done();
  });

  it("should retrieve only not deleted publications from API", async (done) => {
    const response = await supertest(app).get("/api/publications");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(9);
    done();
  });
});
