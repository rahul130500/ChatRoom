import React from "react";
import CameraBtn from "./CameraBtn";
import LeaveBtn from "./LeaveBtn";
import MicBtn from "./MicBtn";
import styles from "./RoomBtnPanel.module.css";
import ScreenShareBtn from "./ScreenShareBtn";
import { motion } from "framer-motion";

const RoomBtnPanel = () => {
  return (
    <div className={styles.mainContainer}>
      <motion.div
        initial={{ y: "100vh" }}
        animate={{
          y: 0,
          transition: {
            delay: 0.1,
            duration: 0.4,
            ease: [0.6, 0.01, -0.05, 0.9],
          },
        }}
        className={styles.btnsContainer}
      >
        <MicBtn />
        <CameraBtn />
        <ScreenShareBtn />
        <LeaveBtn />
      </motion.div>
    </div>
  );
};

export default RoomBtnPanel;
