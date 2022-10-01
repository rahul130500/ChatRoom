import React, { useState } from "react";
import styles from "./RoomBtnPanel.module.css";
import mic from "../../../assets/icons/mic.svg";
import micOff from "../../../assets/icons/micOff.svg";

const MicBtn = () => {
  const [isMicOff, setIsMicOff] = useState(false);

  const handleMicBntPress = () => {
    setIsMicOff((prev) => !prev);
  };

  return (
    <div onClick={handleMicBntPress} className={styles.btnContainer}>
      <img src={isMicOff ? micOff : mic} alt="mic" className={styles.btnImg} />
    </div>
  );
};

export default MicBtn;
