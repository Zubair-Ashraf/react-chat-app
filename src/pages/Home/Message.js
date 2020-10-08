import React from "react";
import classNames from "classnames";
import { useAuthState } from "../../context/auth";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";

export default function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.username ? true : false;
  const received = !sent;

  return (
    <div>
      <div className={"d-flex mt-3"}>
        <div
          className={classNames("py-2 px-3 rounded-pill", {
            "bg-primary": sent,
            "bg-secondary": received,
            "ml-auto": sent,
            "mr-auto": received,
          })}
        >
          <p className={classNames("m-0", { "text-white": sent })}>
            {message.content}
          </p>
        </div>
      </div>
      <div
        className={classNames("mb-3 mt-2 px-2 message-time", {
          "text-right": sent,
          "text-left": received,
        })}
      >
        {moment(message.createdAt).format("MMM DD, YYYY h:mm a")}
      </div>
    </div>
  );
}
