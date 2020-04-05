const mongoose = require("mongoose");
const { Schema } = mongoose;

let publicationSchema = new Schema({
  title: String,
  author: String,
  url: String,
  story_title: String,
  story_url: String,
  created_at: String,
  objectID: String,
  softDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

publicationSchema.methods.softDelete = async function () {
  this.softDeleted = true;
  await this.save();
  return this;
};

mongoose.model("Publication", publicationSchema);
