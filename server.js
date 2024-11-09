  import { createServer } from "node:http";
  import next from "next";
  import { Server } from "socket.io";
  import { socketFunction } from "./src/socketUtils/socketFunction.js";

  const dev = process.env.NODE_ENV !== "production";
  const hostname = "localhost";
  const port = 3000;
  // when using middleware `hostname` and `port` must be provided below
  const app = next({ dev, hostname, port });
  const handler = app.getRequestHandler();

  app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
      cors: {
        origin: process.env.SITE_URL,
        methods: ["GET", "POST"],
      },
    });

    httpServer
      .once("error", (err) => {
        console.error(err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });


      // defining a socket function
      // socketFunction() = (socket) => {
        // socket.on("disconnect", () => {
        //   console.log("User disconnected from socket " + socket.id);
        // });
        // socket.on("checking", (data) => {
        //   console.log(data.msg);
        // });
        // socket.on("joinRoom", (room) => {
        //   socket.join(room);
        //   console.log("Joined room " + room);
        //   // console.log(socket.rooms) // Room joined successfully
        //   io.to(room).emit("joinedRoom", { data: Array.from(socket.rooms) });
        //   console.log("Emitted joinedRoom from server");
        // });
      // };

    io.on("connection", (socket) => {
      console.log("A user connected to socket " + socket.id);
      socketFunction(socket, io);
    });
  });


