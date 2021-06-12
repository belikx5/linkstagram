import "./modal.scss";
import React, { useEffect, useRef, FunctionComponent } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  openModal: Function;
  modalMarginTop: number;
};

const Modal: FunctionComponent<ModalProps> = ({
  children,
  openModal,
  modalMarginTop,
}) => {
  const mainBlockRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: any) => {
    if (mainBlockRef.current && !mainBlockRef.current.contains(event.target)) {
      openModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mainBlockRef]);

  return (
    <div className="modal">
      <div
        className="modal-content"
        style={{ margin: `${modalMarginTop}vh auto` }}
        ref={mainBlockRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
