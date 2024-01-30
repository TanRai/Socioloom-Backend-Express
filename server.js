const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./routes/auth");
const http = require("http");
const { Server } = require("socket.io");
const posts = require("./routes/posts");
const user = require("./routes/user");
const replies = require("./routes/replies");
const likes = require("./routes/likes");
const people = require("./routes/people");
const follow = require("./routes/follow");
const interests = require("./routes/interests");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/user", user);
app.use("/api/replies", replies);
app.use("/api/likes", likes);
app.use("/api/people", people);
app.use("/api/follow", follow);
app.use("/api/interests", interests);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(3000, () => console.log("Server running on port 3000"));
