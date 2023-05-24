const Category = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

// const createCategory = asyncHandler(async (req, res) => {
//   try {
//     const newCategory = await Category.create(req.body);
//     res.send({
//       message: "Thêm category mới thành công.",
//       data: newCategory,
//     });
//   } catch (err) {
//     throw new Error(err);
//   }
// });
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
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
      message: "Cập nhật category thành công.",
      data: updatedCategory,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(200).send({ message: "Đã xóa category thành công." });
  } catch (err) {
    throw new Error(err);
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCategoryById = await Category.findById(id);
    res.status(200).send({
      message: "Lấy thông tin chi tiết category thành công.",
      data: getCategoryById
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getAllCategory = await Category.find();
    res.status(200).json({
      data: getAllCategory
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategory
};
