const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const CommentModel = mongoose.model("comments", commentSchema);

module.exports = {
    CommentModel,
};