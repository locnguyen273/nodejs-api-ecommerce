const Enquiry = require("../models/enquiryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.send({
      message: "Đã thêm enquiry mới thành công.",
      data: newEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({
      message: "Đã cập nhật enquiry thành công.",
      data: updatedEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.send({
      message: "Đã xóa enquiry thành công.",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getEnquiryDetail = await Enquiry.findById(id);
    res.send({
      data: getEnquiryDetail,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllEnquiry = asyncHandler(async (req, res) => {
  try {
    const getListEnquiry = await Enquiry.find();
    res.send({
      data: getListEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getAllEnquiry,
  getEnquiryById,
};