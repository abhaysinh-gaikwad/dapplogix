const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    username: { type: String, required: true },
    likesId: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    commentsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
); 

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = {
    BlogModel,
};