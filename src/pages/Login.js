import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      token
      createdAt
    }
  }
`;

export default function Login(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
      props.history.push("/");
    },
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ variables: values });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div>
      <Row className="bg-white p-5 justify-content-center">
        <Col md={6}>
          <h1 className="text-center my-5">Login</h1>
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
            <div className="text-center">
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? "Loading" : "Login"}
              </Button>
              <br />
              <small className="mt-3">
                Don't have an account <Link to="/register">Signup</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
