const express = require("express");
const cors = require('cors');

const { BlogModel } = require("../model/blog.model");
const { CommentModel } = require("../model/comment.model");
const { auth } = require("../middleware/auth");
const { uploadImageToCloudinary } = require("../utils/imageuploder");

require("dotenv").config();

const blogRouter = express.Router(); 
blogRouter.use(cors());


blogRouter.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    try {
        const blogs = await BlogModel.find().skip((page - 1) * 10).limit(10).sort({ createdAt: -1 });
        res.status(200).send({ msg: "All blogs", blogs });
    } catch (err) {
        console.log(err);   
        res.status(400).send({ Error: "error occurred while fetching blogs" });
    }
});

blogRouter.get("/myblogs", auth, async (req, res) => {
    const userId = req.user._id; 
    try {
        const blogs = await BlogModel.find({ userId: userId }); 
        if (blogs.length > 0) {
            res.status(200).send({ msg: "Blogs fetched", blogs }); 
        } else {
            res.status(404).send({ msg: "No blogs found for this user" }); 
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ Error: "Error occurred while fetching blogs" }); 
    }
});


blogRouter.post('/', auth, async (req, res) => {
    try {
      const profileImage = req.files?.image;
      if (!profileImage) {
          return res.status(400).send({ Error: 'No image uploaded' });
        }
        
        const image = await uploadImageToCloudinary(
        profileImage.tempFilePath,
        process.env.FOLDER_NAME,
        1000,
        1000
    );
    
    const { title, content } = req.body;
    console.log(profileImage, title, content);
      const userId = req.user._id;
      const username = req.user.username;
      const blog = new BlogModel({ title, content, userId, username, image: image.secure_url });
      await blog.save();
      res.status(201).send({ msg: 'Blog created', blog });
    } catch (err) {
      console.log(err);
      res.status(400).send({ Error: 'Error occurred while creating blog' });
    }
  });



blogRouter.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user._id;
        const blog = await BlogModel.findOne({ _id: id });
        console.log(blog);
        if (blog) { 
            console.log(blog.userId, userId);
            if (blog.userId.toString() === userId.toString()) {
                await BlogModel.findByIdAndUpdate({ _id: id }, { title, content, updatedAt: Date.now() });
                res.status(200).send({ msg: "Blog updated", blog });
            } else {
                res.status(401).send({ msg: "Unauthorized user" });
            }
        } else {    
            res.status(404).send({ msg: "Blog not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ Error: "error occured while updating blog" });
    }
});


blogRouter.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const blog = await BlogModel.findOne({ _id: id });
        if (blog) {
            if (blog.userId.toString() === userId.toString()) {
                const comments = await CommentModel.find({ blogId: id });
                comments.forEach(async (comment) => {
                    await CommentModel.findByIdAndDelete({ _id: comment._id });
                });
                await BlogModel.findByIdAndDelete({ _id: id });
                res.status(200).send({ msg: "Blog deleted" });
            } else {
                res.status(401).send({ msg: "Unauthorized user" });
            }
        } else {
            res.status(404).send({ msg: "Blog not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ Error: "error occured while deleting blog" });
    }
});

blogRouter.patch("/likes/:id", auth ,async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const blog = await BlogModel.findOne({ _id: id });
        if (blog) {
            if (!blog.likesId.includes(userId)) {
                await BlogModel.findByIdAndUpdate({ _id: id }, { $push: { likesId: userId } });
                res.status(200).send({ msg: "Blog liked" });
            } else {
                await BlogModel.findByIdAndUpdate({ _id: id }, { $pull: { likesId: userId } });
                res.status(200).send({ msg: "Blog unliked" });
            } 
        } else { 
            res.status(404).send({ msg: "Blog not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ Error: "error occurred while liking blog" });
    }
});

blogRouter.get("/likes", auth, async (req, res) => {
    const userId = req.user._id;
    try {
        const blogs = await BlogModel.find({ likesId: userId });
        if (blogs.length > 0) {
            res.status(200).send({ msg: "Blogs fetched", blogs });
        } else {
            res.status(404).send({ msg: "No blogs found for this user" });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ Error: "Error occurred while fetching blogs" });
    }
});


module.exports = {
    blogRouter,
}