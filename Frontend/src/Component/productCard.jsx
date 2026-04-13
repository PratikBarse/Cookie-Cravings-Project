// src/components/ProductCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

// Yeh component ProductList.js mein use hota hai.
// Ismein 'product' object aur 'onPlaceOrder' function props ke roop mein aate hain.
const ProductCard = ({ product, onPlaceOrder, auth }) => {
    return (
        // Card component product details display karne ke liye
        <Card className="shadow-sm h-100">
            
            {/* Optional: Agar aapke paas image ka URL hai, toh yahan daal sakte hain */}
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
                
                {/* Order Button Logic */}
                {auth.isAuthenticated && auth.role === 'customer' ? (
                    // Customer logged in hai toh Place Order button dikhao
                    <Button 
                        variant="success" 
                        onClick={() => onPlaceOrder(product.id)} 
                        disabled={product.quantity <= 0} // Agar quantity 0 hai toh disable kar do
                    >
                        {product.quantity > 0 ? 'Place Order' : 'Out of Stock'}
                    </Button>
                ) : (
                    // Agar logged in nahi hai ya koi aur role hai, toh informative button dikhao
                    <Button variant="outline-success" disabled>
                        {auth.isAuthenticated ? `Logged in as ${auth.role}` : 'Login to Order'}
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductCard;