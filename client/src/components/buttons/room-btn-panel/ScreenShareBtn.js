import React, { useState } from "react";
import styles from "./RoomBtnPanel.module.css";
import screenShare from "../../../assets/icons/screenShare.svg";

const ScreenShareBtn = () => {
  const [isScreenShareActive, setIsScreenShareActive] = useState(false);

  const handleSSBntPress = () => {
    setIsScreenShareActive((prev) => !prev);
  };

  return (
    <div onClick={handleSSBntPress} className={styles.btnContainer}>
      <img src={screenShare} alt="screen-share" className={styles.btnImg} />
    </div>
  );
};

export default ScreenShareBtn;
