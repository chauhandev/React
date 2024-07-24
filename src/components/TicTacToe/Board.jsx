import Square from './Square';
import React ,{useState,useEffect} from 'react';


function Board(props) {
    
    const [state, setState] = useState(Array(props.size*props.size).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    useEffect(()=>{
      let isAllSquareMarked =  state.every(val => val !== null);
      if(isAllSquareMarked){
        resetBoard();
      }

    },[state])
    const renderSquare = (i) => {
        return <Square key={i} value={state[i]} onClick={()=> handleClick(i)} />;
      };
    
      const handleClick = (i) => {
        if(state[i] == null){
            const copy = [...state];
            copy[i] =  isXTurn ? "X":"O";

            setState(copy);
            setIsXTurn(!isXTurn);
            checkWin(copy,props.size);
        }
        
      }
      function checkWin(board, size) {
        // Check rows
        for (let row = 0; row < size; row++) {
          let rowStartIndex = row * size;
          if (board[rowStartIndex] && board.slice(rowStartIndex, rowStartIndex + size).every(cell => cell === board[rowStartIndex])) {
            setWinner(board[rowStartIndex]);
            return true;
          }
        }
      
        // Check columns
        for (let col = 0; col < size; col++) {
          let colStartValue = board[col];
          if (colStartValue) {
            let win = true;
            for (let row = 0; row < size; row++) {
              if (board[row * size + col] !== colStartValue) {
                win = false;
                break;
              }
            }
            if (win) {
              setWinner(colStartValue);
              return true;
            }
          }
        }
      
        // Check main diagonal
        let mainDiagStartValue = board[0];
        if (mainDiagStartValue) {
          let win = true;
          for (let i = 0; i < size; i++) {
            if (board[i * size + i] !== mainDiagStartValue) {
              win = false;
              break;
            }
          }
          if (win) {
            setWinner(mainDiagStartValue);
            return true;
          }
        }
      
        // Check anti diagonal
        let antiDiagStartValue = board[size - 1];
        if (antiDiagStartValue) {
          let win = true;
          for (let i = 0; i < size; i++) {
            if (board[i * size + (size - 1 - i)] !== antiDiagStartValue) {
              win = false;
              break;
            }
          }
          if (win) {
            setWinner(antiDiagStartValue);
            return true;
          }
        }
      
        // No win found
        return false;
      }

    const renderBoard = () => {
        let board = [];
        let count = 0;
        for (let i = 0; i < props.size; i++) {
          let row = [];
          for (let j = 0; j < props.size; j++) {
            row.push(renderSquare(count++));
          }
          board.push(
            <div key={i} className="flex flex-row items-center justify-center ">
              {row}
            </div>
          );
        }
        return board;
      };

      const resetBoard = () => {
        setState(Array(props.size * props.size).fill(null));
        setIsXTurn(true);
        setWinner(null);
      };
    
      return (
        <>
          <div className="board-container text-3xl font-bold">
            {winner ? (
              <h1 className="flex items-center justify-center h-full text-green-500 mb-4">Winner is {winner}</h1>
            ) : (
              <>
                <h1 className="flex items-center justify-center h-full">{isXTurn ? 'X' : 'O'}'s turn</h1>
                {renderBoard()}
              </>
            )}
          </div>
          {winner && (
            <div className="flex items-center justify-center h-full">
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={resetBoard}
              >
                Play Again
              </button>
            </div>
           
          )}
        </>
      );
      
      
  }
  
  export default Board
  