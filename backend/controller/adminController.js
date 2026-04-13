// src/controllers/adminController.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// 🌟 TEMP FUNCTION: Sirf hash generate karne ke liye wapas laya gaya
export const adminSignup = async(req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);

        // Purani galat entry ko delete karein
        await db.query("DELETE FROM admin WHERE email = ?", [email]);

        // Nayi sahi entry daalein
        await db.query("INSERT INTO admin (name, email, phone, password) VALUES (?, ?, ?, ?)", [name, email, phone, hashed]);

        res.json({ message: "Admin created and password is now hashed." });
    } catch (err) {
        console.error("Temp Admin Signup Error:", err);
        res.status(500).json({ message: "Error during temporary admin creation." });
    }
};

// src/controllers/adminController.js (Admin Login function)

export const adminLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query("SELECT * FROM admin WHERE email=?", [email]);
        // ... (rest of login logic)

        if (!rows.length) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const valid = await bcrypt.compare(password, rows[0].password);

        if (!valid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Token creation: This part is CORRECT: { id: rows[0].id, role: "admin" }
        const token = jwt.sign({ id: rows[0].id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // 🎯 FIX: 'token' key ko badalkar 'adminToken' kiya
        res.json({
            message: "Login successful",
            adminToken: token, // ⬅️ Frontend is key ko expect karta hai
            adminName: rows[0].name
        });

    } catch (err) {
        console.error("Admin Login Error:", err);
        res.status(500).json({ message: "Internal server error during login." });
    }
};