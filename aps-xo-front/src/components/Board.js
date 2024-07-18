import React from 'react';
import Cell from './Cell';

function Board({ gameState, handleCellClick }) {
  return (
    <div className="board">
      {gameState.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} value={cell} onClick={() => handleCellClick(rowIndex, colIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
