export const socketFunction = (socket, io) => {
    socket.on("disconnect", () => {
      console.log("User disconnected from socket " + socket.id);
    });
    socket.on("checking", (data) => {
      console.log(data.msg);
    });
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log("Joined room " + room);
      // console.log(socket.rooms) // Room joined successfully
      io.to(room).emit("joinedRoom", { data: Array.from(socket.rooms) });
      console.log("Emitted joinedRoom from server");
    });
}