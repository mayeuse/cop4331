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
        <div className={styles.modalbuttons}>
          <button className={styles.modbut} onClick={onConfirm}>Yes</button>
          <button className={styles.modbut} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
