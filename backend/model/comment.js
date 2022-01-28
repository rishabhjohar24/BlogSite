const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  name: { type: String, require: true },
  comment: { type: String, require: true },
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
