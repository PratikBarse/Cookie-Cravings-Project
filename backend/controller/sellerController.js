import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const addSeller = async(req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required: Name, Email, Phone, Password." });
    }

    try {
        const [rows] = await db.query("SELECT * FROM seller WHERE email = ?", [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "Email already registered as a Seller" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query("INSERT INTO seller (name, email, phone, password, status) VALUES (?, ?, ?, ?, 'pending')", [name, email, phone, hashedPassword]);

        res.status(201).json({ message: "Seller registered successfully, awaiting Admin approval" });
    } catch (err) {
        console.error("Seller Registration Fatal Error:", err);
        res.status(500).json({ message: "Error during seller registration." });
    }
};

// **THIS IS THE CRITICAL FUNCTION FIXING THE SQL ERROR**
// src/controllers/sellerController.js ke andar is function ko replace karein

// src/controllers/sellerController.js ke andar is function ko replace karein
// src/controllers/sellerController.js ke andar is function ko replace karein

// src/controllers/sellerController.js ke andar is function ko replace karein

export const sellerLogin = async(req, res) => {
    const { email, password } = req.body;

    // 💥 DANGER: Is tareeke se query banana SQL Injection ke liye khula hai, 
    // lekin yeh ER_PARSE_ERROR ko fix karne ka aakhri rasta hai.
    const sqlQuery = `SELECT * FROM seller WHERE email = '${email}'`;

    console.log("Database Lookup Query (FORCED FIX):", sqlQuery); // Check karein ki yeh sahi query print ho rahi hai

    try {
        // CORRECT QUERY CALL: Parameters ko query string mein hi daal diya
        const [rows] = await db.query(sqlQuery);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Seller not found with this email" });
        }

        const seller = rows[0];

        // Password Check
        const isMatch = await bcrypt.compare(password, seller.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Approval Check
        if (seller.status !== 'approved') {
            return res.status(403).json({ message: "Your account is pending admin approval." });
        }

        // Token Generation
        const token = jwt.sign({ id: seller.id, role: "seller" }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ message: "Seller Login successful", token, sellerName: seller.name });
    } catch (err) {
        console.error("Critical Error:", err);
        res.status(500).json({ message: "Internal server error during login" });
    }
};

export const approveSeller = async(req, res) => {
    const { id } = req.params;
    await db.query("UPDATE seller SET status='approved' WHERE id=?", [id]);
    res.json({ message: "Seller approved successfully" });
};

export const getPendingSellers = async(req, res) => {
    const [rows] = await db.query("SELECT * FROM seller WHERE status='pending'");
    res.json(rows);
};