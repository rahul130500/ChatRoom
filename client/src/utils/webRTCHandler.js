import * as wss from "./wss";
import store from "../redux/store";
import { setShowOverlay } from "../redux/actions";
import Peer from "simple-peer";

const defaultConstraints = {
  audio: true,
  video: {
    width: "480",
    height: "360",
  },
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null
) => {
  //await fetchTURNCredentials();

  //const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      console.log("successfuly received local stream");
      localStream = stream;
      showLocalVideoPreview(localStream);

      store.dispatch(setShowOverlay(false));

      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId);
    })
    .catch((err) => {
      console.log(
        "error occurred when trying to get an access to local stream",
        err
      );
    });
};

const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById("videos_container");
  videosContainer.classList.add("videos_container_styles");
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;
  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };
  videoContainer.appendChild(videoElement);
  //   if (store.getState().connectOnlyWithAudio) {
  //     videoContainer.appendChild(getAudioOnlyLabel());
  //   }
  videosContainer.appendChild(videoContainer);
};

let peers = {};
let streams = [];

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302", // free STUN server
      },
    ],
  };
};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    // webRTC offer, webRTC Answer (SDP informations), ice candidates

    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};

export const handleSignalingData = (data) => {
  //add signaling data to peer connection
  peers[data.connUserSocketId].signal(data.signal);
};

const addStream = (stream, connUserSocketId) => {
  const videosContainer = document.getElementById("videos_container");
  const videoContainer = document.createElement("div");
  videoContainer.id = connUserSocketId;

  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoElement.addEventListener("click", () => {
    if (videoElement.classList.contains("full_screen")) {
      videoElement.classList.remove("full_screen");
    } else {
      videoElement.classList.add("full_screen");
    }
  });

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};
