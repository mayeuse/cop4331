import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import app from "./restApi.ts";
// import { createWebSocketServer } from "path/to/websocket";

const server = createServer();

server.on("request", app);
// createWebSocketServer(server);

// hard-coded port for simplicity until more flexibility needed
server.listen(80, () => {
  console.log(`API v1 (re)started`);
});
