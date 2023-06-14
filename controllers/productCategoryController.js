const Category = require("../models/prodCategoryModel.js");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");

const createCategory = asyncHandler(async (req, res) => {
  const userId = jwt.decode(req.headers.refreshtoken).id;
  const { name } = req.body;
  const existedCategory = await Category.findOne({ name });
  const userExisted = await User.findById(userId);
  console.log(userExisted);
  try {
    if (!existedCategory) {
      let newData = {
        name,
        createdBy: userExisted?.fullName,
      };
      const newCategory = await Category.create(newData);
      res.send({
        message: "Đã thêm loại sản phẩm mới thành công.",
        data: newCategory,
      });
    } else {
      res.status(404).send({
        message: "Loại sản phẩm đã tồn tại. Vui lòng thử lại !",
      });
    }
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
      message: "Đã cập nhật loại sản phẩm thành công.",
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
      message: "Đã xóa loại sản phẩm thành công.",
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
      total: getallCategory.length,
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
