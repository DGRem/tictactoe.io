import React, { useState, useEffect } from 'react';
import './game.css'; // Assuming the CSS file for styling
import circleImage from '../assets/circle.png'; // Import the circle image
import crossImage from '../assets/cross.png'; // Import the cross image

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [player1, setPlayer1] = useState({ name: 'Player 1', score: 0 });
  const [player2, setPlayer2] = useState({ name: 'Player 2', score: 0 });
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = squares => {
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(winLines[i]);
        return squares[a];
      }
    }
    return null;
  };

  const handleWin = (result) => {
    if (result === 'Draw') {
      setPlayer1({ ...player1, score: player1.score + 1 });
      setPlayer2({ ...player2, score: player2.score + 1 });
    } else if (result === 'X') {
      setPlayer1({ ...player1, score: player1.score + 1 });
    } else if (result === 'O') {
      setPlayer2({ ...player2, score: player2.score + 1 });
    }
  };

  const handleClick = index => {
    if (winner || board[index]) return;

    const squares = [...board];
    squares[index] = xIsNext ? 'X' : 'O';
    setBoard(squares);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result);
      handleWin(result);
    } else if (!board.includes(null)) {
      setWinner('Draw');
      handleWin('Draw');
    }
  }, [board]);

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setWinningLine([]);
    setXIsNext(true);
    setPlayer1({ ...player1, score: 0 }); // Reset Player 1 score to 0
    setPlayer2({ ...player2, score: 0 }); // Reset Player 2 score to 0
  };

  const nextGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setWinningLine([]);
    setXIsNext(true);
  };

  const renderSquare = index => {
    const isWinningSquare = winningLine.includes(index);
    return (
      <button
        className={`square ${isWinningSquare ? 'winningSquare' : ''}`}
        onClick={() => handleClick(index)}
      >
        {board[index] === 'X' && <img src={crossImage} alt="X" />}
        {board[index] === 'O' && <img src={circleImage} alt="O" />}
      </button>
    );
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className='board-container'>
        <div className="board">
          {board.map((square, index) => (
            <div key={index} className="boxes">
              {renderSquare(index)}
            </div>
          ))}
        </div>
      </div> 
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? player1.name : player2.name}`}
      </div>
      <div className="score">
        <div>
          {player1.name}: {player1.score} {player1.score === 1 ? 'win' : 'wins'}
        </div>
        <div>
          {player2.name}: {player2.score} {player2.score === 1 ? 'win' : 'wins'}
        </div>
      </div>
      <div className="button-container">
        <button className="button" onClick={resetGame}>
          Reset Game
        </button>
        <button className="button" onClick={nextGame}>
          Next Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
