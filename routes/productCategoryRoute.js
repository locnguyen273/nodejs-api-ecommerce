const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
} = require("../controllers/productCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategoryById);
router.get("/", getAllCategory);

module.exports = router;
