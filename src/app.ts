import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import log from "./utils/logger";
import cors from "cors"; // Import CORS middleware
import http from "http";
import { Server } from "socket.io";
import { DocumentType } from "@typegoose/typegoose";
import { User } from "./models/user.model";
dotenv.config();

import userRouter from "./routes/user.router";
import postRouter from "./routes/post.router";
import spotRouter from "./routes/spot.router";
import deserializeUser from "./middlewares/Deserializer";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Explicitly annotate the userQueue to store User document types
export const userQueue: DocumentType<User>[] = [];
const matchedPairs = new Map();

io.on("connection", (socket) => {
  console.log(`A user connected with socket ID: ${socket.id}`);

  // socket.on("findMatch", (data) => {
  //   console.log("Find match request from", socket.id, ":", data);

  //   const match = userQueue.find(
  //     (user) =>
  //       user.preferences.size === data.preferences.size &&
  //       user.preferences.sauce === data.preferences.sauce &&
  //       user.preferences.crust === data.preferences.crust &&
  //       user.preferences.cheese === data.preferences.cheese
  //   );

  //   if (match) {
  //     console.log("Match found:", match.socket.id);
  //     socket.emit("matchFound", match.location);
  //     match.socket.emit("matchFound", data.location);

  //     // Store the matched pair
  //     matchedPairs.set(socket.id, match.socket.id);
  //     matchedPairs.set(match.socket.id, socket.id);

  //     userQueue.splice(userQueue.indexOf(match), 1);
  //   } else {
  //     userQueue.push({
  //       socket,
  //       preferences: data.preferences,
  //       location: data.location,
  //     });
  //   }
  // });

  // socket.on("updateLocation", (location) => {
  //   console.log("Location update from", socket.id, ":", location);

  //   // Find the matched user and send them the location update
  //   const matchedUserId = matchedPairs.get(socket.id);
  //   if (matchedUserId) {
  //     const matchedSocket = io.sockets.sockets.get(matchedUserId);
  //     if (matchedSocket) {
  //       matchedSocket.emit("locationUpdate", location);
  //     }
  //   }
  // });

  // socket.on("disconnect", (reason) => {
  //   console.log("A user disconnected:", socket.id, "Reason:", reason);

  //   // Remove from queue if present
  //   const index = userQueue.findIndex((user) => user.socket.id === socket.id);
  //   if (index !== -1) {
  //     userQueue.splice(index, 1);
  //   }

  //   // Remove from matched pairs if present
  //   const matchedUserId = matchedPairs.get(socket.id);
  //   if (matchedUserId) {
  //     matchedPairs.delete(socket.id);
  //     matchedPairs.delete(matchedUserId);

  //     // Notify the matched user about the disconnection
  //     const matchedSocket = io.sockets.sockets.get(matchedUserId);
  //     if (matchedSocket) {
  //       matchedSocket.emit("matchDisconnected");
  //     }
  //   }
  // });
});
// connectToDb();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  })
);

app.use(express.json());
app.use(deserializeUser);
app.get("/test", (req, res) => {
  res.send("Hello world!");
});

app.use("/v1/auth", userRouter);
app.use("/v1/post", postRouter);
app.use("/v1/eat", spotRouter);

app.use("v1", (req, res) => {
  res.send("Testing nginx");
});

async function connectToDb() {
  const dbUri = process.env.DB_URI as string;

  try {
    await mongoose.connect(dbUri);
    log.info("Connected to DB");
  } catch (e) {
    process.exit(1);
  }
}

server.listen(process.env.PORT, () => {
  console.log(`Server running onprocess.env. port ${process.env.PORT}`);
  connectToDb();
});

server.on("error", (error) => {
  console.error("Server error:", error);
});
