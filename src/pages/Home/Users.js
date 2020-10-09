import React from "react";
import { Image } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import classNames from "classnames";
import { useMessageDispatch, useMessageState } from "../../context/message";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      imageUrl
      createdAt
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
    }
  }
`;

export default function Users() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((user) => user.selected === true)?.username;
  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      dispatch({ type: "SET_USERS", payload: data.getUsers });
    },
  });

  let usersMarkup;

  if (!users || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>No user have joined</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => {
      const selected = selectedUser === user.username;
      return (
        <div
          role="button"
          key={user.username}
          className={classNames(
            "user-div d-flex justify-content-center justify-content-md-start p-3",
            {
              "bg-white": selected,
            }
          )}
          onClick={() =>
            dispatch({ type: "SET_SELECTED_USER", payload: user.username })
          }
        >
          <Image
            src={
              user.imageUrl ||
              "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
            }
            roundedCircle
            className="mr-md-2"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
          <div className="d-none d-md-block">
            <p className="text-success m-0">{user.username}</p>
            <p className="font-weight-light m-0">
              {user.latestMessage
                ? user.latestMessage.content
                : "You are now connected"}
            </p>
          </div>
        </div>
      );
    });
  }

  return <div>{usersMarkup}</div>;
}
