import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import JoinRoomScreen from "./screens/JoinRoomScreen/JoinRoomScreen";
import RoomScreen from "./screens/RoomScreen/RoomScreen";
import IntroScreen from "./screens/IntroScreen/IntroScreen";
import { AnimatePresence } from "framer-motion";

import { connectWithSocketIOServer } from "./utils/wss";

const MyRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/join-room" element={<JoinRoomScreen />} />
        <Route path="/room" element={<RoomScreen />} />
        <Route path="/" element={<IntroScreen />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;
