// routes/adminRoutes.js

import express from "express";
import { adminSignup, adminLogin } from "../controllers/adminController.js"; // adminSignup ko import kiya
const router = express.Router();

router.post("/signup", adminSignup); // 👈 TEMP signup route add kiya
router.post("/login", adminLogin);

export default router;