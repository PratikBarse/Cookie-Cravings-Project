// src/controllers/productController.js (Replace this entire file)

import db from "../config/db.js";

// --- C: Create Product ---
export const addProduct = async(req, res) => {
    // Middleware se Seller ID uthaya (Authentication ke baad)
    const sellerId = req.userId;
    const { name, price, quantity, description } = req.body;

    if (!name || !price || !quantity) {
        return res.status(400).json({ message: "Name, price, and quantity are required." });
    }

    try {
        // seller_id ko database mein daala
        await db.query(
            "INSERT INTO product (seller_id, name, price, quantity, description) VALUES (?, ?, ?, ?, ?)", [sellerId, name, price, quantity, description]
        );
        res.status(201).json({ message: "Product added successfully." });
    } catch (err) {
        console.error("Add Product Error:", err);
        res.status(500).json({ message: "Failed to add product." });
    }
};

// --- R: Read Products for Customer Home Page (Public) ---
export const getAllProducts = async(req, res) => {
    try {
        // TEMPORARY FIX: 'WHERE status = "active"' condition ko hata do.
        // Product load na hone ki samasya theek ho jaani chahiye.
        const [rows] = await db.query("SELECT * FROM product ORDER BY id DESC");
        res.json(rows);
    } catch (err) {
        console.error("Home Page Product Fetch Error:", err);
        res.status(500).json({ message: "Failed to fetch products for home page." });
    }
};
// --- R: Read Seller's Inventory (Protected) ---
export const getSellerProducts = async(req, res) => {
    const sellerId = req.userId;
    try {
        // Sirf is logged-in Seller ke products fetch karein
        const [rows] = await db.query("SELECT * FROM product WHERE seller_id = ?", [sellerId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch seller products." });
    }
};

// --- U: Update Product ---
export const updateProduct = async(req, res) => {
    const { id } = req.params;
    const sellerId = req.userId;
    const { name, price, quantity, description } = req.body;

    try {
        // Security Check: Confirm karein ki product issi Seller ka hai
        const [check] = await db.query("SELECT * FROM product WHERE id = ? AND seller_id = ?", [id, sellerId]);
        if (check.length === 0) {
            return res.status(403).json({ message: "Unauthorized or Product not found." });
        }

        await db.query(
            "UPDATE product SET name=?, price=?, quantity=?, description=? WHERE id=?", [name, price, quantity, description, id]
        );
        res.json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update product." });
    }
};

// --- D: Delete Product ---
export const deleteProduct = async(req, res) => {
    const { id } = req.params;
    const sellerId = req.userId;

    try {
        // Security Check: Confirm karein ki product issi Seller ka hai
        const [check] = await db.query("SELECT * FROM product WHERE id = ? AND seller_id = ?", [id, sellerId]);
        if (check.length === 0) {
            return res.status(403).json({ message: "Unauthorized or Product not found." });
        }

        await db.query("DELETE FROM product WHERE id=?", [id]);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete product." });
    }
};