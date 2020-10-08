import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useAuthDispatch } from "../context/auth";

export default function Home({ ...props }) {
  const dispatch = useAuthDispatch();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    props.history.push("/login");
  };

  return (
    <Row className="bg-white justify-content-around">
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
  );
}
