// src/pages/InventoryManager.jsx (CREATE THIS NEW FILE)

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
// api functions import kiye
import { getSellerProductsAPI, deleteProduct } from '../api/api'; 
import ProductForm from '../components/ProductForm.jsx'; 

const InventoryManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null); // Null = Add Mode, Object = Edit Mode
    const [sellerName, setSellerName] = useState('Seller'); 

    // Product load karne ka function (R - Read)
    const fetchSellerProducts = async () => {
        setLoading(true);
        try {
            // Seller ke products fetch karein
            const response = await getSellerProductsAPI(); 
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products:", err);
            const errorMessage = err.response?.data?.message || "Failed to load inventory. Check server and seller role.";
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    useEffect(() => {
        setSellerName(localStorage.getItem('sellerName') || 'Seller');
        fetchSellerProducts();
    }, []);

    // Product ko Delete karne ka function (D - Delete)
    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete product: ${name}? This action cannot be undone.`)) return;

        try {
            await deleteProduct(id);
            toast.success(`Product "${name}" deleted successfully.`);
            fetchSellerProducts(); // List refresh karein
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Deletion failed. Check permissions.";
            toast.error(errorMessage);
        }
    };
    
    // Form submit hone par (ProductForm se call hota hai)
    const handleFormSubmit = () => {
        fetchSellerProducts(); // List refresh
        setSelectedProduct(null); // Form ko Add mode par wapas layein
    };

    if (loading) return <Container className="mt-5"><Alert variant="info">Loading Inventory...</Alert></Container>;

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="text-primary">Inventory Management Hub: {sellerName}</h2>
                </Col>
            </Row>
            
            <Row>
                {/* Left Column: Product List (R & D) */}
                <Col md={6}>
                    <Card className="shadow-lg">
                        <Card.Header as="h4" className="bg-light">
                            Inventory List ({products.length})
                        </Card.Header>
                        <Card.Body style={{ maxHeight: '600px', overflowY: 'auto' }}>
                            {products.length === 0 ? (
                                <Alert variant="warning">No products found. Use the form on the right to add your first product!</Alert>
                            ) : (
                                <ListGroup variant="flush">
                                    {products.map(product => (
                                        <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{product.name}</strong> 
                                                <small className="text-muted d-block">₹{product.price} | Stock: {product.quantity}</small>
                                            </div>
                                            <div>
                                                {/* Edit Button (U - Update) */}
                                                <Button 
                                                    variant="warning" 
                                                    size="sm" 
                                                    className="me-2"
                                                    onClick={() => setSelectedProduct(product)}
                                                >
                                                    ✏️ Edit
                                                </Button>
                                                {/* Delete Button (D - Delete) */}
                                                <Button 
                                                    variant="danger" 
                                                    size="sm"
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                >
                                                    🗑️ Delete
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right Column: Add/Update Form (C & U) */}
                <Col md={6}>
                    <Card className="shadow-lg">
                        <Card.Header as="h4" className="bg-primary text-white d-flex justify-content-between align-items-center">
                            {selectedProduct ? '✏️ Edit Product Details' : '➕ Add New Product'}
                            {selectedProduct && (
                                <Button variant="light" size="sm" onClick={() => setSelectedProduct(null)}>
                                    Switch to Add Mode
                                </Button>
                            )}
                        </Card.Header>
                        <Card.Body>
                            <ProductForm 
                                initialData={selectedProduct} 
                                onSubmit={handleFormSubmit}
                                onCancel={() => setSelectedProduct(null)}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default InventoryManager; // 🎯 Yeh 'export default' zaroori hai!