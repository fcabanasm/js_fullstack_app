import axios from "axios";
import { PublicationModel } from "../models/Publication.js";

export const fetchPosts = async () => {
  const response = await axios.get(
    "https://hn.algolia.com/api/v1/search_by_date?query=nodejs"
  );
  return response.data;
};

const createPost = (post) => {
  const publication = new PublicationModel(post);
  return publication.save();
};

export const insertPosts = async (data) => {
  const { hits } = data;
  console.log(`Adding ${hits?.length || 0} posts`);
  if (hits)
    for await (const post of hits) {
      const { objectID } = post;
      const entry = await PublicationModel.findOne({ objectID });
      if (!entry) await createPost(post);
    }
};

export const fetchAndInsertPost = async () => {
  const data = await fetchPosts();
  await insertPosts(data);
};
