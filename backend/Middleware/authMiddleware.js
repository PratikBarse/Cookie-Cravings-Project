// src/middleware/authMiddleware.js (FINAL CODE - Replace this entire file)

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🎯 FIX 1: req.user ki jagah req.userId aur req.role set kiya.
        // Ye 'req.userId' hi productController mein use hota hai.
        // Hum maante hain ki token mein user ki ID 'id' field mein store hai.
        req.userId = decoded.id;
        req.role = decoded.role;

        // Optional: Agar aapko poora payload chahiye to req.user bhi rakh sakte hain.
        // req.user = decoded; 

        next();
    } catch (error) {
        // Agar token invalid hai ya expire ho gaya hai
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // 🎯 FIX 2: req.user.role ki jagah sirf req.role use kiya
        if (!req.role || !roles.includes(req.role)) {
            // Agar req.role set nahi hua (Authentication fail hua) ya role match nahi hua
            return res.status(403).json({ message: "Access denied or role not authorized" });
        }
        next();
    };
};