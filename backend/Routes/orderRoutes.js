import express from "express";
import { placeOrder, cancelOrder, getCustomerOrders } from "../controllers/orderController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/place", authenticate, authorizeRoles("customer"), placeOrder);
router.patch("/cancel/:id", authenticate, authorizeRoles("customer"), cancelOrder);
router.get("/my-orders", authenticate, authorizeRoles("customer"), getCustomerOrders);

export default router;