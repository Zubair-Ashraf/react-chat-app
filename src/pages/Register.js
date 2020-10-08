import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      createdAt
    }
  }
`;

export default function Register(props) {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [registerUser, { loading, data, error }] = useMutation(REGISTER_USER, {
    update: (_, res) => props.history.push("/login"),
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ variables: values });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Row className="bg-white p-5 justify-content-center">
      <Col md={6}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className={errors.username && "text-danger"}>
              {errors.username ?? "Username"}
            </Form.Label>
            <Form.Control
              name="username"
              type="text"
              className={errors.username && "is-invalid"}
              value={values.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.email && "text-danger"}>
              {errors.email ?? "Email Address"}
            </Form.Label>
            <Form.Control
              name="email"
              type="email"
              className={errors.email && "is-invalid"}
              value={values.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.password && "text-danger"}>
              {errors.password ?? "Password"}
            </Form.Label>
            <Form.Control
              name="password"
              type="password"
              className={errors.password && "is-invalid"}
              value={values.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.confirmPassword && "text-danger"}>
              {errors.confirmPassword ?? "Confirm Password"}
            </Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              className={errors.confirmPassword && "is-invalid"}
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Loading" : "Register"}
            </Button>
            <br />
            <small className="mt-4">
              Already have an account <Link to="/login">Login</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
