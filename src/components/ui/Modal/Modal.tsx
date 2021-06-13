import "./modal.scss";
import React, { FunctionComponent } from "react";
import { useHandleClickOutside } from "../../../hooks/useHandleClickOutside";

type ModalProps = {
  openModal: (val: boolean) => void;
  modalMarginTop: number;
};

const Modal: FunctionComponent<ModalProps> = ({
  children,
  openModal,
  modalMarginTop,
}) => {
  const [containerRef] = useHandleClickOutside(openModal);

  return (
    <div className="modal">
      <div
        className="modal-content"
        style={{ margin: `${modalMarginTop}vh auto` }}
        ref={containerRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
