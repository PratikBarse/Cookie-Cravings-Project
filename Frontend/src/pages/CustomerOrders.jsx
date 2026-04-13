// src/pages/CustomerOrders.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getCustomerOrders, cancelOrder } from '../api/api';

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await getCustomerOrders(); // GET /api/order/my-orders
            setOrders(response.data);
            setLoading(false);
        } catch (err) {
            toast.error('Orders load nahi ho paaye. Please login again.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancelOrder = async (id) => {
        if (window.confirm('Kya aap sach mein is order ko cancel karna chahte hain?')) {
            try {
                const response = await cancelOrder(id); // PATCH /api/order/cancel/:id
                toast.success(response.data.message || 'Order safaltapoorvak cancel ho gaya.');
                fetchOrders(); // List refresh karein
            } catch (err) {
                toast.error('Order cancel nahi ho paaya.');
            }
        }
    };

    if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">🛒 My Orders</h2>
            <Card className="shadow-sm">
                <Card.Body>
                    {orders.length === 0 ? (
                        <p className="text-info text-center">Aapka koi order nahi hai.</p>
                    ) : (
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product ID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.product_id}</td>
                                        <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`badge ${order.status === 'Cancelled' ? 'bg-danger' : 'bg-success'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            {order.status !== 'Cancelled' && (
                                                <Button 
                                                    variant="outline-danger" 
                                                    size="sm" 
                                                    onClick={() => handleCancelOrder(order.id)}
                                                >
                                                    Cancel Order
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CustomerOrders;