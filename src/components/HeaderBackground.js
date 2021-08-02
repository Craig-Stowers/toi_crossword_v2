import classes from "./HeaderBackground.module.css";
import headerBackImage from "../images/ui/header-back-crossword.png";

function HeaderBackground(props) {
   return (
      <div
         className={classes.headerBackground}
         style={{ height: props.gameWidth * 0.102 }}
      >
         <img
            src={headerBackImage}
            style={{
               width: props.gameWidth * 1.65,
               height: props.gameWidth * 0.102,
               top: props.gameWidth * 0.0, //0.013
            }}
         />
      </div>
   );
}
export default HeaderBackground;
