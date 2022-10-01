import io from "socket.io-client";
import store from "../redux/store";
import * as webRTCHandler from "./webRTCHandler";
import { setParticipants, setRoomId, setSocketId } from "../redux/actions";

const SERVER = `${window.location.hostname}:5002`;

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER);

  socket.on("connect", () => {
    console.log("successfully connected with socket io server");
    console.log(socket.id);
    //store.dispatch(setSocketId(socket.id));
  });

  socket.on("room-id", ({ roomId }) => {
    store.dispatch(setRoomId(roomId));
  });

  socket.on("room-update", ({ connectedUsers }) => {
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on("conn-prepare", ({ connUserSocketId }) => {
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });
};

export const createNewRoom = (identity, onlyAudio = false) => {
  // emit an event to server that we would like to create new room
  const data = {
    identity,
    //onlyAudio,
  };

  socket.emit("create-new-room", data);
};

export const joinRoom = (identity, roomId, onlyAudio = false) => {
  //emit an event to server that we would to join a room
  const data = {
    roomId,
    identity,
    //onlyAudio,
  };

  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
