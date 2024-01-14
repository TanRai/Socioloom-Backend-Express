const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./routes/auth');
const http = require('http');
const { Server } = require("socket.io");

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
});






app.use(express.json());
app.use('/api/auth', auth);
app.post('/', (req, res) => {
  res.send('Hello World!');
});


server.listen(3000, () => console.log('Server running on port 3000'));