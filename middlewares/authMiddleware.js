const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if(req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers?.authorization.split(" ")[1];
    try {
      if(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (err) {
      throw new Error("Không có quyền truy cập hoặc token hết hạn. Vui lòng đăng nhập lại.")
    }
  } else {
    throw new Error("Không có token trong header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if(adminUser.role !== "admin") {
    throw new Error("Bạn không phải là admin nên không có quyền truy cập.");
  } else {
    next();
  }
});

const verifyToken = (req, res, next) => {
  const token =
    req.body.refreshToken || req.query.refreshToken || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = { authMiddleware, isAdmin, verifyToken };
