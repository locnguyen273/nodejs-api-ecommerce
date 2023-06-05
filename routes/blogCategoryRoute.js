const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategory
} = require("../controllers/blogCatController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.patch("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategoryById);
router.get("/", getAllCategory);

module.exports = router;
