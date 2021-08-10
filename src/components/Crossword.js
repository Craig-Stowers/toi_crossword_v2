import React, { Component, createRef } from "react";
import "./Crossword.css";
//import "./CrosswordGrid.js";

const boxSize = 40;

class Crossword extends Component {
   constructor(props) {
      console.log("new crossword");
      super(props);

      this.wordData = this.props.gameData[this.props.selectedLevel].wordData; //this.props.wordData;

      console.log(this.wordData);

      this.columns = Math.max(
         ...this.wordData.map(
            (obj) => obj.pos[0] + (obj.down ? 1 : obj.word.length) //add one as array from 0
         )
      );
      this.rows = Math.max(
         ...this.wordData.map(
            (obj) => obj.pos[1] + (obj.down ? obj.word.length : 1)
         )
      );

      this.boardArray = this.create2DArray(this.rows, this.columns);

      //loop through game data and construct 2d array of cell with letters
      for (var i = 0; i < this.wordData.length; i++) {
         let word = this.wordData[i].word;
         let pos = this.wordData[i].pos;
         let isDown = this.wordData[i].down || false;

         for (var j = 0; j < word.length; j++) {
            let row = pos[0] + (isDown ? 0 : j);
            let col = pos[1] + (isDown ? j : 0);

            if (this.boardArray[col][row]) {
               //if cell in 2d array already exists add another parent word to existing cell

               let parentWords = [];
               if (isDown) {
                  parentWords = [this.boardArray[col][row].word[0], i];
                  if (j === 0) {
                     this.boardArray[col][row].isDownKey = true;
                  }
               } else {
                  parentWords = [i, this.boardArray[col][row].word[0]];
                  if (j === 0) {
                     this.boardArray[col][row].isAcrossKey = true;
                  }
               }
               this.boardArray[col][row].word = parentWords;
            } else {
               // console.log(j === 0 && isDown, isDown);
               this.boardArray[col][row] = {
                  letter: word[j],
                  word: [i],
                  isAcrossKey: j === 0 && !isDown,
                  isDownKey: j === 0 && isDown,
               };
            }
         }
      }
      let inputArray = this.boardArray.map((row) => {
         return row.map((cell) => {
            return "";
            //return cell.letter;
         });
      });

      this.state = {
         inputData: inputArray,
         selection: [-100, 0],
         selectedWord: null,
         correctWords: [],
         incompleteWords: [],
      };

      this.inputRef = createRef();
      this.gridRef = createRef();
   }

   create2DArray(numRows, numColumns) {
      let array = new Array(numRows);

      for (let i = 0; i < numRows; i++) {
         array[i] = new Array(numColumns);
      }

      return array;
   }
   equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

   onCellClicked = ([column, row]) => {
      if (!this.boardArray[row][column]) {
         return;
      }
      let parentWord = this.boardArray[row][column].word;

      let selection = [column, row];

      //deefault to horizontal
      let selectedWordIndex = 0;
      if (this.state.selectedWord !== null) {
         //retrieve current index so can toggle properly and maintain selection of previous selected word
         selectedWordIndex = parentWord.indexOf(this.state.selectedWord);
         if (selectedWordIndex < 0) {
            selectedWordIndex = 0;
         }
      }

      //toggle if repeat selection and two parent words
      if (
         this.equals(selection, this.state.selection) &&
         parentWord.length > 1
      ) {
         selectedWordIndex = 1 - selectedWordIndex;
      } else {
         //give priority to first letter of down word if not key across word
         //if across word already selected ignore new down word
         if (
            parentWord.length > 1 &&
            this.boardArray[row][column].isDownKey &&
            !this.boardArray[row][column].isAcrossKey &&
            this.state.selectedWord !== parentWord[0]
         ) {
            selectedWordIndex = 1;
         }
      }

      let selectedWord = parentWord[selectedWordIndex];
      this.setState({
         selection: selection,
         selectedWord: selectedWord,
      });
   };

   deleteSpace = () => {
      let tempCrossWordData = this.state.inputData;
      let nextCell = this.state.selection;
      let oldSelection = [...this.state.selection];

      if (
         this.state.inputData[this.state.selection[1]][
            this.state.selection[0]
         ] === ""
      ) {
         if (this.wordData[this.state.selectedWord].down) {
            for (var i = nextCell[1] - 1; i >= 0; i--)
               if (
                  this.boardArray[i][nextCell[0]] &&
                  this.boardArray[i][nextCell[0]].word.includes(
                     this.state.selectedWord
                  )
               ) {
                  nextCell = [nextCell[0], i];
                  break;
               }
         } else {
            for (var i = nextCell[0] - 1; i >= 0; i--)
               if (
                  this.boardArray[nextCell[1]][i] &&
                  this.boardArray[nextCell[1]][i].word.includes(
                     this.state.selectedWord
                  )
               ) {
                  nextCell = [i, nextCell[1]];
                  break;
               }
         }
      } else {
         tempCrossWordData[this.state.selection[1]][this.state.selection[0]] =
            "";
      }

      this.setState({
         inputData: tempCrossWordData,
         selection: nextCell,
      });
      this.markWordsFromSelection(oldSelection);
   };

   onDocKeyUp = (e) => {
      if (e.keyCode === 16) {
         this.shiftDown = false;
      }
   };
   onDocKeyDown = (e) => {
      if (e.keyCode === 16) {
         this.shiftDown = true;
      }

      if (e.keyCode == 13) {
         // this.markWordsFromSelection();
      }
   };

   selectWord = (wordIndex) => {
      let selection = this.wordData[wordIndex].pos;
      this.setState({
         selectedWord: wordIndex,
         selection: selection,
      });
   };

   markWord = (wordIndex) => {
      let wordPassed = true;
      for (var i = 0; i < this.boardArray.length; i++) {
         let row = this.boardArray[i];
         for (var j = 0; j < row.length; j++) {
            let cell = row[j];
            if (cell && cell.word.includes(wordIndex)) {
               if (this.state.inputData[i][j] !== cell.letter) {
                  wordPassed = false;
               }
            }
         }
      }
      return wordPassed;
   };

   checkWordAttemtped = (wordIndex) => {
      let attempted = false;
      for (var i = 0; i < this.boardArray.length; i++) {
         let row = this.boardArray[i];
         for (var j = 0; j < row.length; j++) {
            let cell = row[j];
            if (cell && cell.word.includes(wordIndex)) {
               const input = this.state.inputData[i][j];

               if (input === cell.letter && cell.word.length > 1) {
                  console.log("continue");
                  continue;
               }

               console.log(input);

               if (input) {
                  attempted = true;
               }
            }
         }
      }
      return attempted;
   };

   markWordsFromSelection = (selection) => {
      let cell = this.boardArray[selection[1]][selection[0]];

      if (!cell) {
         return;
      }

      let newCorrectWords = [...this.state.correctWords];

      for (var i = 0; i < cell.word.length; i++) {
         const correct = this.markWord(cell.word[i]);
         newCorrectWords[cell.word[i]] = correct;
      }

      let newIncompleteWords = [...this.state.incompleteWords];

      if (newCorrectWords[this.state.selectedWord] === true) {
         newIncompleteWords[this.state.selectedWord] = false;
      } else {
         newIncompleteWords[this.state.selectedWord] = this.checkWordAttemtped(
            this.state.selectedWord
         );
         // if (cell.word.length == 2) {
         //    newIncompleteWords[cell.word[1]] = this.checkWordAttemtped(
         //       cell.word[1]
         //    );
         // }
      }

      this.setState({
         correctWords: newCorrectWords,
         incompleteWords: newIncompleteWords,
      });

      // setTimeout(() => {
      //    console.log("DELAY", this.state.correctWords);
      // }, 500);
   };

   onKeyDown = (e) => {
      if (this.state.allCorrect) {
         return;
      }
      if (e.keyCode === 9 && document.activeElement === this.inputRef.current) {
         e.preventDefault();
         let nextWord;
         let currentWord = this.state.selectedWord;
         if (this.shiftDown) {
            nextWord = currentWord - 1;
            if (nextWord < 0) {
               nextWord = this.wordData.length - 1;
            }
         } else {
            nextWord = currentWord + 1;
            if (nextWord > this.wordData.length - 1) {
               nextWord = 0;
            }
         }

         this.selectWord(nextWord);
         return;
      }

      if (e.keyCode === 8) {
         this.deleteSpace();
      }
      //left
      let currentCell = this.state.selection;
      if (e.keyCode === 37) {
         if (this.boardArray[currentCell[1]][currentCell[0] - 1]) {
            this.onCellClicked([currentCell[0] - 1, currentCell[1]]);
         }
      }
      //up

      if (e.keyCode === 38) {
         //extra test needed for up/down because undefined first dimension of array throws error when referencing a 2nd
         if (
            this.boardArray[currentCell[1] - 1] &&
            this.boardArray[currentCell[1] - 1][currentCell[0]]
         ) {
            this.onCellClicked([currentCell[0], currentCell[1] - 1]);
         }
      }
      //right
      if (e.keyCode === 39) {
         if (this.boardArray[currentCell[1]][currentCell[0] + 1]) {
            this.onCellClicked([currentCell[0] + 1, currentCell[1]]);
         }
      }
      //down
      if (e.keyCode === 40) {
         if (
            this.boardArray[currentCell[1] + 1] &&
            this.boardArray[currentCell[1] + 1][currentCell[0]]
         ) {
            this.onCellClicked([currentCell[0], currentCell[1] + 1]);
         }
      }
   };

   onInputFocus = (e) => {
      if (this.state.selectedWord === null && this._ismounted) {
         let selection = this.wordData[0].pos;
         this.setState({
            selectedWord: 0,
            selection: selection,
         });
      }
   };

   handleInput = (e) => {
      if (this.state.allCorrect) {
         return;
      }
      let oldSelection = [...this.state.selection];
      let tempCrossWordData = this.state.inputData;
      const isLetter = (str) => {
         return str.length === 1 && str.match(/[a-z]/i);
      };
      if (!isLetter(e.target.value)) {
         return;
      }
      tempCrossWordData[this.state.selection[1]][this.state.selection[0]] =
         e.target.value.toUpperCase();

      let nextCell = this.state.selection;
      if (this.wordData[this.state.selectedWord].down) {
         for (var i = nextCell[1] + 1; i < this.boardArray.length; i++)
            if (
               this.boardArray[i][nextCell[0]] &&
               this.boardArray[i][nextCell[0]].word.includes(
                  this.state.selectedWord
               )
            ) {
               nextCell = [nextCell[0], i];
               break;
            }
      } else {
         for (
            var i = nextCell[0] + 1;
            i < this.boardArray[nextCell[1]].length;
            i++
         )
            if (
               this.boardArray[nextCell[1]][i] &&
               this.boardArray[nextCell[1]][i].word.includes(
                  this.state.selectedWord
               )
            ) {
               nextCell = [i, nextCell[1]];
               break;
            }
      }
      // this.inputRef.current.focus();

      let allCorrect = true;
      for (var i = 0; i < tempCrossWordData.length; i++) {
         let row = tempCrossWordData[i];
         for (var j = 0; j < row.length; j++) {
            let cellData = this.boardArray[i][j];
            if (cellData) {
               if (row[j] != cellData.letter) {
                  allCorrect = false;
               }
            }
         }
      }
      if (allCorrect) {
         setTimeout(() => {
            this.props.onLevelCompleted();
         }, 5000);
      }

      this.setState({
         allCorrect: allCorrect,
         selection: nextCell,
         inputData: tempCrossWordData,
      });
      this.markWordsFromSelection(oldSelection);
   };

   componentWillUnmount() {
      document.removeEventListener("keyup", this.onDocKeyUp);
      document.removeEventListener("keydown", this.onDocKeyDown);
   }

   componentDidMount() {
      document.addEventListener("keyup", this.onDocKeyUp);
      document.addEventListener("keydown", this.onDocKeyDown);
      if (this.inputRef.current) {
         this.inputRef.current.focus();
      }
      this._ismounted = true;
   }
   componentDidUpdate() {
      if (this.inputRef.current) {
         this.inputRef.current.focus();
      }
   }

   renderBoxes() {
      return this.state.inputData.map((row, yIndex) => {
         return row.map((item, xIndex) => {
            let boardCell = this.boardArray[yIndex][xIndex];
            let highlight = false;

            if (this.state.selectedWord !== null) {
               if (boardCell.word.includes(this.state.selectedWord)) {
                  highlight = true;
               }
            }

            let select = false;
            if (this.equals(this.state.selection, [xIndex, yIndex])) {
               select = true;
            }

            let isKey = null;

            // down key will find last place in array incase letter shared with across word
            if (boardCell.isDownKey) {
               isKey =
                  this.wordData[boardCell.word[boardCell.word.length - 1]]
                     .index;
            }

            if (boardCell.isAcrossKey) {
               isKey = this.wordData[boardCell.word[0]].index;
            }

            let incomplete = false;
            for (var i = 0; i < boardCell.word.length; i++) {
               if (this.state.incompleteWords[boardCell.word[i]]) {
                  incomplete = true;
               }
            }

            let correct = false; //item === boardCell.letter;

            for (var i = 0; i < boardCell.word.length; i++) {
               if (this.state.correctWords[boardCell.word[i]]) {
                  correct = true;
               }
            }

            let letterOutput = item;
            if (this.props.showAnswers) {
               letterOutput = boardCell.letter;
               correct = true;
            }

            // console.log(isKey);

            return item !== null ? (
               <g
                  key={xIndex + "." + yIndex}
                  onClick={() => {
                     this.onCellClicked([xIndex, yIndex]);
                  }}
               >
                  <rect
                     x={xIndex * boxSize + 1}
                     y={yIndex * boxSize + 1}
                     width={`${boxSize - 1}`}
                     height={`${boxSize - 1}`}
                     className={`crossword__cell ${
                        incomplete ? "incomplete" : ""
                     } ${correct ? "correct" : ""} ${select ? "select" : ""} ${
                        highlight ? "highlight" : ""
                     }`}
                  ></rect>

                  {isKey !== null && (
                     <text
                        x={xIndex * boxSize + 4}
                        y={yIndex * boxSize + 13}
                        className="crossword__cell-number"
                     >
                        {isKey}
                     </text>
                  )}
                  <text
                     x={xIndex * boxSize + 20}
                     y={yIndex * boxSize + 28}
                     className="crossword__cell-text"
                     textAnchor="middle"
                  >
                     {letterOutput}
                  </text>
               </g>
            ) : null;
         });
      });
   }

   render() {
      let height = this.rows * boxSize;
      let width = this.columns * boxSize;

      if (!this.props.showGame) {
         return <></>;
      }

      console.log(this.state.incompleteWords);

      return (
         <div className="crossword">
            <div className="crossword__container">
               <div
                  className="crossword__container__grid-wrapper"
                  style={{ width: width, height: height }}
                  // onKeyDown={this.crossWordKeyHit}
               >
                  <svg
                     viewBox={"0 0 " + (width + 1) + " " + (height + 1)}
                     className="crossword__grid crossword__grid--focussed"
                     ref={this.gridRef}
                  >
                     <rect
                        x="0"
                        y="0"
                        width={width + 1}
                        height={height + 1}
                        className="crossword__grid-background"
                     ></rect>

                     {this.renderBoxes()}
                  </svg>
                  <div
                     className="crossword__hidden-input-wrapper"
                     style={{
                        left: this.state.selection[0] * boxSize + 0.5 + "px",
                        top: this.state.selection[1] * boxSize + 0.5 + "px",
                     }}
                  >
                     <input
                        style={{
                           width: boxSize,
                           height: boxSize,
                        }}
                        onChange={this.handleInput}
                        // onchange won't pick up delete because technicually input box has nothing to delete as it's a seperate element that contains the text
                        onKeyDown={this.onKeyDown}
                        onKeyUp={this.onKeyUp}
                        onFocus={() => {
                           this.onInputFocus();
                        }}
                        onClick={() => {
                           this.onCellClicked(this.state.selection);
                        }}
                        type="text"
                        value=""
                        className="crossword__hidden-input"
                        maxLength="1"
                        autoComplete="off"
                        spellCheck="false"
                        autoCorrect="off"
                        autoFocus
                        ref={this.inputRef}
                     />
                  </div>
               </div>
            </div>

            <div className="hints">
               <div className="hintsAcross">
                  <h4>Across words</h4>

                  <ul>
                     {this.wordData.map((object, index) => {
                        if (object.down) {
                           return null;
                        }
                        return (
                           <li
                              key={"hint" + index}
                              className={`${
                                 this.state.selectedWord === index
                                    ? "highlight"
                                    : null
                              }`}
                              // style={style}
                              onClick={() => {
                                 this.selectWord(index);
                              }}
                           >
                              <strong>{object.index}. </strong>
                              {`${object.hint} (${object.word.length})`}
                           </li>
                        );
                     })}
                  </ul>
               </div>

               <div className="hintsDown">
                  <h4>Down words</h4>
                  <ul>
                     {this.wordData.map((object, index) => {
                        if (!object.down) {
                           return null;
                        }
                        return (
                           <li
                              key={"hint" + index}
                              className={`${
                                 this.state.selectedWord === index
                                    ? "highlight"
                                    : null
                              }`}
                              // style={style}
                              onClick={() => {
                                 this.selectWord(index);
                              }}
                           >
                              <strong>{object.index}. </strong>
                              {`${object.hint} (${object.word.length})`}
                           </li>
                        );
                     })}
                  </ul>
               </div>
            </div>
         </div>
      );
   }
}

export default Crossword;
