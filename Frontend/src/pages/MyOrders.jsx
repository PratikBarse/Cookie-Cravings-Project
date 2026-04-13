
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Spinner } from 'react-bootstrap';
import { getCustomerOrders, cancelOrder } from '../api/api';
import { toast } from 'react-toastify';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getCustomerOrders();
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            toast.error("Error fetching orders.");
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId);
            toast.success('Order cancelled successfully!');
            fetchOrders(); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Cancellation failed.");
        }
    };

    if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4 text-primary">🛍️ My Orders</h2>
            {orders.length === 0 ? (
                <Alert variant="info" className="text-center">You have not placed any orders yet.</Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product ID</th>
                            <th>Order Date</th>
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
                                <td><Alert variant={order.status === 'Cancelled' ? 'danger' : 'success'} className="p-1 mb-0 text-center">{order.status}</Alert></td>
                                <td>
                                    {order.status === 'Placed' ? (
                                        <Button variant="danger" size="sm" onClick={() => handleCancelOrder(order.id)}>Cancel</Button>
                                    ) : (
                                        <Button variant="secondary" size="sm" disabled>N/A</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};
export default MyOrders;