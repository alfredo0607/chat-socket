/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hook/useLocalHost";
import { useMessage } from "../hook/useMessage";
import "../styleChat1.css";

// const data = [
//   {
//     id: 1,
//     message: "Hola buenas dias, como amaneces mi amor <3.",
//     type: "envia",
//     name: "Alfredo Dominguez",
//   },
//   {
//     id: 2,
//     message:
//       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor",
//     type: "envia",
//     name: "Alfredo Dominguez",
//   },
//   { id: 3, message: "Bien y tu?", type: "recibe", name: "Rosa Gutierrez" },
//   { id: 4, message: "me alegra", type: "envia", name: "Alfredo Dominguez" },
//   { id: 5, message: "que haces?", type: "recibe", name: "Rosa Gutierrez" },
//   { id: 6, message: "Nada bb", type: "envia", name: "Alfredo Dominguez" },
//   { id: 7, message: "bien", type: "recibe", name: "Rosa Gutierrez" },
// ];

const data1 = { id: 1, name: "Alfredo dominguez" };

export default function Chat1() {
  const { socket, chat1, setChat1, setRead, read2 } = useMessage();

  const { item } = useLocalStorage("auth1", data1);

  const [messages, setMessages] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();

    socket.emit("onMessage", {
      message: messages,
      idsend: item.id,
      idva: 2,
      nameEnv: item?.name,
    });
    setMessages("");
  };

  useEffect(() => {
    if (socket) {
      socket.emit("onLogin", {
        id: item?.id,
        name: item?.name,
      });
      socket.on("message", (data) => {
        console.log(data, "chat 1");
        setChat1([...chat1, data]);
      });
    }
  }, [chat1, socket]);

  useEffect(() => {
    if (messages) {
      setRead(true);
    }

    if (!messages) {
      setRead(false);
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
              <h2>{item?.name}</h2>
              {read2 && <h3 className="read">Escribiendo...</h3>}
            </div>
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png"
              alt=""
            />
          </header>

          {/* CHAT */}

          <ul id="chat">
            {chat1.length !== 0 &&
              chat1.map((data) => (
                <>
                  <li
                    class={data.idsend === item.id ? "me" : "you"}
                    key={data.id}
                  >
                    <div class="entete">
                      <span
                        class={
                          data.idsend === item.id
                            ? "status blue"
                            : "status green"
                        }
                      ></span>
                      <h2
                        className={
                          data.idsend !== item.id ? "name-left" : "name-rinth"
                        }
                      >
                        {data.idsend !== item.id
                          ? `${item.name} - 10:12AM, Hoy`
                          : "Justin Bieber - 10:12AM, Hoy"}
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
