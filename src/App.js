import logo from "./logo.svg";
import "./App.css";

import scorm from "./scorm.js";

import { useState, useLayoutEffect, useEffect, useRef } from "react";

import UniformScale from "./components/UniformScale";
import Header from "./components/Header";

import TitlePage from "./components/TitlePage";
import Tutorial from "./components/Tutorial";
import LevelSelect from "./components/LevelSelect";

import Feedback from "./components/Feedback";
import Congrats from "./components/Congrats";
import Game from "./components/Crossword";

import { Button, Dropdown } from "react-bootstrap";
import { gameData, allImages } from "./gameData";
import { propTypes } from "react-bootstrap/esm/Image";
import HeaderBackground from "./components/HeaderBackground";

function useLoadAllImages() {
   const [imagesLoaded, setImagesLoaded] = useState(false);
   useLayoutEffect(() => {
      let imagesLoaded = 0;
      function onImageLoad() {
         imagesLoaded++;
         if (imagesLoaded >= allImages.length) {
            setImagesLoaded(true);
         }
      }
      for (var i = 0; i < allImages.length; i++) {
         let img1 = new Image();
         img1.onload = onImageLoad;
         img1.src = allImages[i];
      }
      //return (_) => window.removeEventListener("resize", updateSize);
   }, []);
   return imagesLoaded;
}

function App() {
   const [page, setPage] = useState("TitlePage"); //levelselect,game
   const [showGame, setShowGame] = useState(true);
   const [showInstructions, setShowInstructions] = useState(false);
   const [selectedLevel, setSelectedLevel] = useState(0);
   const [inGameTutorial, setInGameTutorial] = useState(false);

   const [showCongrats, setShowCongrats] = useState(false);
   const [showCheats, setShowCheats] = useState(false);
   const [showAnswers, setShowAnswers] = useState(false);
   const [feedback, setFeedback] = useState(null);
   const [currentGameWidth, setCurrentGameWidth] = useState(100);
   const allImagesLoaded = useLoadAllImages();

   const [gameLoaded, setGameLoaded] = useState(false);
   const [levelsUnlocked, setLevelsUnlocked] = useState([
      true,
      false,
      false,
      false,
      false,
   ]);

   const gameWrapper = useRef(null);

   const [reload, setReload] = useState(false);

   const [initScorm, setInitScorm] = useState(false);

   useEffect(() => {
      if (initScorm) return;

      scorm.initScorm();
      setInitScorm(true);

      const localData = JSON.parse(window.localStorage.getItem("crossword"));
      const lmsData = scorm.scormProcessGetValue("cmi.suspend_data");

      if (lmsData) {
         setLevelsUnlocked(JSON.parse(lmsData).unlocks);
      } else if (localData) {
         //setLevelsUnlocked(localData.unlocks);
      }

      scorm.scormProcessSetValue("cmi.core.score.raw", "100");
      scorm.setLessonStatusComplete();
   }, [initScorm]);

   const levelCompleted = () => {
      let unlocks = [...levelsUnlocked];
      if (selectedLevel + 1 <= gameData.length - 1) {
         unlocks[selectedLevel + 1] = true;
         setLevelsUnlocked(unlocks);
      }

      scorm.scormProcessSetValue(
         "cmi.suspend_data",
         JSON.stringify({ unlocks: unlocks })
      );
      // } else {
      window.localStorage.setItem(
         "crossword",
         JSON.stringify({ unlocks: unlocks })
      );

      setShowCongrats(true);
   };

   useLayoutEffect(() => {
      setReload(true);
      setShowAnswers(false);
      setGameLoaded(false);
   }, [selectedLevel]);

   useLayoutEffect(() => {
      setReload(false);
   }, [reload]);

   const handleWidthChange = (width, scale) => {
      setCurrentGameWidth(width);
   };

   if (!allImagesLoaded) {
      return <></>;
   }

   const handleOnPlay = () => {
      if (page == "TitlePage") {
         setPage("LevelSelect");
         return;
      }
      if (page == "Tutorial") {
         setPage("LevelSelect");
         return;
      }
   };

   const handleSelectLevel = (level) => {
      setSelectedLevel(level);
      setInGameTutorial(false);
      setShowAnswers(false);
      setPage("Game");
   };

   const handleNextLevel = () => {
      let nextLevel = selectedLevel + 1;
      if (nextLevel <= gameData.length - 1) {
         setSelectedLevel(nextLevel);
      }
   };

   const getBackgroundClass = () => {
      if (page == "TitlePage") return "bg1";
      if (page == "Tutorial") return "bg2";
      return "bg2";
   };

   const handleExitLevel = () => {
      setPage("LevelSelect");
   };
   const handleMainMenuClick = () => {
      setPage("TitlePage");
   };
   const handleHowToClick = () => {
      setPage("Tutorial");
   };

   const handleInfoClick = () => {
      setInGameTutorial(true);
   };

   const handleOnContinue = () => {
      setInGameTutorial(false);
   };

   const getHeaderBackGround = () => {
      if (page == "TitlePage") {
         return <></>;
      }
      return <HeaderBackground gameWidth={currentGameWidth} />;
   };
   const getHeader = () => {
      if (page == "TitlePage") {
         return <></>;
      }

      const showButtons = page === "Game" && !inGameTutorial;

      return (
         <Header
            title={gameData[selectedLevel].title}
            level={selectedLevel}
            showButtons={showButtons}
            disableNext={!levelsUnlocked[selectedLevel + 1]}
            hideNext={selectedLevel === gameData.length - 1}
            onInfoClick={handleInfoClick}
            onExitLevel={handleExitLevel}
            onNextLevel={handleNextLevel}
            onShowInstructions={(e) => {
               setShowInstructions(true);
            }}
            // onToggleCheats={(e) => {
            //    setShowCheats(!showCheats);
            // }}
         />
      );
   };

   const getPage = () => {
      if (page == "TitlePage") {
         return (
            <TitlePage onPlay={handleOnPlay} onHowToClick={handleHowToClick} />
         );
      }

      if (page == "Tutorial") {
         return (
            <Tutorial
               onPlay={handleOnPlay}
               onMainMenuClick={handleMainMenuClick}
            />
         );
      }

      if (page == "LevelSelect") {
         return (
            <LevelSelect
               onSelectLevel={handleSelectLevel}
               onHowToClick={handleHowToClick}
               onMainMenuClick={handleMainMenuClick}
               levelsUnlocked={levelsUnlocked}
            />
         );
      }

      if (page == "Game") {
         if (reload) {
            return <>/</>;
         } else {
            return (
               <>
                  <Game
                     showGame={!inGameTutorial}
                     gameData={gameData}
                     selectedLevel={selectedLevel}
                     onLevelCompleted={levelCompleted}
                     showAnswers={showAnswers}
                     onLoaded={() => {
                        setGameLoaded(true);
                     }}
                     forceHideAnswers={() => {
                        setShowAnswers(false);
                     }}
                     onFeedback={(message) => {
                        setFeedback(message);
                     }}
                  />
                  {inGameTutorial ? (
                     <Tutorial
                        onContinue={handleOnContinue}
                        onMainMenuClick={handleMainMenuClick}
                     />
                  ) : null}
               </>
            );
         }
      }
   };

   return (
      <div className="App">
         <div className={`background ${getBackgroundClass()}`}></div>
         {getHeaderBackGround()}
         <UniformScale
            internalWidth={1000}
            matchHeight={gameWrapper}
            level={selectedLevel}
            gameLoaded={gameLoaded}
            refreshOnChange={[inGameTutorial, page]}
            onWidthChange={handleWidthChange}
         >
            <div className="gameWrapper" ref={gameWrapper}>
               {getHeader()}

               {page == "Game" && !inGameTutorial && (
                  <div className="levelTitle">
                     <h3>{gameData[selectedLevel].title}</h3>
                     <div
                        className="seeAnswers"
                        onClick={() => {
                           if (showAnswers) {
                              setShowAnswers(false);
                           } else {
                              setShowAnswers(true);
                           }
                        }}
                     >
                        <span>{`${
                           !showAnswers ? "See answers" : "Hide answers"
                        }`}</span>
                     </div>
                  </div>
               )}
               {getPage()}
            </div>
         </UniformScale>

         <Feedback
            show={feedback != null}
            onDismiss={() => {
               setFeedback(null);
            }}
         >
            {feedback}
         </Feedback>

         <Congrats
            show={showCongrats}
            finalLevel={selectedLevel === gameData.length - 1}
            onMainMenu={() => {
               handleMainMenuClick();
               setShowCongrats(false);
            }}
            onNextLevel={() => {
               setSelectedLevel(selectedLevel + 1);
               setShowCongrats(false);
            }}
            onLevelSelect={() => {
               handleExitLevel();
               setShowCongrats(false);
            }}
         >
            {" "}
            {selectedLevel === gameData.length - 1 ? (
               <>
                  <h2>Congratulations!</h2>
                  <p>
                     You’ve completed all levels of the game!
                     <br />
                     Why not try your hand and stretch your mind with another
                     game?
                  </p>
               </>
            ) : (
               <>
                  <h2>Congratulations!</h2>
                  <p>
                     You’ve successfully completed{" "}
                     <strong>Level {selectedLevel + 1}</strong>.<br />
                     Click <strong>Next level</strong> to keep playing.
                  </p>
               </>
            )}
         </Congrats>
      </div>
   );
}

export default App;
