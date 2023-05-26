const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
  getAllBrand,
} = require("../controller/brandController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getBrandById);
router.get("/", getAllBrand);

module.exports = router;
