// controllers/customerController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

//Customer Signup
export const customerSignup = async(req, res) => {
    const { name, phone, email, password, address } = req.body;
    try {
        // check existing email
        const [rows] = await db.query("SELECT * FROM customer WHERE email = ?", [email]);
        if (rows.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert new customer
        await db.query(
            "INSERT INTO customer (name, phone, email, password, address) VALUES (?, ?, ?, ?, ?)", [name, phone, email, hashedPassword, address]
        );

        // generate JWT
        const token = jwt.sign({ email, role: "customer" }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "Customer registered successfully", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error registering customer" });
    }
};

// Customer Login
export const customerLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query("SELECT * FROM customer WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const customer = rows[0];
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: customer.id, role: "customer" }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login error" });
    }
};