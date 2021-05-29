import '../styles/modal.scss'
import React, { useEffect, useRef, FunctionComponent  } from 'react'
import ReactDOM from 'react-dom'

type ModalProps = {
    openModal: Function,
    modalMarginTop: number
}

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const Modal: FunctionComponent<ModalProps> = ({children, openModal, modalMarginTop}) => {

    const modal: HTMLElement = document.createElement("div");
    const mainBlockRef = useRef<HTMLDivElement>(null)
    
    const handleClickOutside = (event:any) => {
        if(mainBlockRef.current && !mainBlockRef.current.contains(event.target)){
            openModal(false)
        }
    }
    
    useEffect(()=> {
        modalRoot.appendChild(modal)
        return () => {
           modalRoot.removeChild(modal);
        }
    }, [])
    useEffect(()=> {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [mainBlockRef])
    
    return <div className="modal" >
             <div className="modal-content" style={{margin: `${modalMarginTop}vh auto`}} ref={mainBlockRef}>
                 {children}
             </div>
         </div>
    // return ReactDOM.createPortal(
    //     <div className="modal" >
    //         <div className="modal-content" style={{margin: `${modalMarginTop}vh auto`}} ref={mainBlockRef}>
    //             {children}
    //         </div>
    //     </div>,
    //     modal
    // );
}

export default Modal
