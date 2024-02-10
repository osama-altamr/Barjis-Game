const Board = require("../structure/board");
const readlineSync = require("readline-sync");
const Structure = require("../structure/structure");
module.exports = class MovesCheck {
  constructor() {
    this.currentState = this.startingState();
  }
  static startingState() {
    // Initialize the game board and return the starting state
    let board = new Board();
    return board.getBoard();
  }

  static getActions(state) {
    // Assuming `getPossibleActions` is modified to work with the instance-based approach
    return this.getPossibleActions(
      state.board,
      state.stone,
      state.currentPlayer
    );
  }

 static isEndState(state) {
    return this.isFinal();
  }

  static getCost(state, action) {
    // The cost could be a constant or calculated based on the action and state
    return 1; // Example constant cost for each move
  }

  static getUtility(state) {
    // For example, the utility could be higher for states where the player is closer to winning
    let utility = 0;

    // Check if the game is over and assign utility based on the winner
    if (this.isEndState()) {
      const kitchen = state.board.kitchen;
      let player1Score = 0;
      let player2Score = 0;

      for (let piece of kitchen) {
        if (piece.stone === "♞") player1Score++;
        if (piece.stone === "♝") player2Score++;
      }

      // Assign utility based on the winning condition and who the current player is
      if (state.currentPlayer === "p1") {
        utility = player1Score - player2Score; // Maximize player1's score
      } else {
        utility = player2Score - player1Score; // Maximize player2's score
      }
    } else {
      // If the game is not over, you could assign utility based on other criteria
      // For example, the number of pieces each player has on the board,
      // or the number of pieces each player has in a position to score.
      // Here you need to implement your game-specific heuristic.
    }

    return utility;
  }












  static moveDest(board) {
    console.log("Dest");
    if (Board.player == "p1") {
      let newboard = this.destPlayer1(board);
      Board.print(newboard);
      console.log(Board.stonesOnBoard);
      return newboard;
    } else if (Board.player == "p2") {
      let newboard = this.destPlayer2(board);
      Board.print(newboard);
      console.log(Board.stonesOnBoard);
      return newboard;
    }
  }

  static destPlayer1(board) {
    let getPossibleActions = this.getPossibleActions(board, "♞", 10);
    if (getPossibleActions.length == 0) {
      let obj = Board.player1[0];
      Board.stonesOnBoard.push(obj);
      Board.player1.splice(0, 1);
      return this.firstState(board, "p1", 10);
    } else {
      return this.nextState(board, "p1", 10);
    }
  }
  static destPlayer2(board) {
    let getPossibleActions = this.getPossibleActions(board, "♝", 10);
    
    console.log(getPossibleActions);
    if (this.countStones("♝") == 0 &&getPossibleActions.length==0 ) {
      let obj = Board.player2[0];
      Board.stonesOnBoard.push(obj);
      Board.player2.splice(0, 1);
      return this.firstState(board, "p2", 10);
    } else {
      return this.nextState(board, "p2", 10);
    }
  }
  static firstState(board, player, steps) {
    if (player == "p1") {
      let obj = Board.stonesOnBoard.find((objs) => objs.id == 1);
      console.log(obj);
      return this.movePiece(board, "♞", obj, obj.row, obj.col, "down", steps);
    }
    if (player == "p2") {
      console.log("steps in first state ",steps)
      let obj = Board.stonesOnBoard.find((objs) => objs.id == 6);
      console.log(obj);
      return this.movePiece(board, "♝", obj, obj.row, obj.col, "up", steps);
    }
  }

  static countStones(stoneShape) {
    let stonesOnBoard = Board.stonesOnBoard;
    let counter = 0;
    for (let i = 0; i < stonesOnBoard.length; i++) {
    if (stonesOnBoard[i].stone === stoneShape) {
    console.log(`Checking stone with shape: ${stonesOnBoard[i].stone}`);
    counter++;
    }
    }
    return counter;
    }
    
  static nextState(board, player, steps) {
    
  if(player=="p1" ){
    const answer = readlineSync.question(" Select 1 or 0? : ");
    if (answer == 1 && player == "p1" ) {
      let obj = Board.player1[0];
      Board.stonesOnBoard.push(obj);
      Board.player1.splice(0, 1);
      console.log(obj);

      let board1 = this.movePiece(board, "♞", obj, obj.row, obj.col, "down", 0);
      const possibleActions = this.getPossibleActions(board1, "♞", steps);
      Board.print(board1);
      console.log(possibleActions);
      const getId = readlineSync.question("Enter id : ");
      let objectStone = Board.stonesOnBoard.find((objs) => objs.id == getId);
      const dir = this.getDirection(objectStone.row, objectStone.col,objectStone.steps, "♞");
      let newboard = this.movePiece(
        board1,
        "♞",
        objectStone,
        objectStone.row,
        objectStone.col,
        dir,
        steps
      );
      Board.print(newboard);
      return newboard;
    }
    if (answer == 0 && player == "p1") {
      const possibleActions = this.getPossibleActions(board, "♞", steps+1);
      console.log(possibleActions);
      const getId = readlineSync.question("Enter id: ");
      let objectStone = Board.stonesOnBoard.find((objs) => objs.id == getId);
      const dir = this.getDirection(objectStone.row, objectStone.col,objectStone.steps, "♞");
      return this.deepcopy(
        this.movePiece(
          board,
          "♞",
          objectStone,
          objectStone.row,
          objectStone.col,
          dir,
          steps + 1
        )
      );
    }
  }
    if (player == "p2") {
    
      let counter =  this.countStones("♝");
      let possibleActions = this.getPossibleActions(board,"♝",steps);
      let actionsPlusOneStep = this.getPossibleActions(board,"♝",steps+1);
      if (possibleActions.length  == 0 && actionsPlusOneStep.length==0 && counter == 4  ){
        return board;
      }
      else if ( actionsPlusOneStep.length == 0 && possibleActions.length == 0 &&   1< counter <4){
       
        let obj = Board.player2[0];
        Board.stonesOnBoard.push(obj);
        Board.player2.splice(0, 1);
        let board1 = this.movePiece(board, "♝", obj, obj.row, obj.col, "up", steps);
        Board.print(board1);
        return board1;
      }      
      else{
        let bestMoves = this.selectBestMove(steps+1,board);
        console.log("Bestttttttttttt",bestMoves)
             if(bestMoves.length!=0){
          if(bestMoves[0].priority == 1  || bestMoves[0].priority==2 || bestMoves[0].priority==3){
           
            let obj = bestMoves[0].objStone;
            let dir  =  this.getDirection(obj.row, obj.col,obj.steps, "♝");
      
            let board1 = this.movePiece(board,
               "♝", obj, obj.row, obj.col,
               dir,
               steps+1);
             return  board1;
          }else if (bestMoves[0].priority == 4 ){
              if( counter < 4 ){
                let obj = Board.player2[0];
                Board.stonesOnBoard.push(obj);
                Board.player2.splice(0, 1);
                let board1 = this.movePiece(board, "♝", obj, obj.row, obj.col, "up", 0);
                let newBestMoves = this.selectBestMove(steps,board1);
                console.log("Bestttttttttttt222222",newBestMoves)
                let objStn =newBestMoves[0].objStone; 
                console.log("object hhhhhhhhhhhhhhhhhh",objStn)
                
                const dir = this.getDirection(objStn.row, objStn.col , objStn.steps, "♝");
                console.log("dir in methodddddddddd",dir)
                  Board.print(board1)
                  let newboard = this.movePiece(
                    board1,
                    "♝",
                    objStn,
                    objStn.row,
                    objStn.col,
                    dir,
                    steps
                  );
                  return newboard;            
              }
              else{
                let obj = bestMoves[0].objStone;
                let board1 = this.movePiece(board,
                   "♝", obj, obj.row, obj.col,
                   this.getDirection(obj.row, obj.col,obj.steps, "♝"),
                   steps);
                 return   board1;
              }
            }
          }
        //  return board;
        }
    }
  }

  static movePang(board) {
    console.log("pang");
    if (Board.player == "p1") {
      let newboard = this.pangPlayer1(board);
      return newboard;
    }
    if (Board.player == "p2") {
      let newboard = this.pangPlayer2(board);
      return newboard;
    }
  }

  static pangPlayer1(board) {
    let getPossibleActions = this.getPossibleActions(board, "♞", 25);
    console.log(getPossibleActions);
    if (this.countStones("♞") == 0) {
      let obj = Board.player1[0];
      Board.stonesOnBoard.push(obj);
      Board.player1.splice(0, 1);
      return this.firstState(board, "p1", 26);
    } else {
      return this.nextState(board, "p1", 25);
    }
  }
  static pangPlayer2(board) {
     let getPossibleActions = this.getPossibleActions(board, "♝", 25);
    console.log(getPossibleActions);
    if (this.countStones("♝") == 0 && getPossibleActions.length==0 ) {
      let obj = Board.player2[0];
      Board.stonesOnBoard.push(obj);
      Board.player2.splice(0, 1);
      return this.firstState(board, "p2", 25);
    } else {
      return this.nextState(board, "p2", 25);
    }
  }

  static moveShaka(board) {
    console.log("Shaka");
    if (Board.player == "p1") {
      let getPossibleActions = this.getPossibleActions(board, "♞", 6);
      if (getPossibleActions == 0) {
        console.log("Player 1, no available moves.");
        return board;
      } else {
        return this.playerMove(board, 6, "p1");
      }
    }
    if (Board.player == "p2") {1
      let getPossibleActions = this.getPossibleActions(board, "♝", 6);
      if (getPossibleActions == 0) {
        console.log("Player 2, no available moves.");
        return board;
      } else {
        return this.playerMove(board, 6, "p2");
      }
    }
  }

  static playerMove(board, steps, player) {

    if(player== "p1"){
      let getPossibleActions = this.getPossibleActions(
        board, "♞" ,
        steps
      );
      console.log(getPossibleActions);
      const getId = readlineSync.question("Enter id: ");
      let objectStone = Board.stonesOnBoard.find((objs) => objs.id == getId);
      const dir = this.getDirection(
        objectStone.row,
        objectStone.col,
        objectStone.steps,
       "♞"
      );
       
    return this.movePiece(
      board,
      objectStone.stone,
      objectStone,
      objectStone.row,
      objectStone.col,
      dir,
      steps
    );

    }
    if(player=="p2"){
      const bestMoves = this.selectBestMove(steps,board);
      if(bestMoves.length != 0){
        console.log( "Best moveeeeeeeeeeeeeeeeeeeeees",bestMoves)
        let objStone  = bestMoves[0].objStone;
        console.log(objStone)
        const dir = this.getDirection(
          objStone.row,
          objStone.col,
          objStone.steps,
         "♝"
        );
        return this.movePiece(
          board,
          objStone.stone,
          objStone,
          objStone.row,
          objStone.col,
          dir,
          steps
        );
      }
    }
 
  
 


  }
  static moveBara(board) {
    console.log("Bara");
    if (Board.player == "p1") {
      let getPossibleActions = this.getPossibleActions(board, "♞", 12);
      if (getPossibleActions == 0) {
        console.log("Player 1, no available moves.");
        return board;
      } else {
        return this.playerMove(board, 12, "p1");
      }
    }
    if (Board.player == "p2") {
      let getPossibleActions = this.getPossibleActions(board, "♝", 12);
      if (getPossibleActions == 0) {
        console.log("Player 2, no available moves.");
        return board;
      } else {
        return this.playerMove(board, 12, "p2");
      }
    }
  }
  static moveSecond(board) {
    console.log("Second ");
    if (Board.player == "p1") {
      let getPossibleActions = this.getPossibleActions(board, "♞", 2);
      if (getPossibleActions == 0) {
        console.log("Player 1, no available moves.");
        return board;
      } else {
        return this.playerMove(board, 2, "p1");
      }
    }
    if (Board.player == "p2") {
      let getPossibleActions = this.getPossibleActions(board, "♝", 2);
      if (getPossibleActions == 0) {
        console.log("Player 2, no available moves.");
        return board;
      } else {
        return this.playerMove(board, 2, "p2");
      }
    }
  }
  static moveThird(board) {
    console.log("Third");
    if (Board.player == "p1") {
      let getPossibleActions = this.getPossibleActions(board, "♞", 3);
      if (getPossibleActions == 0) {
        console.log("Player 1, no available moves.");
        return board;
      } else {
        return this.playerMove(board, 3, "p1");
      }
    }
    if (Board.player == "p2") {
      let getPossibleActions = this.getPossibleActions(board, "♝", 3);
      if (getPossibleActions == 0) {
        console.log("Player 2, no available moves.");
        return board;
      } else {
        return this.playerMove(board, 3, "p2");
      }
    }
  }
  static moveFourth(board) {
    console.log("Fourth");
    if (Board.player == "p1") {
      let getPossibleActions = this.getPossibleActions(board, "♞", 4);
      if (getPossibleActions == 0) {
        console.log("Player 1, no available moves.");
        return board;
      } else {
        return this.playerMove(board, 4, "p1");
      }
    }
    if (Board.player == "p2") {
      let getPossibleActions = this.getPossibleActions(board, "♝", 4);
      if (getPossibleActions == 0) {
        console.log("Player 2, no available moves.");
        return board;
      } else {
        return this.playerMove(board, 4, "p2");
      }
    }
  }

  static movePiece(
    board,
    stone,
    objectStone,
    initialRow,
    initialCol,
    direction,
    steps
  ) {
    const copyBoard = this.deepcopy(board);
    console.log("directeionnnnnnnnnnnnnn",direction)
    for (let i = 0; i < steps; i++) {
      let row = initialRow;
      let col = initialCol;

      switch (direction) {
        case "up":
          row--;
          break;
        case "left":
          col--;
          break;
        case "down":
          row++;
          break;
        case "right":
          col++;
          break;
      }
      if (row < 0 && copyBoard[0][col - 1] == "□") {
        row = 0;
        col--;
        direction = "down";
      }
      if (row == 0 && copyBoard[0][col - 1] == " ") {
        direction = "down";
      }
      if (
        0 <= row <= 7 &&
        col == 9 &&
        objectStone.steps + steps >= 75 &&
        stone == "♝"
      ) {
        direction = "down";
      }
      if (
        row == 0 &&
        copyBoard[0][col - 1] == "□" &&
        initialRow == 0 &&
        initialCol == 10 &&
        stone == "♝"
      ) {
        direction = "down";
      }
      if (row == 0 && copyBoard[0][col - 1] == "□" && stone == "♞") {
        direction = "left";
      }
      if (
        row < 18 &&
        row > 7 &&
        copyBoard[row][col] == "-" &&
        row != 10 &&
        col != 10
      ) {
        col--;
        direction = "left";
      }
      if (col < 0) {
        col = 0;
        row++;
        direction = "down";
      }
      if (row < 18 && row > 10 && copyBoard[row + 1][col] == " ") {
        row--;
        col++;

        direction = "right";
      }
      if (row == 10 && copyBoard[row][col] == "-" && col != 10) {
        row++;
        direction = "down";
      }

      if (row > 18 && copyBoard[18][col + 1] == "□") {
        row = 18;
        col++;
        direction = "right";
      }

      if (row == 18 && copyBoard[row][col] == " ") {
        col--;
        row--;
        direction = "up";
      }

      if (row == 10 && copyBoard[row][col] == "-" && col == 10) {
        col++;
        direction = "right";
      }
      if (row == 10 && col > 18) {
        col--;
        row--;
        direction = "up";
      }

      if (row == 7 && col == 18) {
        row++;
        col--;
        direction = "left";
      }
      if (row == 8 && col == 10 && copyBoard[row][col] == "-") {
        row--;
        direction = "up";
      }

      if (row == 18 && col == 8) {
        direction = "right";
      }
      if (row == 18 && col == 9 && stone == "♝") { ///djjdjddj
        direction = "right";
      }

      if (
        objectStone.steps+steps >= 75 &&
        col == 9 &&
        10 < row <= 18 &&
        stone == "♞"
      ) {
        col = 9;
        //  row--;
        direction = "up";
      }else   if (
        row >= 18 &&
        copyBoard[18][col + 1] == "□" &&
        initialRow == 18 &&
        initialCol == 8 &&
        stone == "♞"
      ) {
        // row = 18;
        col = 9;
        direction = "up";
      }

      initialRow = row;
      initialCol = col;
      if (i == steps - 1) {
        let obj = Board.stonesOnBoard.find(
          (objs) => objs.id === objectStone.id
        );
        if (obj) {
          obj.row = row;
          obj.col = col;
          obj.steps = obj.steps + steps;
        }
      }
    }
    return this.nextBoard(objectStone);
  }
  static nextBoard(objectStone) {
    const previousObj = JSON.parse(JSON.stringify(objectStone));
    const copyBoard = this.deepcopy(Board.getBoard());

    for (let j = 0; j < Board.stonesOnBoard.length; j++) {
      let obj = Board.stonesOnBoard[j];
      if (previousObj.stone == "♞") {
        if (
          obj.stone == "♝" &&
          obj.row == previousObj.row &&
          obj.col == previousObj.col
        ) {
          console.log("KIll state ", "♞♞♞♞♞♞♞♞♞♞♞♞♞♞");

          copyBoard[previousObj.row][previousObj.col] = previousObj.stone;

          let index = Board.stonesOnBoard.findIndex(
            (objs) => objs.id === obj.id
          );
          Board.stonesOnBoard.splice(index, 1);
          Board.player2.push(obj);
        } else {
          let prev = copyBoard[obj.row][obj.col];
          if (prev == "X") {
            copyBoard[obj.row][obj.col] = `X${obj.stone}`;
          } else if (/^X♞+$/.test(prev)) {
            prev = prev.slice(1);
            copyBoard[obj.row][obj.col] = `X${prev}${obj.stone}`;
          } else if (/^♞+$/.test(prev)) {
            copyBoard[obj.row][obj.col] = `${prev}${obj.stone}`;
          } else if (/^X♝+$/.test(prev)) {
            prev = prev.slice(1);
            copyBoard[obj.row][obj.col] = `X${prev}${obj.stone}`;
          } else if (/^♝+$/.test(prev)) {
            copyBoard[obj.row][obj.col] = `${prev}${obj.stone}`;
          } else if (prev == "□") {
            copyBoard[obj.row][obj.col] = obj.stone;
          }
        }
      } else if (previousObj.stone == "♝") {
      
         if (
          obj.stone == "♞" &&
          obj.row == previousObj.row &&
          obj.col == previousObj.col
        ) {
          console.log("KIll stateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  ♞♞♞♞♞♞♞♞");
          copyBoard[previousObj.row][previousObj.col] = previousObj.stone;

          let index = Board.stonesOnBoard.findIndex(
            (objs) => objs.id === obj.id
          );
          Board.player1.push(obj);
          Board.stonesOnBoard.splice(index, 1);
        } else {
          let prev = copyBoard[obj.row][obj.col];
          if (prev == "X") {
            copyBoard[obj.row][obj.col] = `X${obj.stone}`;
          } else if (/^X♞+$/.test(prev)) {
            copyBoard[obj.row][obj.col] = `X${prev}${obj.stone}`;
          } else if (/^♞+$/.test(prev)) {
            copyBoard[obj.row][obj.col] = `${prev}${obj.stone}`;
          } else if (/^X♝+$/.test(prev)) {
            copyBoard[obj.row][obj.col] = `X${prev}${obj.stone}`;
          } else if (/^♝+$/.test(prev)) {
            copyBoard[obj.row][obj.col] = `${prev}${obj.stone}`;
          } else if (prev == "□") {
            copyBoard[obj.row][obj.col] = obj.stone;
          }
        }
      } 
    }

    for(let k =0 ;k<Board.stonesOnBoard.length;k++){
      let object = Board.stonesOnBoard[k];
      if(object.steps === 82){
         Board.kitchen.push(object);
         let index = Board.stonesOnBoard.findIndex(
          (objs) => objs.id === object.id
          );
          Board.stonesOnBoard.splice(index, 1);  
        if(object.stone=="♝"){ 
          let finalCell =  this.removeOneCharacter(JSON.parse(JSON.stringify(copyBoard[7][9])),"♝")
          finalCell= finalCell==""?"□":finalCell;
          copyBoard[7][9]=finalCell;
        }else if(object.stone=="♞"){
          let finalCell =  this.removeOneCharacter(JSON.parse(JSON.stringify(copyBoard[11][9])),"♞")
          finalCell= finalCell==""?"□":finalCell;
          copyBoard[11][9]=finalCell;
        }
      }
    }
    return copyBoard;
  }
  static removeOneCharacter(str, charToRemove) {
    const regex = new RegExp(charToRemove);
    return str.replace(regex, '');
  }

  static deepcopy(state) { // Structure class
    let newBoard = JSON.parse(JSON.stringify(state));
    return newBoard;
  }

  static getPossibleActions(board, stone, steps) {
    let possibleActions = [];
    let actions = [];
    let stonesOnBoard = Board.stonesOnBoard;
    for (let i = 0; i < stonesOnBoard.length; i++) {
      if (stonesOnBoard[i].stone == stone) {
        possibleActions.push(stonesOnBoard[i]);
      }
    }
    if (possibleActions.length == 0) {
      return possibleActions;
    }
    for (let j = 0; j < possibleActions.length; j++) {
      let action = possibleActions[j];
      let {cell,stn} =this.getContentAndPosition(
        board,
        action.stone,
        action,
        action.row,
        action.col,
        this.getDirection(action.row, action.col,action.steps, action.stone),
        steps,
      )
      if (
        action.steps + steps <= 82 &&
        this.canMove(cell,stn)
      ) {
        actions.push(action);
      }
    }
    return actions;
  }



  static getDirection(row, col, steps, stone) {
    let direction = "";
  
    if (row < 8 && col == 9 && steps < 50) {
      direction = "up";
    } else if (row < 8 && col == 9 && steps > 50 && stone == "♝") {
      direction = "down";
    } else if (row < 8 && col == 8) {
      direction = "down";
    } else if (17 > row && row > 10 && col == 9) {
      direction = "down";
    } else if (row == 8 && col < 8) {
      direction = "left";
    } else if ((row == 8 || row == 9) && col == 0) {
      direction = "down";
    } else if (row == 10 && col < 8) {
      direction = "right";
    } else if (10 < row && row < 18 && col == 8) {
      direction = "down";
    } else if (10 < row && row < 18 && col == 10) {
      direction = "up";
    } else if (row == 18 && col == 9) {
      if (stone == "♞" && steps > 50) {
        direction = "up";
      } else if (stone == "♞" && steps < 50) {
        direction = "right";
      }
    } else if (row == 10 && 10 < col && col < 18) {
      direction = "right";
    } else if (8 < row && row < 11 && col == 18) {
      direction = "up";
    } else if (row == 8 && col == 18) {
      direction = "left";
    } else if (row == 8 && 10 < col && col < 18) {
      direction = "left";
    } else if (0 < row && row <= 7 && col == 10) {
      direction = "up";
    } else if (row == 18 && col < 10) {
      direction = "right";
    } else {
      direction = `unknown ${row}${col}`;
    }
  
    return direction;
  }

 static selectBestMove(steps,board){
  let moves = [];
  let possibleActions = this.getPossibleActions(board,"♝",steps);
  let copyBoard = this.deepcopy(board)
  console.log(possibleActions)
  if(possibleActions.length==0){
    return possibleActions;
  }
  for(let i =0 ; i< possibleActions.length ; i++){
    let  objStone = possibleActions[i];
    let {row,col,cell,stn} =this.getContentAndPosition(
      copyBoard,
      objStone.stone,
      objStone,
      objStone.row,
      objStone.col,
      this.getDirection(objStone.row, objStone.col,objStone.steps, objStone.stone),
      steps,
    )
    if(/^♞+$/.test(cell) && stn =='♝'){
      moves.push({priority:1,objStone})
    }
   else  if(class ObjectStone {
  constructor(id,stone, steps, row, col) {
    this.id = id;
    this.stone = stone;
    this.steps = steps;
    this.row = row;
    this.col = col;
  }
}

class Board {
  static player = "p1";
  static stonesOnBoard=[];
  static player1 = [
    new   ObjectStone(1,"♞", 0, 11, 9),
    new   ObjectStone(2,"♞", 0, 11, 9),
    new   ObjectStone(3,"♞", 0, 11, 9),
    new   ObjectStone(4,'♞', 0, 11, 9)
  ];
  static player2 = [
    new  ObjectStone(6,"♝", 0, 7, 9),
    new  ObjectStone(7,"♝", 0, 7, 9),
    new  ObjectStone(8,"♝", 0, 7, 9),
    new  ObjectStone(9,"♝", 0, 7, 9),
];
  static kitchen = [];
  static board = [];
  static getBoard() {
    // ['□'],
    for (let i = 0; i < 19; i++) {
      this.board[i] = [];
      for (let j = 0; j < 19; j++) {
        if (j > 7 && j < 11 && (i < 8 || i >= 11)) this.board[i][j] = "□";
        else {
          if (i > 7 && i <= 10 && (j < 8 || j > 10)) this.board[i][j] = "□";
          else if (i >= 8 && i < 11 && j >= 8 && j < 11) this.board[i][j] = "-";
          else this.board[i][j] = " ";
        }

        if ((j == 2 && i == 8) || (j == 2 && i == 10)) this.board[i][j] = "X";
        if ((j == 16 && i == 8) || (j == 16 && i == 10)) this.board[i][j] = "X";

        if ((j == 8 && i == 2) || (j == 10 && i == 2)) this.board[i][j] = "X";

        if ((j == 8 && i == 16) || (j == 10 && i == 16)) this.board[i][j] = "X";
      }
    }
    return this.board;
  }

  static print(board) {
    console.log('Player 1 Stones: ', this.player1.map(objs => objs.stone).join(" "));
    console.log('Player 2 Stones: ', this.player2.map(objs => objs.stone).join(" "));
    console.log(" -------- -------- -------- --------");
    console.log(`Kitchen  :    ${ this.kitchen.map(objs => objs.stone).join("  ")} `);

    for (let i = 0; i < board.length; i++) {
      console.log(board[i].join(" "));
    }
  }
}


module.exports = Board;
/^X♝*$/.test(cell) && stn =='♝'){
      moves.push({priority:2,objStone})
    }
    else  if(0 <= row <= 7 && col == 9 && objStone.steps+steps ==82){
      moves.push({priority:3,objStone})
    }
  }
  if(moves.length==0){
    let objStone = possibleActions.reduce((max, stone) => max.steps > stone.steps ? max : stone);
    moves.push({ priority:4,objStone})
  }

  return moves;
 }

  static canMove(cell,stone){
        // console.log("copybaord",copyBoard[row][col],row,col);
        if(/^X♞+$/.test(cell)&&stone=='♝'){
          // console.log("falseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ,♝♝♝♝♝♝♝♝♝♝♝♝♝♝")
          return false ;
        }
         if(/^X♝+$/.test(cell)&&stone=='♞'){
          // console.log("falseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee ,♞♞♞♞♞♞♞♞♞♞♞♞♞♞♞")
          return false 
        }
      return true;  
  
  }
  static getContentAndPosition(
    board,
    stone,
    objectStone,
    initialRow,
    initialCol,
    direction,
    steps,
  ) {
    console.log("getContentAndPosition",initialRow,initialCol)
    const copyBoard = this.deepcopy(board);
      let objectSt = JSON.parse(JSON.stringify(objectStone)) ;
      if(steps==0){
        let row=initialRow;
        let col = initialCol;
        let cell = copyBoard[row][col];
        let stn = stone;
        return {row,col,cell,stn};
      }
    for (let i = 0; i < steps; i++) {
      let row = initialRow;
      let col = initialCol;
    
      switch (direction) {
        case "up":
          row--;
          break;
        case "left":
          col--;
          break;
        case "down":
          row++;
          break;
        case "right":
          col++;
          break;
      }
      if (row < 0 && copyBoard[0][col - 1] == "□") {
        row = 0;
        col--;
        direction = "down";
      }
      if (row == 0 && copyBoard[0][col - 1] == " ") {
        direction = "down";
      }
      if (
        1<= row <= 7 &&
        col == 9 &&
        objectSt.steps +steps >= 75 &&
        stone == "♝"
      ) {
        direction = "down";
      }
       if (
        row == 0 &&
        copyBoard[0][col - 1] == "□" &&
        initialRow == 0 &&
        initialCol == 10 &&
        stone == "♝"
      ) {
        direction = "down";
      }
      if (row == 0 && copyBoard[0][col - 1] == "□" && stone == "♞") {
        direction = "left";
      }
      if (
        row < 18 &&
        row > 7 &&
        copyBoard[row][col] == "-" &&
        row != 10 &&
        col != 10
      ) {
        col--;
        direction = "left";
      }
      if (col < 0) {
        col = 0;
        row++;
        direction = "down";
      }
      if (row < 18 && row > 10 && copyBoard[row + 1][col] == " ") {
        row--;
        col++;

        direction = "right";
      }
      if (row == 10 && copyBoard[row][col] == "-" && col != 10) {
        row++;
        direction = "down";
      }

      if (row > 18 && copyBoard[18][col + 1] == "□") {
        row = 18;
        col++;
        direction = "right";
      }

      if (row == 18 && copyBoard[row][col] == " ") {
        col--;
        row--;
        direction = "up";
      }

      if (row == 10 && copyBoard[row][col] == "-" && col == 10) {
        col++;
        direction = "right";
      }
      if (row == 10 && col > 18) {
        col--;
        row--;
        direction = "up";
      }

      if (row == 7 && col == 18) {
        row++;
        col--;
        direction = "left";
      }
      if (row == 8 && col == 10 && copyBoard[row][col] == "-") {
        row--;
        direction = "up";
      }

      if (row == 18 && col == 8) {
        direction = "right";
      }
      if (row == 18 && col == 9 && stone != "♞") {
        direction = "right";
      }
      if (
        objectSt.steps+steps >= 75 &&
        col == 9 &&
        10 < row <= 18 &&
        stone == "♞"
      ) {
        col = 9;
        //  row--;
        direction = "up";
      } else if (
        row >= 18 &&
        copyBoard[18][col + 1] == "□" &&
        initialRow == 18 &&
        initialCol == 8 &&
        stone == "♞"
      ) {
        row = 18;
        col = 9;
        direction = "up";
      }
      if(i == steps-1 ){
        let cell = copyBoard[row][col];
        let stn = stone;
        return {row,col,cell,stn};
      }
    
      initialRow = row;
      initialCol = col;
     
    }
  }
};


