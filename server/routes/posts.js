const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @router [POST] api/posts
// @desc  create post
// access private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  // validate simple
  if (!title) {
    return res.json({
      success: false,
      message: "title is require",
    });
  }
  try {
    const newPost = new Post({
      title,
      description,
      status: status || "TO LEARN",
      url: url.startsWith("https://") ? url : `https://${url}`,
      user: req.userId,
    });
    await newPost.save();
    res.json({
      success: true,
      message: "happy leaning",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal error server",
    });
  }
});

// @router [get] api/posts
// @desc  get post
// access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const post = await Post.find({ user: req.userId }).populate("user", [
      "userName",
    ]);

    res.json({
      success: true,
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal error server",
    });
  }
});

// @router [put] api/posts/:id
// @desc  put post
// access private
router.put("/:id", verifyToken, async (req, res) => {
  const postId = req.params.id;
  // simple validation
  const { title, description, status, url } = req.body;
  if (!title) {
    return res
      .status(401)
      .json({ success: false, message: "title is require" });
  }
  try {
    let updatePost = {
      title,
      description: description || " ",
      status: status || "TO LEARN",
      url: url.startsWith("https://") ? url : `https://${url}` || " ",
    };
    const postUpdateCondition = { _id: postId, user: req.userId };

    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });

    //user not authoriesd to update or post not found
    if (!updatePost) {
      return res.status(403).json({
        success: false,
        message: "user not authoriesd to update or post not found",
      });
    }

    // all good
    res.json({
      success: true,
      message: "updateing successfully",
      post: updatePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal error server",
    });
  }
});
// @router [DELETE] api/posts/:id
// @desc  delete post
// access private

router.delete("/:id", verifyToken, async (req, res) => {
  const postId = req.params.id;
  // delete condition
  try {
    const postDeleteCondition = { _id: postId, user: req.userId };
    const postedDelete = await Post.findOneAndDelete(postDeleteCondition);
    if (!postedDelete) {
      return res.status(403).json({
        success: false,
        message: "user not authoriesd to update or post not found",
      });
    }
    res.json({
      success: true,
      message: "deleted successfully",
      post: postedDelete,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal error server",
    });
  }
});

module.exports = router;
