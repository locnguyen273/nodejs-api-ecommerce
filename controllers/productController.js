const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");
const { cloudinaryUploadImg } = require("../utils/cloudinary");

const createProduct = asyncHandler(async (req, res) => {
  try {
    // const uploader = (path) => cloudinaryUploadImg(path, "images");
    // const urls = [];
    // const urlsClone = [];
    // const files = req.files;
    // for (const file of files) {
    //   const { path } = file;
    //   const newpath = await uploader(path);
    //   urls.push(newpath);
    // }
    // urls.forEach((item) => {
    //   urlsClone.push(item.url);
    // });
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    let product = new Product({
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.quantity,
      images: req.body.images,
      colors: req.body.colors,
    });
    product = await product.save();
    if (!product) return res.status(500).send({
      status: false,
      message: "Sản phẩm không được tạo."
    });

    res.status(201).send({
      status: true,
      message: "Đã thêm sản phẩm mới thành công.",
      data: product,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.status(200).send({
      status: true,
      message: "Đã cập nhật sản phẩm thành công.",
      data: updateProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  validateMongoDbId(id);
  try {
    const deleteProduct = await Product.findOneAndDelete(id);
    res.status(200).send({
      status: true,
      message: "Đã xóa sản phẩm thành công.",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.status(200).send({
      status: true,
      data: findProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const { pageStart, pageSize } = req.query;
    if(!pageStart) pageStart = 1;
    if(!pageSize) pageSize = 10;
    const limit = parseInt(pageSize) || 10;
    const skip = (pageStart - 1) * pageSize;

    const totalProduct = await Product.countDocuments().exec();
    const products = await Product.find().sort("_id").limit(limit).skip(skip).exec();
    const previous_pages = pageStart - 1;
    const next_pages = Math.ceil((totalProduct - skip) / pageSize);

    res.status(200).send({ 
      status: true,
      data: {
        pageStart: pageStart,
        itemPerPage: pageSize,
        products: products,
        next: next_pages,
        previous: previous_pages
      },
    });
  } catch (error) {
    res.status(500).json({ 
      status: false,
      message: "Sorry, something went wrong", 
    });
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        { $pull: { wishlist: prodId } },
        { new: true }
      );
      res.send({ data: user });
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        { $push: { wishlist: prodId } },
        { new: true }
      );
      res.send({ data: user });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        { ratings: { $elemMatch: alreadyRated } },
        { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
        { new: true }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: { ratings: { star: star, comment: comment, postedBy: _id } },
        },
        { new: true }
      );
    }
    const getAllRatings = await Product.findById(prodId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRating: actualRating,
      },
      { new: true }
    );
    res.send({ data: finalProduct });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
};
