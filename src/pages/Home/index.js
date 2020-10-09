import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import { useMessageDispatch } from "../../context/message";
import Users from "./Users";
import Messages from "./Messages";
import { useSubscription, gql } from "@apollo/client";

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

export default function Home({ ...props }) {
  const authDispatch = useAuthDispatch();
  const messageDispatch = useMessageDispatch();
  const { user } = useAuthState();
  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE
  );

  React.useEffect(() => {
    if (messageError) console.log(messageError, "messageError");
    if (messageData) {
      const message = messageData.newMessage;
      const otherUser =
        user.username === message.to ? message.from : message.to;
      messageDispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: otherUser,
          message,
        },
      });
    }
  }, [messageError, messageData]);

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
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
