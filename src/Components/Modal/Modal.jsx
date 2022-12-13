import "./Modal.css";
import reactDom from "react-dom";

const Modal = (props) => {
  return reactDom.createPortal(
    props.children,
    document.getElementById("modal")
  );
};

export const Alert = (props) => {
    return (
        <Modal>
            <div className = "Alert">
                <div className = "message">
                    <h1>{props.message}</h1>
                    {/* <Btn onClick={props.hidePopup}>Hide</Btn> */}
                </div>
            </div>
        </Modal>
    )
}


export default Modal; 