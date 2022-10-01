import React from "react";
import { motion } from "framer-motion";

const ConnectingBtn = ({
  btnText = "",
  clickHandler = () => {},
  isCreateRoom = false,
  btnClassName,
  nthChild = 1,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: "75%" }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: nthChild === 1 ? 0.3 : 0.4,
          ease: [0.17, 0.67, 0.83, 0.67],
          duration: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        y: "75%",
        transition: {
          ease: "linear",
          duration: 0.15,
        },
      }}
      className={btnClassName}
      onClick={clickHandler}
    >
      {btnText}
    </motion.button>
  );
};

export default ConnectingBtn;
