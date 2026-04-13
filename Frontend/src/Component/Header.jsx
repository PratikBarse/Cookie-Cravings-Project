// src/components/Header.jsx - Final Working Logic

import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // useNavigate import karein
import { toast } from 'react-toastify'; 

const Header = () => {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userData, setUserData] = useState({ loggedInUser: null, userName: null, dashboardLink: '/' });

    const checkLoginStatus = () => {
        // 1. Tokens ko Local Storage se check karein
        const adminToken = localStorage.getItem('adminToken');
        const sellerToken = localStorage.getItem('sellerToken');
        const customerToken = localStorage.getItem('token'); 

        let loggedInUser = null;
        let userName = null;
        let dashboardLink = '/';

        // Role aur data determine karein
        if (adminToken) {
            loggedInUser = 'admin';
            userName = localStorage.getItem('adminName') || 'Admin';
            dashboardLink = '/admin/dashboard';
        } else if (sellerToken) {
            loggedInUser = 'seller';
            userName = localStorage.getItem('sellerName') || 'Seller';
            dashboardLink = '/seller/dashboard';
        } else if (customerToken) {
            loggedInUser = 'customer';
            userName = localStorage.getItem('userName') || 'Customer';
            dashboardLink = '/'; 
        }

        setIsUserLoggedIn(!!loggedInUser); // true agar koi token mila
        setUserData({ loggedInUser, userName, dashboardLink });
    };

   
    useEffect(() => {
        checkLoginStatus();
      
        window.addEventListener('storage', checkLoginStatus);
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    
    const handleLogout = () => {
        localStorage.clear(); // Sabhi tokens clear karein
        toast.info("Logged out successfully!");
        
        // State update 
        setIsUserLoggedIn(false);
        setUserData({ loggedInUser: null, userName: null, dashboardLink: '/' });

        navigate('/');
        window.location.reload(); 
    };


    return (
     
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect fixed="top"> 
            <Container>
             
                <Navbar.Brand as={Link} to="/">🍪 Cookie Cravings</Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                       
                        <Nav.Link as={NavLink} to="/products">Shop</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>
                    </Nav>

                    {/* Login/Role Options (Right side) */}
                    <Nav>
                        {isUserLoggedIn ? (
                            // ✅ Logged-in View: Logout aur Dashboard dikhega
                            <NavDropdown title={`Welcome, ${userData.userName}`} id="user-dropdown" align="end">
                                
                                <NavDropdown.Item as={Link} to={userData.dashboardLink}>
                                    {userData.loggedInUser === 'admin' ? 'Admin Panel' : (userData.loggedInUser === 'seller' ? 'Seller Dashboard' : 'Profile')}
                                </NavDropdown.Item>
                                
                                <NavDropdown.Divider />
                                
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            // ❌ Logged-out View: Login/Signup Dropdown
                            <NavDropdown title="Login / Signup" id="auth-dropdown" align="end">
                                {/* Customer Section */}
                                <NavDropdown.Header>Customer Zone</NavDropdown.Header>
                                <NavDropdown.Item as={NavLink} to="/customer/login">Customer Login</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/customer/signup">Customer Signup</NavDropdown.Item>
                                <NavDropdown.Divider />
                                
                                {/* Seller Section */}
                                <NavDropdown.Header>Seller/Vendor</NavDropdown.Header>
                                <NavDropdown.Item as={NavLink} to="/seller/register">Sell With Us (Register)</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/seller/login">Seller Login</NavDropdown.Item>
                                <NavDropdown.Divider />

                                {/* Admin Section */}
                                <NavDropdown.Header>Admin</NavDropdown.Header>
                                <NavDropdown.Item as={NavLink} to="/admin/login">Admin Login</NavDropdown.Item>
                            </NavDropdown>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;