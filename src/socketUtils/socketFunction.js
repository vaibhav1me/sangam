export const socketFunction = (socket, io) => {
    socket.on("disconnect", () => {
      console.log("User disconnected from socket " + socket.id);
    });
    // socket.on("checking", (data) => {
    //   console.log(data.msg);
    // });
    socket.on("joinRoom", (room) => {
      socket.join(room.room);
      // console.log("The rooms are", socket.rooms)
      console.log("Joined room ", room.room);
      // console.log(socket.rooms) // Room joined successfully
      io.to(room).emit("joinedRoom", { data: Array.from(socket.rooms) });
      console.log("Emitted joinedRoom from server");
    });
    // socket.on("typing", (data) => {
    //   console.log("typing", data.to, 'from', data.from)
    //   // const room = data;
    //   console.log(data)
    //   io.emit("typing", {from: data.from, to: data.to})
    // })
    socket.on("sendMessage", (data) =>{
      io.to(data.to).emit("receiveMessage", data);
    })
}