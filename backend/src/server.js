require("dotenv/config");
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
//  const server = require("http").Server(app);
const { Server } = require("socket.io");
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.set("socketio", io);

const users = [];

io.on("connection", (socket) => {
  //   socket.join(`notificaciones ${socket.handshake.query.userID}`);
  console.log("connection", socket.id);

  socket.on("onLogin", async (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x.id === updatedUser.id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
  });

  socket.on("onMessage", async (message) => {
    if (message) {
      const data = await users.find((data) => data.id === message.idva);

      if (data) {
        io.to(data.socketId).emit("message", message);
      }
    }
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

// app.use("/api/v1", appRouter);

httpServer.listen(process.env.APP_PORT || 8080, () => {
  console.log(`Server is running on port: ${process.env.APP_PORT}`);
});
