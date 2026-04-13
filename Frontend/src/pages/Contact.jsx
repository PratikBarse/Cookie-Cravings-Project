import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast } from "react-toastify";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll contact you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card className="p-4 shadow-lg" style={{ width: "30rem" }}>
        <h3 className="text-center mb-3">Contact Us</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">Send Message</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Contact;
