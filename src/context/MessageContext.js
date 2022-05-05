import { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export const messageContext = createContext(null);

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://localhost:3005"
    : window.location.host;

const MessageProvider = (props) => {
  const [socket, setSocket] = useState(null);

  const [chat1, setChat1] = useState([]);
  const [chat2, setChat2] = useState([]);
  const [read, setRead] = useState(false);
  const [read2, setRead2] = useState(false);

  const supportHandler = () => {
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };

  useEffect(() => {
    supportHandler();
  }, []);

  return (
    <messageContext.Provider
      value={{
        socket,
        chat1,
        chat2,
        read,
        read2,
        setChat1,
        setChat2,
        supportHandler,
        setRead,
        setRead2,
      }}
    >
      {props.children}
    </messageContext.Provider>
  );
};

export default MessageProvider;
