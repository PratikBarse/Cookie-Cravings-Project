// src/pages/CustomerSignup.js
import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customerSignup } from '../api/api';

const CustomerSignup = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '', address: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await customerSignup(formData);
            localStorage.setItem('token', response.data.token);
            toast.success("Signup Successful! Logged in automatically.");
            navigate('/Login'); 
            window.location.reload(); 
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed.");
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <Card className="shadow-lg">
                        <Card.Header as="h3" className="text-center bg-primary text-white">Customer Signup</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>Phone</Form.Label><Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>Address</Form.Label><Form.Control as="textarea" name="address" value={formData.address} onChange={handleChange} required /></Form.Group>
                                
                                <Button variant="primary" type="submit" className="w-100 mt-3">Signup</Button>
                            </Form>
                            <p className="mt-3 text-center">Already a customer? <Link to="/login">Login here</Link></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default CustomerSignup;