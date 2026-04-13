// routes/sellerRoutes.js

import express from "express";
import { addSeller, sellerLogin, approveSeller, getPendingSellers } from "../controllers/sellerController.js";
// Assuming you have these middleware files:
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", addSeller);
router.post("/login", sellerLogin);

// 🎯 FIX: Admin routes ko protect kiya jaana chahiye
router.get("/pending", authenticate, authorizeRoles('admin'), getPendingSellers);
router.patch("/approve/:id", authenticate, authorizeRoles('admin'), approveSeller);

export default router;