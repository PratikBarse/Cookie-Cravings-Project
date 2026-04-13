// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button, Alert, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getPendingSellers, approveSeller } from '../api/api';

const AdminDashboard = () => {
    const [pendingSellers, setPendingSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPendingSellers = async () => {
        setLoading(true);
        setError(null);
        try {
      
            const response = await getPendingSellers();
            setPendingSellers(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching pending sellers:", err);
            setError("Failed to load pending sellers. Check backend connection.");
            setLoading(false);
        }
    };

    useEffect(() => {
       
        fetchPendingSellers();
    }, []);

  
    const handleApprove = async (id, name) => {
        try {
           
            await approveSeller(id);
            
           
            setPendingSellers(pendingSellers.filter(seller => seller.id !== id));
            toast.success(`Seller ${name} approved successfully!`);
        } catch (err) {
            console.error("Error approving seller:", err);
            toast.error("Approval failed. Check permissions.");
        }
    };

    if (loading) return <Container className="mt-5"><Alert variant="info">Loading pending requests...</Alert></Container>;
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container className="mt-5">
            <Card className="shadow-lg">
                <Card.Header as="h2" className="text-center bg-danger text-white">
                    Admin Dashboard (Seller Management)
                </Card.Header>
                <Card.Body>
                    <h5 className="mb-4">Pending Seller Approvals ({pendingSellers.length})</h5>
                    
                    {pendingSellers.length === 0 ? (
                        <Alert variant="success">No pending sellers found. All clear!</Alert>
                    ) : (
                        <ListGroup>
                            {pendingSellers.map(seller => (
                                <ListGroup.Item key={seller.id} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{seller.name}</strong> ({seller.email}) - Phone: {seller.phone}
                                    </div>
                                    <Button 
                                        variant="success" 
                                        size="sm"
                                        onClick={() => handleApprove(seller.id, seller.name)}
                                    >
                                        Approve
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Card.Body>
            </Card>
            <Alert variant="warning" className="mt-4 text-center">
                
            </Alert>
        </Container>
    );
};

export default AdminDashboard;