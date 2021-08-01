import "./Congrats.css";
import Modal from "./Modal";
import continueButton from "../images/ui/continue.png";

function Congrats(props) {
   return props.show ? (
      <Modal>
         <div className="Congrats">
            <h2>Good Try!</h2>
            {props.children}

            <div className="Congrats__bottom">
               <img
                  className="generic-button"
                  src={continueButton}
                  onClick={() => {
                     props.onDismiss();
                  }}
               />
            </div>
         </div>
      </Modal>
   ) : null;
}
export default Congrats;
