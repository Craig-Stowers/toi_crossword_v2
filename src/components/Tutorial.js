import classes from "./Tutorial.module.css";
import page from "./Page.module.css";
import mainMenu from "../images/ui/main-menu.png";
import play from "../images/ui/play.png";
import continueButton from "../images/ui/continue.png";
import step1 from "../images/ui/step1.png";
import step2 from "../images/ui/step2.png";
import step3 from "../images/ui/step3.png";
function Tutorial(props) {
   return (
      <div>
         <div className={page.panel}>
            <h2>HOW TO PLAY</h2>
            <h3>How keen are your eyes? Let’s see what you can spot.</h3>
            <p>
               There are five levels to play through, starting nice and easy and
               increasing in difficulty as the levels increase. Find all
               differences in a game to unlock the next level.
            </p>
            <h3>Instructions</h3>

            <div className={`${classes.stepsWrapper} x2`}>
               <div className={`${classes.step} ${classes.stepx2}`}>
                  <img src={step1} />

                  <div className={classes.stepText1}>
                     Click on the picture on the right where you have spotted a
                     difference.
                  </div>
               </div>
               <div
                  className={`${classes.step} ${classes.step2} ${classes.stepx2}`}
               >
                  <img src={step2} />

                  <div className={classes.stepText2}>
                     If you’re correct, you’ll see a green circle. If you’re
                     wrong, you’ll get a notice to try again..
                  </div>
               </div>
            </div>

            <div className={page.buttons}>
               <img
                  className="generic-button"
                  src={mainMenu}
                  onClick={() => {
                     props.onMainMenuClick();
                  }}
               />

               {props.onContinue ? (
                  <img
                     className="generic-button"
                     src={continueButton}
                     onClick={() => {
                        props.onContinue();
                     }}
                  />
               ) : (
                  <img
                     className="generic-button"
                     src={play}
                     onClick={() => {
                        props.onPlay();
                     }}
                  />
               )}
            </div>
         </div>
      </div>
   );
}
export default Tutorial;
