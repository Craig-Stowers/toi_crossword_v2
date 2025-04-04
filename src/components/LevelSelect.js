import classes from "./LevelSelect.module.css";
import page from "./Page.module.css";
import mainMenu from "../images/ui/main-menu.png";
import how from "../images/ui/how-to-play.png";
import padlock from "../images/ui/padlock.png";

function LevelSelect(props) {
   let locked = [false, false, false, false, false];

   return (
      <div>
         <div className={page.panel}>
            <h2>LEVEL SELECT</h2>

            <p>Select an available level to begin.</p>

            <div className={`${classes.levelsWrapper} noselect`}>
               {props.levelsUnlocked.map((unlocked, i) => {
                  return (
                     <div
                        className={`${classes.level} ${
                           unlocked ? classes.showBackground : ""
                        }`}
                        key={i}
                     >
                        {!unlocked ? (
                           <div className={classes.locked}>
                              <img src={padlock} />
                           </div>
                        ) : (
                           <div
                              className={classes.unlocked}
                              onClick={() => {
                                 props.onSelectLevel(i);
                              }}
                           >
                              {i + 1}
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>

            <div className={page.levelButtons}>
               <img
                  className="generic-button"
                  src={mainMenu}
                  onClick={() => {
                     props.onMainMenuClick();
                  }}
               />
               <img
                  className="generic-button"
                  src={how}
                  onClick={() => {
                     props.onHowToClick();
                  }}
               />
            </div>
         </div>
      </div>
   );
}
export default LevelSelect;
