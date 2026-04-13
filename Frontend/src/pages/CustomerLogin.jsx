// src/pages/CustomerLogin.js
import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customerLogin } from '../api/api';

const CustomerLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await customerLogin(formData.email, formData.password);
            localStorage.setItem('token', response.data.token);
            toast.success("Customer Login Successful!");
            navigate('/'); 
            window.location.reload(); 
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed. Check email and password.");
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <Card className="shadow-lg">
                        <Card.Header as="h3" className="text-center bg-primary text-white">Customer Login</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required /></Form.Group>
                                <Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required /></Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-3">Login</Button>
                            </Form>
                            <p className="mt-3 text-center">New Customer? <Link to="/signup">Signup here</Link></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default CustomerLogin;