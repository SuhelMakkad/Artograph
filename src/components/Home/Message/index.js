import React, { useEffect, useRef } from "react";
import "./style.css";

const Message = ({ type, msg, setShowMessage }) => {
  const dummy = useRef();

  useEffect(() => {
    document.querySelectorAll(".message").forEach((message, i) => {
      message.closest(".message-container").style.top = `${(i + 1) * 70}px`;
    });

    setTimeout(() => {
      dummy.current && dummy.current.remove();
    }, 3000);
  });
  return (
    <>
      <div
        ref={dummy}
        className={
          type === "error" ? "error-container message-container" : "success-container message-container"
        }>
        <button
          className="message-button"
          onClick={() => {
            setShowMessage(false);
          }}>
          <div className="cancle-message-button"></div>
        </button>
        <div className="message">{msg}</div>
      </div>
    </>
  );
};

export default Message;
