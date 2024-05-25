const express = require("express");
const cors = require('cors');

const { CommentModel } = require("../model/comment.model");
const { BlogModel } = require("../model/blog.model");
const { auth } = require("../middleware/auth");

const commentRouter = express.Router(); 
commentRouter.use(cors());


commentRouter.post("/:id", auth, async (req, res) => {
    try {
        const { comment } = req.body;
        const { id } = req.params;
        const userId = req.user._id;
        const blog = await BlogModel.findOne({ _id: id });

        if (blog) {
            const newComment = new CommentModel({ comment, userId, blogId: blog._id });
            blog.commentsId.push(newComment._id);
            await blog.save();
            await newComment.save();
            res.status(201).send({ msg: "Comment created", comment });
        } else {
            res.status(404).send({ msg: "Blog not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ Error: "error occurred while creating comment" });
    }
});

commentRouter.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const userId = req.user._id;
        const commentId = req.params.id;
        const commentData = await CommentModel.findOne({ _id: commentId });
        if (commentData) {
            if (commentData.userId.toString() === userId.toString()) {
                await CommentModel.findByIdAndUpdate({ _id: commentId }, { comment, updatedAt: Date.now() });
                res.status(200).send({ msg: "Comment updated" });
            } else {
                res.status(401).send({ msg: "Unauthorized user" });
            }
        } else {
            res.status(404).send({ msg: "Comment not found" }); 
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ Error: "error occured while updating comment" });
    }
});

commentRouter.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const commentId = req.params.id;
        const commentData = await CommentModel.findOne({ _id: commentId });
        if (commentData) {
            if (commentData.userId.toString() === userId.toString()) {
                const blog = await BlogModel.findOne({ _id: commentData.blogId });
                blog.commentsId = blog.commentsId.filter((comment) => comment.toString() !== commentId.toString());
                await blog.save();
                await CommentModel.findByIdAndDelete({ _id: commentId });
                res.status(200).send({ msg: "Comment deleted" });
            } else {
                res.status(401).send({ msg: "Unauthorized user" });
            }
        } else {
            res.status(404).send({ msg: "Comment not found" }); 
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ Error: "error occured while deleting comment" });
    }
});


commentRouter.get("/mycomments", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const comments = await CommentModel.find({ userId });
        res.status(200).send({ msg: "Comments fetched", comments });
    } catch (err) {
        console.log(err);
        res.status(400).send({ Error: "error occured while fetching comments" });
    }
});

module.exports = {
    commentRouter,
};
