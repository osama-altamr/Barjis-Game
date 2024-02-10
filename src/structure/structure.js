const MovesCheck = require("../structure/movesCheck");
const Board = require("./board");
const readlineSync = require("readline-sync");

module.exports = class Structure {


  
  static boardSt = this.deepcopy(Board.getBoard());

  static randomTest() {
    const specialValues = [1, 5, 6, 7];
    const randomIndex = Math.floor(Math.random() * specialValues.length);
    return specialValues[randomIndex];
  }

  static move(board) {
    while (true) {
      if (this.isFinal()) {
        console.log("Hats off");
        break;
      }
      if (Board.player == "p1") {
        console.log("Player 1 :");
        let random;
        do {
          random = this.getRandomNumber();
          this.boardSt = this.handleMove(random, this.boardSt);
          Board.print(this.boardSt);
        } while ([1, 5, 6, 7].includes(random));
        Board.player = "p2";
      } else if (Board.player == "p2") {
        console.log("Player 2 :");
        let random;
        do {
          random = this.getRandomNumber();
          this.boardSt = this.handleMove(random, this.boardSt);
          Board.print(this.boardSt);
        } while ([1, 5, 6, 7].includes(random));
        Board.player = "p1";
      }
    }
  }

  static handleMove(random, board) {
    let step;
    let newboardState = [];
    switch (random) {
      case 1:
        step = "dest";
        newboardState = MovesCheck.moveDest(board);
        return newboardState;
      case 2:
        step = "second";
        newboardState = MovesCheck.moveSecond(board);
        return newboardState;
      case 3:
        step = "third";
        newboardState = MovesCheck.moveThird(board);
        return newboardState;

      case 4:
        step = "fourth";
        newboardState = MovesCheck.moveFourth(board);
        return newboardState;

      case 5:
        step = "Pang";
        newboardState = MovesCheck.movePang(board);
        return newboardState;
      case 6:
        step = "shaka";
        newboardState = MovesCheck.moveShaka(board);
        return newboardState;
      case 7:
        step = "bara";
        newboardState = MovesCheck.moveBara(board);
        return newboardState;
      default:
        console.log("Invalid move type");
        return;
    }
  }

  static getRandomNumber() {
    var num = Math.floor(Math.random() * 7) + 1;
    return num;
  }
  static nextState() {}
  static isFinal() {
    const kitchen = Board.kitchen;
    let player1 = 0;
    let player2 = 0;
    for (let kitch of kitchen) {
      if (kitch == "♞") {
        player1++;
      } else if (kitch == "♝") {
        player2++;
      } else {
      }
    }
    if (player1 == 4 || player2 == 4) {
      console.log("Holy moly, Voila your stones are cooked  :)");
      return true;
    }
    return false;
  }
  static deepcopy(state) {
    // Structure class
    // this.boardSt=[];
    let newBoard = JSON.parse(JSON.stringify(state));
    return newBoard;
  }
};
