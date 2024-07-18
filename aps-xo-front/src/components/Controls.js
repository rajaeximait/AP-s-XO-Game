import React from 'react';

function Controls({ startGame, resetGame, startStatus, resetStatus }) {
  return (
    <div className="controls">
      <button onClick={startGame} disabled={!startStatus}>Start</button>
      <button onClick={resetGame} disabled={!resetStatus}>Reset</button>
    </div>
  );
}

export default Controls;
