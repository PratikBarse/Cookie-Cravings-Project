// src/components/SellerProductCrud.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Container, Alert } from 'react-bootstrap';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/api';
import { toast } from 'react-toastify';

const SellerProductCrud = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '', quantity: '', description: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            toast.error("Failed to load products.");
        }
    };

    const handleShowModal = (product = null) => {
        setCurrentProduct(product);
        if (product) {
            setFormData({ 
                name: product.name, 
                price: product.price, 
                quantity: product.quantity, 
                description: product.description 
            });
        } else {
            setFormData({ name: '', price: '', quantity: '', description: '' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct) {
                await updateProduct(currentProduct.id, formData);
                toast.success("Product updated successfully!");
            } else {
                await addProduct(formData);
                toast.success("Product added successfully!");
            }
            fetchProducts();
            handleCloseModal();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                toast.success("Product deleted successfully!");
                fetchProducts();
            } catch (error) {
                toast.error(error.response?.data?.message || "Deletion failed.");
            }
        }
    };

    return (
        <Container fluid>
            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" onClick={() => handleShowModal(null)}>Add New Product</Button>
            </div>
            
            <h4 className="mb-3">Manage Products ({products.length})</h4>
            {products.length === 0 ? (
                 <Alert variant="warning">No products listed.</Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
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
                                <td>
                                    <Button variant="info" size="sm" className="me-2" onClick={() => handleShowModal(product)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Product Add/Edit Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton><Modal.Title>{currentProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Price</Form.Label><Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Quantity</Form.Label><Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required /></Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required /></Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3">{currentProduct ? 'Update Product' : 'Add Product'}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default SellerProductCrud;