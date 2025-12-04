require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const pollRoutes = require("./routes/polls");

const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN || "http://localhost:5175" },
});

// attach io to req in middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5175" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);
  socket.on("disconnect", () => console.log("Socket disconnected", socket.id));
});

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/polling_app")
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connect error", err);
  });
