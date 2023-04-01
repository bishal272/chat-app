const app = require("express")();
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected:${socket.id}`);

  socket.on("message", (data) => {
    socket.broadcast.emit("recieved-message",data);
  });
});

httpServer.listen(3001, () => {
  console.log("Server running on 3001 port");
});
