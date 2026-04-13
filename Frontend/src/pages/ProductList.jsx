// src/pages/ProductList.jsx (FINAL CODE - Replace this entire file)

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap'; 
// 🎯 FIX 1: getProducts ko badalkar getAllProducts kiya
import { getAllProducts, placeOrder } from '../api/api'; 
import { decodeToken } from '../utils/auth';
import { toast } from 'react-toastify';

import ProductCard from '../components/productCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = decodeToken();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // 🎯 FIX 2: getProducts ko badalkar getAllProducts kiya
            const response = await getAllProducts();
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            toast.error("Error fetching products.");
            setLoading(false);
        }
    };

    const handlePlaceOrder = async (productId) => {
        if (!auth.isAuthenticated || auth.role !== 'customer') {
            toast.warn('Please login as a Customer to place an order.');
            return;
        }
        try {
            await placeOrder(productId);
            toast.success('Order placed successfully! Check My Orders.');
        } catch (error) {
            toast.error(error.response?.data?.message || "Order placement failed.");
        }
    };

    if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

    return (
        <Container className="mt-5"> 
            <h1 className="text-center mb-5 text-warning">🍪 Cookie Cravings Store</h1>
            
            {products.length === 0 && <Alert variant="info">No cookies available right now. Please check back later!</Alert>}
            
            <Row> 
                {products.map(product => (
                    <Col 
                        key={product.id} 
                        sm={12} 
                        md={6} 
                        lg={4} 
                        className="mb-4" 
                    >
                        <ProductCard product={product} onPlaceOrder={handlePlaceOrder} auth={auth} />
                    </Col>
                ))}
            </Row> 
        </Container>
    );
};
export default ProductList;