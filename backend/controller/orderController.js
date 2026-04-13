import db from "../config/db.js";

export const placeOrder = async(req, res) => {
    const { product_id } = req.body;
    const customerId = req.user.id;
    await db.query("INSERT INTO `order` (customer_id, product_id, order_date, status) VALUES (?, ?, CURDATE(), 'Placed')", [customerId, product_id]);
    res.json({ message: "Order placed" });
};

export const cancelOrder = async(req, res) => {
    const { id } = req.params;
    await db.query("UPDATE `order` SET status='Cancelled' WHERE id=?", [id]);
    res.json({ message: "Order cancelled" });
};

export const getCustomerOrders = async(req, res) => {
    const customerId = req.user.id;
    const [rows] = await db.query("SELECT * FROM `order` WHERE customer_id=?", [customerId]);
    res.json(rows);
};