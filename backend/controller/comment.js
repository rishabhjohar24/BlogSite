const mongoose = require("mongoose");
const blogDataBase = require("../model/blog");
const commentDatabase = require("../model/comment");
const jwt = require("jsonwebtoken");

exports.postComment = async (req, res) => {
  const { comment, name, blogId, ownerId, token } = req.body;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userComment = new commentDatabase({
      name: name,
      comment: comment,
      owner: ownerId,
      blogId: blogId,
    });
    userComment.save().then((result) => {
      blogDataBase.findById({ _id: blogId }).then((blog) => {
        blog.comments.push(result._id);
        blog.save().then((result) =>
          res.status(200).json({
            status: "SUCCESS",
            message: "Comment has been posted!",
          })
        );
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "ERROR",
      message: "Invalid Token!",
    });
  }
};

exports.getComment = async (req, res) => {
  const { id } = req.params;
  try {
    commentDatabase.findById({ _id: id }, (error, result) => {
      if (error) {
        res.status(500).json({
          status: "ERROR",
          message: "Something went wrong!",
        });
      }
      return res.status(200).json({
        status: "SUCCESS",
        message: "comment has been fetched!",
        payload: result,
      });
    });
  } catch (err) {
    return res.status(404).json({
      status: "ERROR",
      message: "No such comment exist!",
    });
  }
};

exports.editComment = async (req, res) => {
  const { id } = req.params;
  const { text, token } = req.body;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    commentDatabase.findByIdAndUpdate(
      { _id: id },
      { comment: text },
      (error, result) => {
        if (error) {
          return res.status(500).json({
            status: "ERROR",
            message: "Something went wrong!",
          });
        } else if (result.owner.toString() !== decode._id) {
          console.log(result.owner, " ", decode._id);
          return res.status(403).json({
            status: "ERROR",
            message: "You're not authorized to edit comment!",
          });
        }
        return res.status(200).json({
          status: "SUCCESS",
          message: "Commemt has been updated successfully!",
        });
      }
    );
  } catch (err) {
    return res.status(400).json({
      status: "ERROR",
      message: "Invalid Token!",
    });
  }
};

exports.deleteComment = (req, res) => {
  const { id } = req.params;
  const { token } = req.body;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    commentDatabase.findById({ _id: id }).then(async (result) => {
      console.log(result);
      if (result.owner.toString() !== decode._id) {
        return res.status(403).json({
          status: "ERROR",
          message: "You're not authorized to delete blog!",
        });
      }
      const blogInfo = await blogDataBase.findById({ _id: result.blogId });
      const newBlogCommentsArray = blogInfo.comments.filter(
        (commentId) => commentId.toString() !== id
      );
      blogInfo.comments = newBlogCommentsArray;
      blogInfo.save();
    });
    commentDatabase.findByIdAndDelete({ _id: id }).then(() =>
      res.status(200).json({
        status: "SUCCESS",
        message: "Comment has been deleted successfully!",
      })
    );
  } catch (err) {
    return res.status(400).json({ status: "ERROR", message: "Invalid token!" });
  }
};
