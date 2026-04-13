// src/components/ProductCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, onPlaceOrder, auth }) => {
    return (
        <Card className="shadow-sm h-100">
            
            <Card.Img 
                variant="top" 
              
                src="https://via.placeholder.com/300x180?text=Cookie" 
                alt={product.name}
            />
            
            <Card.Body>
                <Card.Title className="text-primary">{product.name}</Card.Title>
                <Card.Text>
                    <strong>Price:</strong> ₹{product.price} <br/>
                    <strong>Qty:</strong> {product.quantity} units <br/>
                    <small className="text-muted">{product.description}</small>
                </Card.Text>
                
                {auth.isAuthenticated && auth.role === 'customer' ? (
                    <Button 
                        variant="success" 
                        onClick={() => onPlaceOrder(product.id)} 
                        disabled={product.quantity <= 0} 
                    >
                        {product.quantity > 0 ? 'Place Order' : 'Out of Stock'}
                    </Button>
                ) : (
                    <Button variant="outline-success" disabled>
                        {auth.isAuthenticated ? `Logged in as ${auth.role}` : 'Login to Order'}
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductCard;