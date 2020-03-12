import React from "react";
import { Link } from "react-router-dom";

import "./button.css";

const ButtonChat = props => {
  const { url, chats } = props;

  return (
    <>
      <div
        style={{
          width: "50%",
          border: "solid 1px #aab8c2",
          alignSelf: "center",
          borderRadius: "20px",
          padding: "10px",
          color: " #fff",
          margin: " 5px"
        }}
        className="chatButton"
      >
        <Link
          to={{
            pathname: "/chat",
            state: {
              chats: chats.chat
            }
          }}
          style={{ display: " flex", outline: "none" }}
        >
          <div
            className="avatar"
            style={{
              backgroundImage: `url(${url})`,
              width: "100px",
              height: "100px",
              float: "left"
            }}
          />
          {/* <img src={url} style={{ width: "200px" }} /> */}
          <div
            style={{
              flexDirection: "column",
              alignSelf: "center",
              marginLeft: "5%"
            }}
          >
            <div
              style={{
                padding: "15px 0 0 0",
                float: "left",
                width: "220px",
                justifyContent: "center",
                color: "#fff",
                fontSize: "27px",
                marginBottom: "5px"
              }}
            >
              <strong>{chats.nickname}</strong>
            </div>
            <div
              style={{
                fontWeight: "400",
                color: "#aab8c2",
                fontSize: "13px"
              }}
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default ButtonChat;