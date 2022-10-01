const { v4: uuidv4 } = require("uuid");

const createNewRoomHandler = (data, socket, connectedUsers, rooms) => {
  console.log(`Host is creating new room`, data);
  const { identity } = data;
  const roomId = uuidv4();

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
  };

  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  };

  connectedUsers = [...connectedUsers, newUser];
  rooms = [...rooms, newRoom];

  socket.join(roomId);

  socket.emit("room-id", { roomId });
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });
};

const joinRoomHandler = (data, socket, connectedUsers, rooms) => {
  const { identity, roomId } = data;

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    //onlyAudio,
  };

  // join room as user which just is trying to join room passing room id
  const room = rooms.find((room) => room.id === roomId);
  room.connectedUsers = [...room.connectedUsers, newUser];

  // join socket.io room
  socket.join(roomId);

  // add new user to connected users array
  connectedUsers = [...connectedUsers, newUser];

  // emit to all users which are already in this room to prepare peer connection
  room.connectedUsers.forEach((user) => {
    if (user.socketId !== socket.id) {
      const data = {
        connUserSocketId: socket.id,
      };

      io.to(user.socketId).emit("conn-prepare", data);
    }
  });

  io.to(roomId).emit("room-update", { connectedUsers: room.connectedUsers });
};

module.exports = { createNewRoomHandler, joinRoomHandler };
