

const MovesCheck = require('./src/structure/movesCheck')
const Board = require('./src/structure/board');

function move(){
    const board = Board.getBoard(); 
    Board.print(board);;

    // Board.stonesOnBoard.push(JSON.parse(JSON.stringify(Board.player1[0])))
    // Board.stonesOnBoard.push(JSON.parse(JSON.stringify(Board.player2[0])));
    // console.log(Board.innerBoard)

    // let obj = Board.player1[0];
    // let obj2 = Board.player1[1];

    let obj = Board.player2[2];
    let obj3 = Board.player2[3];

    // Board.player1.splice(0, 1);
    // Board.player1.splice(1, 1);
    // Board.player1.splice(2, 1);
    

    Board.stonesOnBoard.push(obj);
    Board.stonesOnBoard.push(obj3);
    // Board.stonesOnBoard.push(obj2);
    // Board.stonesOnBoard.push(obj3);
    // Board.stonesOnBoard.push(obj5);


   

    // console.log(Board.player1,"player1")
    // console.log(Board.stonesOnBoard,"stones on board ");

//     let obj =  Board.stonesOnBoard[0];
//     let objplaye2 = Board.stonesOnBoard[1];
  //  obj.steps=76;
  //  obj.row=17;
  //  obj.col=9;
    //  obj.steps=65;
      // obj.row=2;
      // obj.col=9;


   const newboard=MovesCheck.movePiece(board,obj.stone,obj,obj.row,obj.col,"up",60);
  //  const newboard2=MovesCheck.movePiece(newboard,obj4.stone,obj4,obj4.row,obj4.col,"up",8);
   const newboard3=MovesCheck.movePiece(newboard,obj3.stone,obj3,obj3.row,obj3.col,"up",4);
//    const newboard22=MovesCheck.movePiece(newboard3,obj4.stone,obj4,obj4.row,obj4.col,"up",0);
    // let postt=MovesCheck.getPossibleActions(newboard2,"♝",2);

    Board.player="p2";
    Board.print(newboard)
    Board.print(newboard3)
    let move = MovesCheck.moveShaka(newboard3)
  Board.print(move)

//    const newboard2=MovesCheck.movePiece(newboard,obj.stone,obj,obj.row,obj.col,"left",47);
//    const newboard3=MovesCheck.movePiece(newboard2,obj.stone,obj,obj.row,obj.col,MovesCheck.getDirection(obj.row,obj.col,obj.stone),4);
//    const newboard4 = MovesCheck.movePiece(newboard2,objplaye2.stone,objplaye2,objplaye2.row,objplaye2.col,"up",20);
//    const newboard5 = MovesCheck.movePiece(newboard4,objplaye2.stone,objplaye2,objplaye2.row,objplaye2.col,"left",10);
    // const newboard2=MovesCheck.movePiece(newboard,16,10,"up",0,"♞");
    // const newboard3=MovesCheck.movePiece(newboard2,obj.stone,obj,obj.row,obj.col,"right",11);

    // const newboard3=MovesCheck.movePiece(newboard2,16,10,"up",1,"♞");
    // const newboard3=MovesCheck.movePiece(newboard2,11,9,"down",9,"♞");
    // const data = MovesCheck.getContentAtPosition(newboard2,17,10,"up",1);
    // const data2 = MovesCheck.getContentAtPosition(newboard2,1,8,"down",1);
    // console.log(data);
    // console.log(data2);
    // const newboard4=MovesCheck.movePiece(newboard2,2,8,"down",7,"♝");


    // Board.print(move);
    // console.log("besstttttttttttttttttttttt",best)
    // Board.print(newboard2);
    // Board.print(newboard3);
    // Board.print(newboard22);
    // console.log()
    // Board.print(newboard4);
    // Board.print(newboard2);
    // Board.print(newboard5);
  //  console.log("Actionssssssssssssssssss",postt)
    // console.log("Ineeeeeeeeeeeeeeeeeeeeeeeeeer",Board.stonesOnBoard)
    // console.log(Board.player1,"player1")
    // Board.print(newboard4);
    // Board.print(newboard6);
  //  const data =MovesCheck.getPossibleActions(newboard,"♞");
//    console.log(data);
//    let res= MovesCheck.canMove(newboard,data[0].i,data[0].j,"up",5,"♞");
    // console.log("res: " + res);
//    for(let  j = 0; j < data.length; j++){
//     let res= MovesCheck.canMove(newboard,data[0].i,data[0].j,dir[j],steps[j],"♝");
//     console.log("res: " + res);
//    }
   
    //  const newboard2=MovesCheck.movePiece(newboard,3,7,"down",10,"♝");
    //  Board.print(newboard);
}
function removeOneCharacter(str, charToRemove) {
  const regex = new RegExp(charToRemove);
  return str.replace(regex, '');
}
// let copyBoard =[["♝♝♝"],["♝♝♝"]]

move();
// let j = removeOneCharacter("♞♞♞♞","♞");
// console.log(j);




/*   static addStonesToBoard(objectStone) {
    const previousObj =JSON.parse(JSON.stringify(objectStone));
    const copyBoard = this.deepcopy(Board.getBoard());
    for(let j = 0; j < Board.stonesOnBoard.length; j++) {
      let obj = Board.stonesOnBoard[j];
      let prev =copyBoard[obj.row][obj.col];
      console.log(prev)
     if(obj.row == previousObj.row  && obj.col == previousObj.col && obj.id == previousObj.id&&obj.stone ==previousObj.stone ){
       if(prev=="X"){
        copyBoard[obj.row][obj.col] =`X${obj.stone}`;
      }
      else if (/^X♞+$/.test(prev)) {
        copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;
       }
     else  if(/^♞+$/.test(prev))
      {
       copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;
      }
      else if (/^X♝+$/.test(prev)) {
        copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;
        } 
      else if(/^♝+$/.test(prev))
       {
         copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;       
       }
       else if(prev=='□'){
        copyBoard[obj.row][obj.col] =obj.stone;
      }
     }
     if(obj.row == previousObj.row  && obj.col == previousObj.col && obj.id !=previousObj.id && obj.stone ==previousObj.stone ){ 
      if(prev=="X"){
        copyBoard[obj.row][obj.col] =`X${obj.stone}`;
      } else if (/^X♞+$/.test(prev)) {
        copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;
       }
       else if(/^♞+$/.test(prev))
        {
         copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;
        }
        else if (/^X♝+$/.test(prev)) {
          copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;
          } 
        else if(/^♝+$/.test(prev))
       {
         copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;       
       } 
        else if(prev=='□'){
          copyBoard[obj.row][obj.col] =obj.stone;}
    } 
    if(obj.id !=previousObj.id )
      if(obj.id !=previousObj.id ) {
        if(prev=="X"){
          copyBoard[obj.row][obj.col] =`X${obj.stone}`;
        }
        else if (/^X♞+$/.test(prev)) {
          copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;
         }
       else  if(/^♞+$/.test(prev))
        {
         copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;
        }
        else if (/^X♝+$/.test(prev)) {
          copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;
          } 
        else if(/^♝+$/.test(prev))
       {
         copyBoard[obj.row][obj.col] =`${prev}${obj.stone}`;       
       } 
        else if(prev=='□'){
          copyBoard[obj.row][obj.col] =obj.stone;}
      }
      Board.print(copyBoard);
    }
    return copyBoard;
  } */