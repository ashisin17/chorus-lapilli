import { useState } from 'react';

function Square({value, onSquareClick, isFilled }) {
  const classNames = ['square', isFilled ? 'filled' : '']; // conditionally apply the CSS

  function handleClick() { //passes isFilled to parent function
    onSquareClick(isFilled);
  }

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  let twist;
  twist = 'Wait for twist :)';

  function handleClick(i, isFilled) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();

    if (isFilled) {
      // Handle the click event for a filled square in the Board component
      // For example, you can put your logic here to handle the red highlighting
      console.log(`Clicked a filled square at index ${i}`);
    } 

    if (xIsNext) {
      if(canAddX(nextSquares))
        nextSquares[i] = 'X';
      // else
      //   twist = 'X must move existing piece!';
    } else {
      if(canAddO(nextSquares))
        nextSquares[i] = 'O';
      // else
      //   twist = 'X must move existing piece!';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    if(!canAddX(squares))
      twist = 'X must NEXT move to existing space! Click to highlight which X to move';
    if(!canAddO(squares))
      twist = 'O must NEXT move to existing space! Click to highlight which O to move';
  }

  return (
    <>
      <div className="twist">{twist}</div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} isFilled={squares[0] !== null} onSquareClick={() => handleClick(0, squares[0] !== null)} />
        <Square value={squares[1]} isFilled={squares[1] !== null} onSquareClick={() => handleClick(1, squares[1] !== null)} />
        <Square value={squares[2]} isFilled={squares[2] !== null} onSquareClick={() => handleClick(2, squares[2] !== null)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} isFilled={squares[3] !== null} onSquareClick={() => handleClick(3, squares[3] !== null)} />
        <Square value={squares[4]} isFilled={squares[4] !== null} onSquareClick={() => handleClick(4, squares[4] !== null)} />
        <Square value={squares[5]} isFilled={squares[5] !== null} onSquareClick={() => handleClick(5, squares[5] !== null)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} isFilled={squares[6] !== null} onSquareClick={() => handleClick(6, squares[6] !== null)} />
        <Square value={squares[7]} isFilled={squares[7] !== null} onSquareClick={() => handleClick(7, squares[7] !== null)} />
        <Square value={squares[8]} isFilled={squares[8] !== null} onSquareClick={() => handleClick(8, squares[8] !== null)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function canAddX(squares){
  let count = 0;
  for(let i = 0; i < squares.length; i++) {
    if (squares[i] === 'X')
      count++;
    if(count > 2)
      return false;
  }
  return true;
}

function canAddO(squares){
  let count = 0;
  for(let i = 0; i < squares.length; i++) {
    if (squares[i] === 'O')
      count++;
    if(count > 2)
      return false;
  }
  return true;
}

function move(squares, xIsNext) {

}