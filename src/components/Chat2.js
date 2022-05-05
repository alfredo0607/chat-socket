/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hook/useLocalHost";
import { useMessage } from "../hook/useMessage";
import "../styleChat1.css";

const data2 = { id: 2, name: "Justin Bieber" };

export default function Chat2() {
  const { item2 } = useLocalStorage("auth2", data2);

  const { socket, chat2, setChat2, read, setRead2 } = useMessage();

  const [messages, setMessages] = useState("");

  console.log(read);
  const handleSendMessage = (e) => {
    e.preventDefault();

    socket.emit("onMessage", {
      message: messages,
      idsend: item2.id,
      idva: 1,
      nameEnv: item2?.name,
    });
    setMessages("");
  };

  useEffect(() => {
    if (socket) {
      socket.emit("onLogin", {
        id: item2?.id,
        name: item2?.name,
      });
      socket.on("message", (data) => {
        console.log(data, "chat 2");
        setChat2([...chat2, data]);
      });
    }
  }, [chat2, socket]);

  useEffect(() => {
    if (messages) {
      setRead2(true);
    }

    if (!messages) {
      setRead2(false);
    }
  }, [messages]);

  return (
    <>
      <div id="container">
        <main>
          <header>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
              alt=""
            />
            <div>
              <h2>{item2?.name}</h2>
              {read && <h3 className="read">Escribiendo...</h3>}
            </div>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png"
              alt=""
            />
          </header>

          <ul id="chat">
            {chat2.map((data) => (
              <>
                <li class={data.idsend === item2.id ? "me" : "you"}>
                  <div class="entete">
                    <span
                      class={
                        data.type === "envia" ? "status green" : "status blue"
                      }
                    ></span>
                    <h2
                      className={
                        data.idsend !== item2.id ? "name-left" : "name-rinth"
                      }
                    >
                      {data.idsend !== item2.id
                        ? `${item2.name} - 10:12AM, Hoy`
                        : "Alfredo Dominguez - 10:12AM, Hoy"}
                    </h2>
                  </div>
                  <div class="triangle"></div>
                  <div class="message">{data.message}</div>
                </li>
              </>
            ))}
          </ul>
          <footer>
            <textarea
              value={messages}
              placeholder="Type your message"
              onChange={(e) => setMessages(e.target.value)}
            ></textarea>

            <button onClick={handleSendMessage}>Enviar</button>
          </footer>
        </main>
      </div>
    </>
  );
}
