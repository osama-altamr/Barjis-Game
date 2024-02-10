class ObjectStone {
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
