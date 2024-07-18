import React from 'react';

function Status({ winner, draw, currentPlayer, startStatus }) {
  return (
    <div className="status">
      {winner && <h2>Player {winner === 'X' ? 'RAJA' : 'ALAGESAN'} wins!</h2>}
      {draw && <h2>Game is drawn!</h2>}
      {startStatus === false && <h2>Current Player: {currentPlayer === 'X' ? 'RAJA' : 'ALAGESAN'}</h2>}
    </div>
  );
}

export default Status;
