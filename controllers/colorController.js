const Color = require("../models/colorModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createColor = asyncHandler(async (req, res) => {
  const userId = jwt.decode(req.headers.refreshtoken).id;
  const { colorName, colorValue } = req.body;
  const existedColor = await Color.findOne({ colorName });
  const userExisted = await User.findById(userId);
  try {
    if (!existedColor) {
      let newData = {
        colorName,
        colorValue,
        createdBy: userExisted?.fullName
      }
      const newColor = await Color.create(newData);
      res.send({
        message: "Đã tạo màu mới thành công.",
        data: newColor,
      });
    } else {
      res
        .status(404)
        .send({ message: "Màu đã tồn tại. Vui lòng thử lại !" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({
      message: "Đã cập nhật màu thành công.",
      data: updatedColor,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
    res.send({
      message: "Đã xóa màu thành công.",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getColorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getDetailColor = await Color.findById(id);
    res.send({
      data: getDetailColor,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllColor = asyncHandler(async (req, res) => {
  try {
    const getListColor = await Color.find();
    res.send({
      data: getListColor,
      total: getListColor.length,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColorById,
  getAllColor,
};
