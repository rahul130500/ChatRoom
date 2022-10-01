import React from "react";
import { useNavigate } from "react-router-dom";
import ConnectingBtn from "../../components/buttons/ConnectingBtn";
import styles from "./IntroScreen.module.css";
import { motion } from "framer-motion";

const IntroScreen = () => {
  const navigate = useNavigate();

  const joinMeetHandler = () => {
    navigate("/join-room", { replace: false });
  };
  const hostMeetHandler = () => {
    navigate("/join-room?host=true", { replace: false });
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.mainContainer}
    >
      <motion.div
        initial={{ backgroundColor: "#161c21" }}
        animate={{
          backgroundColor: "#1f272f",
          width: "525px",
          transition: {
            delay: 0.2,
            duration: 0.4,
            ease: [0.6, 0.01, -0.05, 0.9],
          },
        }}
        className={styles.contentPanel}
      >
        <motion.h1
          initial={{ x: "-20vw", textShadow: "2px 2px #fff" }}
          animate={{
            x: 0,
            textShadow: "1px 1px #fff",
            transition: {
              ease: [0.42, 0.37, 0.63, 1.19],
              duration: 0.4,
            },
          }}
          className={styles.logo}
        >
          Baat Chit
        </motion.h1>
        <div className={styles.btnsContainer}>
          <ConnectingBtn
            btnText="Join a meeting"
            clickHandler={joinMeetHandler}
            btnClassName={styles.joinMeetBtn}
            nthChild={1}
          />
          <ConnectingBtn
            isCreateRoom={true}
            btnText="Host a meeting"
            clickHandler={hostMeetHandler}
            btnClassName={styles.hostMeetBtn}
            nthChild={2}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
