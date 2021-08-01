import classes from "./TitlePage.module.css";
import React from "react";

import logo from "../images/ui/logo-medium.png";
import play from "../images/ui/play.png";
import how from "../images/ui/how-to-play.png";
import exit from "../images/ui/exit-game.png";
function TitlePage(props) {
   return (
      <div className={classes.titlePage}>
         <div className={classes.panel}>
            <img src={logo} />

            <div className={classes.buttons}>
               <img
                  src={play}
                  onClick={() => {
                     props.onPlay();
                  }}
               />
               <div>
                  <img
                     src={how}
                     onClick={() => {
                        props.onHowToClick();
                     }}
                  />
                  <img src={exit} />
               </div>
            </div>
         </div>
      </div>
   );
}
export default TitlePage;
