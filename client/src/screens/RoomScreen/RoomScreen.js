import React, { useState, useEffect } from "react";
import styles from "./RoomScreen.module.css";
import { useNavigate } from "react-router-dom";
import SidePanel from "../../components/room/sidepanel/SidePanel";
import TitleBar from "../../components/room/title-bar/TitleBar";
import { useSelector } from "react-redux";
import InfoBar from "../../components/room/info-bar/InfoBar";
import RoomBtnPanel from "../../components/buttons/room-btn-panel/RoomBtnPanel";
import { motion, AnimatePresence } from "framer-motion";
import * as webRTCHandler from "../../utils/webRTCHandler";

const RoomScreen = () => {
  const [openSidePanel, setOpenSidePanel] = useState(true);
  const { roomId, isRoomHost, identity } = useSelector((st) => st);
  const navigate = useNavigate();

  const cbzArr = [0.39, 0.32, 0.03, 0.99];

  useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId
    );
    // window.addEventListener("beforeunload", handleUnload);
    // return () => {
    //   window.removeEventListener("beforeunload", handleUnload);
    // };
  }, []);

  // const handleUnload = (e) => {
  //   console.log("adaksxk");
  //   navigate("/", { replace: true });
  // };

  const mainPanelVariants = {
    initial: {
      width: "75vw",
    },
    animate: {
      width: "100vw",
      transition: {
        duration: 0.4,
        ease: [0.17, 0.67, 0.18, 1.03],
      },
    },
  };

  const sideBarVariants = {
    initial: {
      width: "0",
      x: "100vw",
      transition: {
        duration: 0.4,
        ease: cbzArr,
      },
    },
    animate: {
      width: "25vw",
      x: 0,
      transition: {
        duration: 0.4,
        ease: cbzArr,
      },
    },
  };

  return (
    <div className={styles.mainContainer}>
      <motion.div
        variants={mainPanelVariants}
        initial="initial"
        animate={openSidePanel ? "initial" : "animate"}
        className={styles.mainPanelContainer}
      >
        <motion.div
          initial={{ y: "-100vh" }}
          animate={{
            y: 0,
            transition: {
              delay: 0.15,
              duration: 0.4,
              ease: [0.6, 0.01, -0.05, 0.9],
            },
          }}
          className={styles.meetIdContainer}
        >
          <p className={styles.meetId}>
            Meet ID: <b>{roomId ? roomId : " null"}</b>
          </p>
        </motion.div>
        <TitleBar
          openSidePanel={openSidePanel}
          setOpenSidePanel={setOpenSidePanel}
        />
        <InfoBar />
        <div id="videos_container"></div>
        <RoomBtnPanel />
      </motion.div>
      <AnimatePresence>
        {openSidePanel && (
          <motion.div
            variants={sideBarVariants}
            initial="initial"
            animate={openSidePanel ? "animate" : "initial"}
            exit="initial"
            className={styles.sidePanelContainer}
          >
            <SidePanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomScreen;
