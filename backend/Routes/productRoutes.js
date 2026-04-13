// routes/productRoutes.js (Replace this entire file)

import express from "express";
import { addProduct, getSellerProducts, getAllProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 1. Public Route (Customer Home Page)
router.get("/", getAllProducts);

// 2. Seller Protected Routes (Requires 'seller' role)
router.get("/seller", authenticate, authorizeRoles("seller"), getSellerProducts); // NEW: Seller ka Inventory
router.post("/", authenticate, authorizeRoles("seller"), addProduct); // Changed from admin to seller
router.put("/:id", authenticate, authorizeRoles("seller"), updateProduct); // Changed from admin to seller
router.delete("/:id", authenticate, authorizeRoles("seller"), deleteProduct); // Changed from admin to seller

export default router;