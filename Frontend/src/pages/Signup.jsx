// import React, { useState } from "react";
// import { Form, Button, Container, Card } from "react-bootstrap";
// import api from "../api/api";
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("customer");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/register", { name, email, password, role });
//       toast.success("Signup successful!");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error registering user");
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center mt-5">
//       <Card style={{ width: "25rem" }} className="p-4 shadow-lg">
//         <h3 className="text-center mb-4">Signup</h3>
//         <Form onSubmit={handleSignup}>
//           <Form.Group className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Role</Form.Label>
//             <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="customer">Customer</option>
//               <option value="seller">Seller</option>
//             </Form.Select>
//           </Form.Group>
//           <Button variant="success" type="submit" className="w-100">Signup</Button>
//         </Form>
//       </Card>
//       <ToastContainer />
//     </Container>
//   );
// }

// export default Signup;
