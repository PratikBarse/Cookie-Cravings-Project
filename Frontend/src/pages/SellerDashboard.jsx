// src/pages/SellerDashboard.jsx

import React from 'react';
import { Container, Alert, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // 🎯 ADD THIS IMPORT

const SellerDashboard = () => {
    // ...

    return (
        <Container className="mt-5">
            {/* ... baaki JSX ... */}
            
            <Row className="mt-4">
                {/* Add New Product Card */}
                <Col md={6}>
                    <Link to="/seller/inventory" style={{ textDecoration: 'none' }}> {/* 🎯 ADD LINK HERE */}
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <Card.Title>➕ Add New Product</Card.Title>
                                <Card.Text>Yahan aap naye products apni inventory mein jodenge.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>

                {/* Manage Inventory Card */}
                <Col md={6}>
                    <Link to="/seller/inventory" style={{ textDecoration: 'none' }}> {/* 🎯 ADD LINK HERE */}
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <Card.Title>📦 Manage Inventory</Card.Title>
                                <Card.Text>Apne sabhi products ko dekhein, update karein, ya delete karein (CRUD)!</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default SellerDashboard;