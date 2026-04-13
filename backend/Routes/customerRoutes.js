import express from "express";
import { customerSignup, customerLogin } from "../controllers/customerController.js";
const router = express.Router();

router.post("/signup", customerSignup);
router.post("/login", customerLogin);

export default router;