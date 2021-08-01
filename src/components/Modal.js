import "./Modal.css";

function Modal(props) {
   return (
      <div className="Modal">
         <div className="Modal__box">{props.children}</div>
      </div>
   );
}
export default Modal;
