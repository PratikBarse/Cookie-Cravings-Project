// src/pages/AdminLogin.js (FINAL CODE - Replace this entire file)

import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogin } from '../api/api';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await adminLogin(formData.email, formData.password);
            
            // 🎯 FIX 1: Frontend Storage Keys Sahi Kiye
            if (response.data.adminToken) {
                // Admin token ko 'adminToken' key mein save kiya
                localStorage.setItem('adminToken', response.data.adminToken); 
                
                // 🎯 FIX 2: Conflict se bachne ke liye doosre tokens clear kiye
                localStorage.removeItem('token'); // Customer token
                localStorage.removeItem('sellerToken'); // Seller token

                toast.success("Admin Login Successful!");
                navigate('/admin/dashboard'); 
                
                // Page reload karna zaroori hai taki navbar aur auth context update ho sake
                window.location.reload(); 
            } else {
                 toast.error("Login failed: Admin token not received.");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed. Check email and password.");
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <Card className="shadow-lg">
                        <Card.Header as="h3" className="text-center bg-danger text-white">Admin Login</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required /></Form.Group>
                                <Button variant="danger" type="submit" className="w-100 mt-3">Login</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default AdminLogin;