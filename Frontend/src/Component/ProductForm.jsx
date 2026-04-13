// src/components/ProductForm.jsx (CREATE THIS NEW FILE)

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProduct, updateProduct } from '../api/api'; 

const ProductForm = ({ initialData, onSubmit, onCancel }) => {
    // Agar initialData mein ID hai, toh yeh Update mode hai
    const isUpdate = !!initialData?.id; 
    
    // State mein 'quantity' use karein
    const [formData, setFormData] = useState(initialData || {
        name: '',
        description: '',
        price: '',
        quantity: '', // DB field name use kiya
    });

    // Jab initialData badle (Edit mode change ho), tab form state update karein
    useEffect(() => {
        setFormData({ 
            name: initialData?.name || '', 
            description: initialData?.description || '', 
            price: initialData?.price || '', 
            quantity: initialData?.quantity || '', 
        });
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation check mein 'quantity' use karein
        if (!formData.name || !formData.price || !formData.quantity) {
            toast.warn("Product name, price, and quantity are required.");
            return;
        }

        try {
            if (isUpdate) {
                // Update Product (U - Update)
                await updateProduct(initialData.id, formData);
                toast.success(`Product "${formData.name}" updated successfully!`);
            } else {
                // Add New Product (C - Create)
                await addProduct(formData);
                toast.success(`Product "${formData.name}" added successfully!`);
            }
            
            onSubmit(formData, isUpdate);
            
        } catch (err) {
            console.error("Form Submission Error:", err);
            const errorMessage = err.response?.data?.message || `Failed to ${isUpdate ? 'update' : 'add'} product. Check server status.`;
            toast.error(errorMessage);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Price (₹)</Form.Label>
                        <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Stock Quantity</Form.Label>
                        {/* name="quantity" use karein */}
                        <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                    </Form.Group>
                </Col>
            </Row>

            <Button variant={isUpdate ? "warning" : "info"} type="submit" className="w-100 mt-3">
                {isUpdate ? '💾 Save Changes' : '➕ Add Product'}
            </Button>
            
            {isUpdate && (
                <Button variant="secondary" onClick={onCancel} className="w-100 mt-2">
                    ❌ Cancel Edit
                </Button>
            )}
        </Form>
    );
};

export default ProductForm;