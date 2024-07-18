import React, { useState } from 'react';
import Board from './components/Board';
import Status from './components/Status';
import Controls from './components/Controls';
import { startGameApi, makeMoveApi } from './services/gameApi';
import './App.css';

function App() {

  const [gameState, setGameState] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [startStatus, setStartStatus] = useState(true);
  const [resetStatus, setResetStatus] = useState(false);

  const startGame = () => {
    startGameApi()
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
      makeMoveApi(row, col)
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

      <Board gameState={gameState} handleCellClick={handleCellClick} />
      <Status winner={winner} draw={draw} currentPlayer={currentPlayer} startStatus={startStatus} />
      <Controls startGame={startGame} resetGame={resetGame} startStatus={startStatus} resetStatus={resetStatus} />

    </div>
  );
}

export default App;
