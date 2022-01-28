const mongoose = require("mongoose");
const blogDatabase = require("../model/blog");
const commentDatabase = require("../model/comment");
const userDatabase = require("../model/user");
const jwt = require("jsonwebtoken");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogDatabase.find();
    if (!blogs) {
      return res.status(404).json({
        status: "ERROR",
        message: "No blogs found!",
      });
    } else {
      return res.status(200).json({
        status: "SUCCESS",
        payload: blogs ? blogs : [],
        message: "All blogs has been fetched!",
      });
    }
  } catch (Error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Something went wrong while fetching all blogs!",
    });
  }
};

exports.createBlog = (req, res) => {
  const { name, image, text, id, token } = req.body;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const blog = new blogDatabase({ name, image, text, owner: id });
    blog.save().then(() => {
      userDatabase.findById({ _id: id }).then((result) => {
        console.log(result);
        console.log(result);
        result.blog.push(blog._id);
        result.save().then(() =>
          res.status(200).json({
            status: "SUCCESS",
            id: blog._id,
            message: "Blog has been saved!!",
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

exports.editBlog = async (req, res) => {
  const { id } = req.params;
  const { image, text, token } = req.body;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    blogDatabase.findById(id).then((blogResult) => {
      if (blogResult.owner.toString() === decode._id) {
        blogDatabase.findByIdAndUpdate(
          { _id: id },
          { image: image, text: text },
          (error, updatedBlogResult) => {
            if (error) {
              return error;
            }
            return res.status(200).json({
              status: "SUCCESS",
              payload: updatedBlogResult,
            });
          }
        );
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "ERROR",
      message: "Something is fishy!!",
    });
  }
};

exports.singleBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogDatabase.findById({ _id: id }).populate("comments");
    if (!blog) {
      return res.status(404).json({
        status: "ERROR",
        message: "No blog found!",
      });
    }
    return res.status(200).json({
      status: "SUCCESS",
      payload: blog,
    });
  } catch (err) {
    return res.status(500).json({
      status: "ERROR",
      message: "Something went wrong in getting single blog!",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  const { token } = req.body;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    blogDatabase.findById(id, async (error, result) => {
      if (result.owner.toString() !== decode._id) {
        return res.status(403).json({
          status: "ERROR",
          message: "You're not authorized to delete blog!",
        });
      }
      const data = await result.populate("comments");
      const user = await userDatabase.findById({ _id: result.owner });
      const p = user.blog.filter((item) => item.toString() !== id);
      user.blog = p;
      user.save();
      for (let key in data.comments) {
        commentDatabase.findByIdAndDelete(
          { _id: data.comments[key]._id },
          (error, result) => {
            if (error) {
              return res.status(500).json({
                status: "ERROR",
                message: "INTERNAL ERROR",
              });
            }
          }
        );
      }
    });
    blogDatabase.findByIdAndDelete({ _id: id }, (error, result) => {
      if (result) {
        return res.status(200).json({
          status: "SUCCESS",
          message: `Blog had been deleted successfully!`,
        });
      }
      return res.status(500).json({
        status: "ERROR",
        message: "INTERNAL SERVER ERROR!",
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "ERROR",
      message: "INVALID TOKEN!",
    });
  }
};
