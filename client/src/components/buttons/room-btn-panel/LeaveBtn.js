import React from "react";
import styles from "./RoomBtnPanel.module.css";
import cx from "classnames";
import call from "../../../assets/icons/call.svg";

const LeaveBtn = () => {
  const handleLeaveBntPress = () => {
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <div
      onClick={handleLeaveBntPress}
      className={cx(styles.btnContainer, styles.leaveBtnContainer)}
    >
      <img src={call} alt="leave-call" className={styles.btnImg} />
    </div>
  );
};

export default LeaveBtn;
