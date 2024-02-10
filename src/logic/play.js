
const Structure = require('../structure/structure');
const Board = require('../structure/board');


module.exports= class Play
{
   
    static startGame(){
       const board = Board.getBoard(); 
      Board.print(board);
      Structure.move(board);
   }

}