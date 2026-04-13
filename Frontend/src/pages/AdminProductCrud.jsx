// src/pages/AdminProductCrud.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Modal, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/api';

const AdminProductCrud = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', price: '', quantity: '', description: '' });

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (err) {
            toast.error('Products fetch karne mein error aayi.');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Update Product
                await updateProduct(currentProduct.id, currentProduct); // PUT /api/product/:id
                toast.success('Product safaltapoorvak update ho gaya!');
            } else {
                // Add Product
                await addProduct(currentProduct); // POST /api/product
                toast.success('Naya product safaltapoorvak add ho gaya!');
            }
            setShowModal(false);
            fetchProducts();
        } catch (err) {
            toast.error(err.response?.data?.message || `Error ${isEditing ? 'updating' : 'adding'} product.`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Kya aap sach mein is product ko delete karna chahte hain?')) {
            try {
                await deleteProduct(id); // DELETE /api/product/:id
                toast.success('Product safaltapoorvak delete ho gaya!');
                fetchProducts();
            } catch (err) {
                toast.error('Product delete nahi ho paaya.');
            }
        }
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setShowModal(true);
    };

    const openAddModal = () => {
        setCurrentProduct({ id: null, name: '', price: '', quantity: '', description: '' });
        setIsEditing(false);
        setShowModal(true);
    };

    return (
        <Card className="shadow-sm">
            <Card.Header as="h4" className="d-flex justify-content-between align-items-center bg-info text-white">
                Product Inventory
                <Button variant="light" onClick={openAddModal}>+ Add New Product</Button>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>₹{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.description}</td>
                                <td>
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => openEditModal(product)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>

            {/* Add/Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddOrUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={currentProduct.name} onChange={handleChange} required />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="price" value={currentProduct.price} onChange={handleChange} required min="0.01" step="0.01" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="number" name="quantity" value={currentProduct.quantity} onChange={handleChange} required min="0" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={currentProduct.description} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant={isEditing ? 'warning' : 'primary'} type="submit" className="w-100 mt-3">
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Card>
    );
};

export default AdminProductCrud;