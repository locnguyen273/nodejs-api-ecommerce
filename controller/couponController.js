const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.send({
      message: "Đã thêm coupon mới thành công.",
      data: newCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.send({
      data: coupons,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({
      message: "Đã cập nhật coupon thành công.",
      data: updateCoupon,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    res.send({
      message: "Đã xóa coupon thành công.",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getCouponById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getCouponDetail = await Coupon.findById(id);
    res.send({
      data: getCouponDetail,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCouponById,
};
