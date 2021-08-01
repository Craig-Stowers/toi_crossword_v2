import { useEffect, useLayoutEffect, useState, Fragment, useRef } from "react";
import "./SpotTheDifference.css";

import tickImage from "../images/ui/tick.png";
function SpotTheDifference(props) {
   let levelData = props.gameData[props.selectedLevel];
   let [pos, setPos] = useState({ x: 0, y: 0 });
   let [isCompleted, setIsCompleted] = useState(false);
   let [isCorrectArr, setIsCorrectArr] = useState(
      Array(levelData.targets.length).fill(false)
   );

   let image1 = levelData.images[0];
   let image2 = levelData.images[1];

   const clickTarget = (i) => {
      if (isCorrectArr[i] === true) {
         return;
      }
      let newArray = [...isCorrectArr];
      newArray[i] = true;
      setIsCorrectArr(newArray);

      if (newArray.every((e) => e === true)) {
         setIsCompleted(true);
         setTimeout(() => {
            props.onLevelCompleted();
         }, 1400);
      }
   };

   if (!props.showGame) {
      return <></>;
   }

   return (
      <div className="SpotTheDifference">
         <div className="images">
            <div className="panelLeft">
               <p>Original photo</p>
               <div className="imageLeft">
                  <img
                     className="SpotTheDifference__image"
                     src={image1}
                     onDragStart={(e) => {
                        e.preventDefault();
                     }}
                     onClick={() => {
                        if (props.showAnswers || isCompleted) {
                           return;
                        }
                        props.onFeedback(
                           <p>
                              Remember to only click on the{" "}
                              <strong>right-hand image</strong>.
                           </p>
                        );
                     }}
                  />
               </div>
            </div>
            <div className="panelRight">
               <p>Modified photo</p>
               <div
                  className="imageRight"
                  onClick={(e) => {
                     // var rect = e.target.getBoundingClientRect();
                     // let xPercent = ((e.clientX - rect.left) / rect.width) * 100;
                     // let yPercent = ((e.clientY - rect.top) / rect.height) * 100;
                     // setPos({ x: xPercent, y: yPercent });
                  }}
               >
                  {levelData.targets.map((element, i) => {
                     let showAnswer = props.showAnswers || isCorrectArr[i];
                     return (
                        <Fragment key={i}>
                           <div
                              key={props.selectedLevel + "-target" + i}
                              onClick={() => {
                                 clickTarget(i);
                              }}
                              className={`target${showAnswer ? " show" : ""}`}
                              style={{
                                 left: element.x + "%",
                                 top: element.y + "%",
                              }}
                           ></div>

                           <img
                              key={props.selectedLevel + "-tick" + i}
                              className={`tick${showAnswer ? " show" : ""}`}
                              src={tickImage}
                              style={{
                                 left: element.x + "%",
                                 top: element.y + "%",
                              }}
                           />
                        </Fragment>
                     );
                  })}
                  {/* <div
                  className="testTarget"
                  style={{ left: pos.x + "%", top: pos.y + "%" }}
               ></div> */}
                  <img
                     className="SpotTheDifference__image"
                     src={image2}
                     onDragStart={(e) => {
                        e.preventDefault();
                     }}
                     onClick={() => {
                        if (props.showAnswers || isCompleted) {
                           return;
                        }
                        props.onFeedback("Not quite. Please try again.");
                     }}
                  />
               </div>
            </div>
         </div>
         <p class="bottomNote">
            Click each of the {levelData.targets.length} differences in the
            modified photo.
         </p>
      </div>
   );
}

export default SpotTheDifference;
