import { PublicationModel } from "../models/Publication.js";
import { fetchAndInsertPost } from "../services/algoliaService.js";

export default (app) => {
  app.delete("/api/publications/:id", async (req, res) => {
    const publication = await PublicationModel.findById(req.params.id);
    await publication.softDelete();
    res.send(publication);
  });

  app.get("/api/publications", async (req, res) => {
    const publications = await PublicationModel.find({ softDeleted: false });
    res.send(publications);
  });

  app.get("/api/publications/more", async (req, res) => {
    await fetchAndInsertPost();
    const publications = await PublicationModel.find({ softDeleted: false });
    res.send(publications);
  });
};
