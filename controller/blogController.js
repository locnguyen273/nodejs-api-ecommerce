const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await new Blog(req.body);
    res.send({
      message: "Thêm mới blog thành công.",
      data: newBlog
    });
  } catch (err) {
    throw new Error(err);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send({
      message: "Cập nhật blog thành công.",
      data: updatedBlog
    })
  } catch (err) {
    throw new Error(err);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.status(200).send({
      message: "Đã xóa blog thành công."
    });
  } catch (err) {
    throw new Error(err);
  }
});

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).send({
      data: allBlogs
    });
  } catch (err) {
    throw new Error(err);
  }
});

const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlogDetail = await Blog.findById(id).populate("likes").populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id, { $inc: { numViews: 1 } }, { new: true }
    );
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
