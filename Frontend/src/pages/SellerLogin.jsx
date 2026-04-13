// src/pages/SellerLogin.jsx (FINAL CODE - Replace this entire file)

import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sellerLogin } from '../api/api'; 

const SellerLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // sellerLogin function ko formData ke saath call kiya
            const response = await sellerLogin(formData); 
            
            // Backend se aane wala token ya toh 'token' key mein hoga ya 'sellerToken' mein
            const sellerAuthToken = response.data.token || response.data.sellerToken; 
            
            if (sellerAuthToken) {
                // 🎯 FIX 1: Seller token ko 'sellerToken' key mein save kiya
                localStorage.setItem('sellerToken', sellerAuthToken); 
                
                // 🎯 FIX 2: Doosre role ke tokens ko hamesha clear kiya
                localStorage.removeItem('token'); // Customer token clear
                localStorage.removeItem('adminToken'); // Admin token clear
                
                toast.success("Seller Login Successful!");
                navigate('/seller/dashboard'); 
                
                // Zaroori: Location reload se header aur auth context update hoga
                window.location.reload(); 
            } else {
                 toast.error("Login failed: Token not received from server.");
            }

        } catch (err) {
            // Error handling
            toast.error(err.response?.data?.message || "Login failed. Please check your credentials or wait for approval.");
        }
    };
    
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={5}>
                    <Card className="shadow-lg">
                        <Card.Header as="h3" className="text-center bg-success text-white">Seller Login</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                                </Form.Group>
                                <Button variant="success" type="submit" className="w-100 mt-3">Login</Button>
                            </Form>
                            <p className="mt-3 text-center">New Seller? <Link to="/seller/register">Register here</Link></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default SellerLogin;