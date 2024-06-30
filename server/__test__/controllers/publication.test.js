import express from "express";
import { beforeAll, afterAll, describe, expect, it } from "vitest";
import supertest from "supertest";
import {
  connect,
  populateDatabase,
  closeDatabase,
  getFirstPublication,
} from "../db_handler";
import publicationRoutes from "./routes/publicationsRoute.js";

const app = express();
publicationRoutes(app);

beforeAll(async () => await connect());
beforeAll(async () => await populateDatabase(10));
afterAll(async () => await closeDatabase());

describe("Publication Service", () => {
  it("should retrieve publications from API", async () => {
    const response = await supertest(app).get("/api/publications");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(10);
  });

  it("should soft delete a publication via API", async () => {
    const publication = await getFirstPublication();
    const response = await supertest(app).delete(
      `/api/publications/${publication._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body.softDeleted).toBe(true);
  });

  it("should retrieve only not deleted publications from API", async () => {
    const response = await supertest(app).get("/api/publications");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(9);
  });
});
