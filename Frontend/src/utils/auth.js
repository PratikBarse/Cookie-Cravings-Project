// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';

export const decodeToken = () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            // Check if token is expired
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                localStorage.removeItem('token');
                return { isAuthenticated: false, user: null, role: null };
            }

            return {
                isAuthenticated: true,
                user: decoded,
                role: decoded.role
            };
        }
    } catch (error) {
        // Token invalid/expired
        console.error("Token decode error:", error);
    }
    return { isAuthenticated: false, user: null, role: null };
};

export const logout = () => {
    localStorage.removeItem('token');
};