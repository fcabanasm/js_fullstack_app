const mongoose = require("mongoose");
const axios = require("axios");
const _ = require("lodash");
const Publication = mongoose.model("Publication");

const fetchPosts = async () => {
  let response = await axios.get(
    "https://hn.algolia.com/api/v1/search_by_date?query=nodejs"
  );
  return response.data;
};

const insertPosts = async () => {
  let data = await fetchPosts();
  let { hits } = data;
  _.each(hits, async (item) => {
    const entry = await Publication.findOne({ objectID: item.objectID });
    if (!entry) {
      const publication = new Publication(item);
      await publication.save();
    }
  });
};

exports.fetchPosts = fetchPosts;
exports.insertPosts = insertPosts;
