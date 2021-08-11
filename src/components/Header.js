import classes from "./Header.module.css";
import React from "react";

import logo from "../images/ui/logo-small.png";
import exit from "../images/ui/exit-level.png";
import info from "../images/ui/info.png";
import nextLevel from "../images/ui/next-level.png";
function Header(props) {
   return (
      <div className={classes.header}>
         {props.showButtons && (
            <div className={classes.left}>
               <img
                  className="generic-button"
                  src={exit}
                  onClick={() => {
                     props.onExitLevel();
                  }}
               />
            </div>
         )}
         <div className={classes.middle}>
            <img src={logo} />
         </div>

         {props.showButtons && (
            <div className={classes.right}>
               <img
                  className="generic-button"
                  src={info}
                  onClick={() => {
                     props.onInfoClick();
                  }}
               />

               {!props.hideNext && (
                  <img
                     className={`generic-button ${
                        props.disableNext ? "disable" : null
                     }`}
                     src={nextLevel}
                     onClick={() => {
                        props.onNextLevel();
                     }}
                  />
               )}
            </div>
         )}
      </div>
   );
}
export default Header;
