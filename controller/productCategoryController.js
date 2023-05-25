const Category = require("../models/prodCategoryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.send({
      message: "Đã thêm category mới thành công.",
      data: newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({
      message: "Đã cập nhật enquiry thành công.",
      data: updatedCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.send({
      message: "Đã xóa enquiry thành công.",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCategoryDetail = await Category.findById(id);
    res.send({
      data: getCategoryDetail,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.send({
      data: getallCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
};