import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addSeller } from '../api/api';

const SellerRegister = () => {
    // phone aur password ke saath setup
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addSeller(formData);
            toast.success(response.data.message || "Registration successful! Awaiting Admin approval.");
            
            // FIX 1: navigate ko bhi lowercase mein rakha gaya hai
            navigate('/seller/login'); 
            
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed. Check server connection.";
            toast.error(errorMessage);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <Card className="shadow-lg">
                        <Card.Header as="h3" className="text-center bg-info text-white">Seller Registration</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                                </Form.Group>
                                
                                <Button variant="info" type="submit" className="w-100 mt-3">Register as Seller</Button>
                            </Form>
                            
                            {/* FIX 2: A tag ke 'href' ko lowercase '/seller/login' mein theek kiya gaya hai */}
                            <p className="mt-3 text-center">Already registered? <a href="/seller/login">Login here</a></p>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default SellerRegister;