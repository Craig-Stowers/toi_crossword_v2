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
            <h3>Test your word skills on some crossword puzzles.</h3>
            <p>
               There are five levels to play through, starting nice and easy and
               increasing in difficulty as the levels increase. Complete the
               crossword to unlock the next level.
            </p>
            <h3>Instructions</h3>

            <div className={`${classes.stepsWrapper}`}>
               <div className={`${classes.step}`}>
                  <img src={step1} />

                  <div className={classes.stepText1}>
                     Use your mouse to click into a box or use the Tab key to
                     move between boxes and start typing the answer one letter
                     at a time.
                  </div>
               </div>
               <div className={`${classes.step} ${classes.step2}`}>
                  <img src={step2} />

                  <div className={classes.stepText2}>
                     If the answer is correct, the boxes will turn green.
                  </div>
               </div>
               <div className={`${classes.step} ${classes.step3}`}>
                  <img src={step3} />

                  <div className={classes.stepText3}>
                     If the answer is incorrect, the boxes will turn red and
                     you’ll need to try again.
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
