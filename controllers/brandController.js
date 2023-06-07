const Brand = require("../models/brandModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");

const createBrand = asyncHandler(async (req, res) => {
  const userId = jwt.decode(req.cookies?.refreshToken).id;
  const { title } = req.body;
  const existedBrand = await Brand.findOne({ title });
  const userExisted = await User.findById(userId);
  try {
    if (!existedBrand) {
      let newData = {
        title,
        createdBy: userExisted?.fullName
      }
      const newBrand = await Brand.create(newData);
      res.send({
        message: "Đã tạo brand mới thành công.",
        data: newBrand,
      });
    } else {
      res
        .status(404)
        .send({ message: "Brand đã tồn tại. Vui lòng thử lại !" });
    }
  } catch (error) {
    throw new Error(error);
  }
});
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({
      message: "Đã cập nhật brand thành công.",
      data: updatedBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.send({
      message: "Đã xóa brand thành công.",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const getAllBrand = await Brand.find();
    let query = Brand.find(JSON.parse(queryStr));
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const brandCount = await Brand.countDocuments();
      if (skip >= brandCount) throw new Error("Trang này không tồn tại.");
    }
    const getListBrand = await query;
    res.send({ data: getListBrand, total: getAllBrand?.length });

  } catch (error) {
    throw new Error(error);
  }
});
const getBrandById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBrandDetail = await Brand.findById(id);
    res.send({ data: getBrandDetail });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
  getAllBrand,
};
