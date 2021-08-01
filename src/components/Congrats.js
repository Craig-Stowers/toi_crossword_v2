import { Button } from "react-bootstrap";
import "./Congrats.css";
import Modal from "./Modal";

import mainMenu from "../images/ui/main-menu.png";
import levelSelect from "../images/ui/level-select.png";
import nextLevel from "../images/ui/next-level.png";

function Congrats(props) {
   return props.show ? (
      <Modal>
         <div className="Congrats">
            {/* <Button
               className="closeButton"
               size="sm"
               variant="danger"
               onClick={() => {
                  props.onClose();
               }}
            >
               close
            </Button> */}

            {props.children}

            <div className="Congrats__bottom">
               <img
                  className="generic-button"
                  src={mainMenu}
                  onClick={() => {
                     props.onMainMenu();
                  }}
               />
               <img
                  className="generic-button"
                  src={levelSelect}
                  onClick={() => {
                     props.onLevelSelect();
                  }}
               />

               {/* <Button onClick={() => {}}>Games centre</Button> */}
               {!props.finalLevel && (
                  <img
                     className="generic-button"
                     src={nextLevel}
                     onClick={() => {
                        props.onNextLevel();
                     }}
                  />
                  // <Button
                  //    onClick={() => {
                  //       props.onNextLevel();
                  //    }}
                  //    disabled={false}
                  // >
                  //    Next level
                  // </Button>
               )}
            </div>
         </div>
      </Modal>
   ) : null;
}
export default Congrats;
