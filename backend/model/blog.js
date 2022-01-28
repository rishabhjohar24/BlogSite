const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  name: { type: String, require: true },
  image: { type: String, require: true },
  text: { type: String, require: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Blog", blogSchema);
