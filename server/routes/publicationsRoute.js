const mongoose = require("mongoose");
const Publication = mongoose.model("Publication");
const { insertPosts } = require("../service/algoliaService");

module.exports = (app) => {
  app.delete("/api/publications/:id", async (req, res) => {
    const publication = await Publication.findById(req.params.id);
    await publication.softDelete();
    res.send(publication);
  });

  app.get("/api/publications", async (req, res) => {
    const publications = await Publication.find({ softDeleted: false });
    res.send(publications);
  });

  app.get("/api/publications/more", async (req, res) => {
    await insertPosts();
    const publications = await Publication.find({ softDeleted: false });
    res.send(publications);
  });
};
