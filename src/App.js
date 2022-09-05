import './App.css';
import {useState, useEffect} from 'react'
import Square from './Components/Square';
import {patterns} from './Pattern';
function App() {
  const [board , setBoard] = useState(["","","","","","","","",""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({winner:"none",state:"none"});
  
  useEffect(()=>{
    checkwin();
    checkIfTie();
    if(player == "X"){
      setPlayer("O")
    }
    else{
      setPlayer("X")
    }
  }, [board])

  useEffect(() => {
    if (result.state != "none"){
      alert(`Game Finished! Winning Player: ${result.winner}`);
  
    }
    }, [result]);

  const selectSquare =(square) =>{
    setBoard(
      board.map((val,idx) => {
         if(idx == square && val == ""){
            return player
         }
         return val;
    })
    );

  };

  const checkwin = () => {
    patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) =>{
        if(board[idx] != firstPlayer) {
          foundWinningPattern = false
        }
      })
      if(foundWinningPattern){
        setResult({winner: player, sstate: "won"});
      }
    });
  };

  const checkIfTie = () =>{
    let filled = true;
    board.forEach((square) => {
      if(square == "")
      {
        filled = false
      }
    })
    if(filled) {
      setResult({winner: "No one won", state: "Tie"});
    }
  };
  return (
    <div className="App">
      <div className="board">
        <div className='row'>
          <Square val={board[0]} selectSquare={()=>{selectSquare(0)}} />
          <Square val={board[1]} selectSquare={()=>{selectSquare(1)}} /> 
          <Square val={board[2]} selectSquare={()=>{selectSquare(2)}} />
          {/* val={board[2]} 
          selectSquare={selectSquare}
          // selectSquare={()=>
          // {alert(2);
          // }} 
          /> */}
        </div>
        <div className='row'>
        <Square val={board[3]} selectSquare={()=>{selectSquare(3)}} />
        <Square val={board[4]} selectSquare={()=>{selectSquare(4)}} /> 
        <Square val={board[5]} selectSquare={()=>{selectSquare(5)}} />  
        </div>
        <div className='row'>
        <Square val={board[6]} selectSquare={()=>{selectSquare(6)}} />
        <Square val={board[7]} selectSquare={()=>{selectSquare(7)}} /> 
        <Square val={board[8]} selectSquare={()=>{selectSquare(8)}} />
        </div>     
  </div>
    </div>
  );
}

export default App;
