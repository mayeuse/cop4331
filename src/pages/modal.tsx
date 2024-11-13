import React from "react";
import styles from "./index.module.css";

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({ message, onConfirm, onCancel }: ModalProps): React.JSX.Element => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default Modal;
