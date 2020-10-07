import React, { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div>
      <Row className="bg-white p-5 justify-content-center">
        <Col md={6}>
          <h1 className="text-center my-5">Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                value={values.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
