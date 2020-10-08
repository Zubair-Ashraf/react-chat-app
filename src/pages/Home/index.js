import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useAuthDispatch } from "../../context/auth";
import Users from "./Users";
import Messages from "./Messages";

export default function Home({ ...props }) {
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  return (
    <Fragment>
      <Row className="bg-white justify-content-around mb-1">
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </Row>
      <Row className="bg-white">
        <Col xs={2} md={4} className="p-0 bg-secondary">
          <Users />
        </Col>
        <Col xs={10} md={8}>
          <Messages />
        </Col>
      </Row>
    </Fragment>
  );
}
