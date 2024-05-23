import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });

     io.on("connection", (socket) => {
       // ...
       console.log("A user connected to socket " + socket.id);
      //  socket.broadcast.emit("checking", {data: "Hello"})
       // console.log(socket.id)
    //    socket.on("connect", () => {
    //      console.log("Connect to socket", socket.id);
    //    });
     });
});
