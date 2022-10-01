import React, { useEffect, useState } from "react";
import styles from "./JoinRoomScreen.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsRoomHost,
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "../../redux/actions";
import { getRoomExists } from "../../api";
import { motion } from "framer-motion";

const JoinRoomScreen = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRoomHost, connectOnlyWithAudio } = useSelector((st) => st);

  const [name, setName] = useState("");
  const [roomId, setRoomID] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    dispatch(setIsRoomHost(!!searchParams.get("host")));
  }, []);

  const handleAudioOnly = (e) => {
    dispatch(setConnectOnlyWithAudio(e.target.checked));
  };

  const handleJoinRoom = () => {
    dispatch(setIdentity(name));
    if (isRoomHost) createRoom();
    else joinRoom();
  };

  const joinRoom = async () => {
    try {
      console.log("RoomId: ", roomId);
      const { data } = await getRoomExists(roomId);
      const { roomExists, full } = data;
      if (roomExists) {
        if (full) {
          setErrorMsg("Meeting is full! Please try again later.");
        } else {
          //join a room
          dispatch(setRoomId(roomId));
          navigate("/room", { replace: true });
        }
      } else {
        setErrorMsg("Meeting not found! Please check your meeting id");
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrorMsg(error.message);
    }
  };

  const createRoom = () => {
    navigate("/room", { replace: true });
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className={styles.mainContainer}
    >
      <motion.div
        initial={{ backgroundColor: "rgba(0,0,0,0)" }}
        animate={{
          backgroundColor: "#1f272f",
          transition: {
            delay: 0.1,
            duration: 0.4,
            ease: [0.6, 0.01, -0.05, 0.9],
          },
        }}
        className={styles.banner}
      >
        <motion.h1
          initial={{ x: "30vw", y: -12 }}
          animate={{
            x: 0,
            y: 0,
            width: "auto",
            scale: 1.1,
            textShadow: "2px 2px #fff",
            transition: {
              duration: 0.4,
              //ease: [0.6, 0.01, -0.05, 0.9],
              //ease: [1, 0.7, 1, 0.86],
              ease: [0.15, 0.72, 0.76, 0.96],
            },
          }}
          className={styles.logo}
        >
          Baat Chit
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.25,
              duration: 0.4,
              ease: [0.6, 0.01, -0.05, 0.9],
            },
          }}
          className={styles.slogan}
        >
          Stay connected with all your friends and family with Baat Chit.
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.35,
            duration: 0.4,
            //ease: [0.91, 0.88, 0.92, 0.92],
            ease: "linear",
          },
        }}
        className={styles.contentPanelConatiner}
      >
        <div className={styles.contentPanel}>
          <h1 className={styles.title}>
            {isRoomHost ? `Host` : `Join`} meeting
          </h1>
          <div className={styles.inputsContainer}>
            <input
              className={styles.textField}
              value={name}
              placeholder="Enter your name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            {!isRoomHost && (
              <input
                className={styles.textField}
                value={roomId}
                placeholder="Enter the meeting id"
                type="text"
                onChange={(e) => setRoomID(e.target.value)}
              />
            )}
            <div className={styles.audioOnlyCheck}>
              <input
                type="checkbox"
                name="audioOnly"
                checked={connectOnlyWithAudio}
                onChange={(e) => handleAudioOnly(e)}
              />
              <label htmlFor="audioOnly">Join with audio only</label>
            </div>
          </div>
          <div className={styles.errMsgContainer}>
            {errorMsg !== "" && <p className={styles.errMsg}>{errorMsg}</p>}
          </div>
          <div className={styles.btnsContainer}>
            <button onClick={handleJoinRoom} className={styles.joinBtn}>
              Join
            </button>
            <button
              onClick={() => {
                navigate("/");
              }}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JoinRoomScreen;
