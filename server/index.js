import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { mongoURI } from "./config/keys.js";
import publicationRoutes from "./routes/publicationsRoute.js";
import "./services/scheduleService.js";

mongoose.connect(mongoURI).then(() => console.log("Mongo is connected!"));

const app = express();
express.json();
publicationRoutes(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
