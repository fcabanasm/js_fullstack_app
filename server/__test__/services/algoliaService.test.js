import axios from "axios";
import { PublicationModel } from "../../models/Publication.js";
import { describe, expect, it, vi } from "vitest";
import { fetchPosts, insertPosts } from "../../services/algoliaService.js";

vi.mock("axios");
vi.mock("../../models/Publication.js");
const postsMockResponse = { hits: [{ objectID: 1 }, { objectID: 2 }] };
axios.get.mockResolvedValue({
  data: postsMockResponse,
});
const fetchUrl = "https://hn.algolia.com/api/v1/search_by_date?query=nodejs";

describe("Algolia Service", () => {
  describe("fetchPosts", () => {
    it("should handle fetch post correctly", async () => {
      await fetchPosts();
      expect(axios.get).toHaveBeenCalledWith(fetchUrl);
    });

    it("should handle insert post correctly", async () => {
      const data = await fetchPosts();
      await insertPosts(data);

      expect(PublicationModel.findOne).toHaveBeenCalledWith({
        objectID: 1,
      });
      expect(PublicationModel.findOne).toHaveBeenCalledWith({
        objectID: 2,
      });
      expect(PublicationModel.prototype.save).toBeCalledTimes(2);
    });
  });
});
