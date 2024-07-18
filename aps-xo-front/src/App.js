import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [gameState, setGameState] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [startStatus, setStartStatus] = useState(true);
  const [resetStatus, setResetStatus] = useState(false);

  const startGame = () => {
    axios.get('http://localhost:3001/api/start')
      .then(response => {
        setGameState(response.data.gameState);
        setCurrentPlayer(response.data.currentPlayer);
        setWinner(null);
        setDraw(false);
        setStartStatus(false);
        setResetStatus(true);
      });
  }

  const resetGame = () => {
    startGame();
  }

  const handleCellClick = (row, col) => {
    if (gameState[row][col] === "" && !winner && !draw && !startStatus) {
      axios.post('http://localhost:3001/api/move', { row, col })
        .then(response => {
          if (response.data.winner) {
            setWinner(response.data.winner);
            setStartStatus(true);
            setResetStatus(false);
          }
          else if (response.data.draw) {
            setDraw(true);
            setStartStatus(true);
            setResetStatus(false);
          }
          setGameState(response.data.gameState);
          setCurrentPlayer(response.data.currentPlayer);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    }
    else{
      alert('Please click start')
    }
  };

  return (
    <div className="App">

      <h1>AP's XO Game</h1>

      <div className="board">
        {gameState.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="cell" onClick={() => handleCellClick(rowIndex, colIndex)}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      {winner && <h2>Player {winner === 'X' ? 'RAJA' : 'ALAGESAN'} wins!</h2>}
      {draw && <h2>Player not wins!</h2>}

      {startStatus === false ? <h2>Current Player: {currentPlayer === 'X' ? 'RAJA' : 'ALAGESAN'}</h2> : ''}
      <br/>
      <button onClick={startGame} disabled={startStatus ? false : true}>Start</button>
      <button onClick={resetGame} disabled={resetStatus ? false : true}>Reset</button>

    </div>
  );
}

export default App;
