import React, { useState } from 'react';
import './App.css';

const GridButton = ({ row, col, toggleButton, isOn }) => {
  const handleClick = () => {
    toggleButton(row, col);
  };

  return (
    <button className={`grid-button ${isOn ? 'on' : 'off'}`} onClick={handleClick}>
      {isOn ? 'On' : 'Off'}
    </button>
  );
};

const App = () => {
  const rows = 7;
  const cols = 8;
  const initialGrid = Array.from({ length: rows }, () => Array(cols).fill(false));

  const [grid, setGrid] = useState(initialGrid);

  const toggleButton = (row, col) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map((rowArr, i) => rowArr.map((cell, j) => (i === row && j === col) ? !cell : cell));
      return newGrid;
    });
  };

  return (
    <div className="App">
      <h1>7x8 Grid of Buttons</h1>
      <div className="grid-container">
        {grid.map((rowArr, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {rowArr.map((isOn, colIndex) => (
              <GridButton
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                toggleButton={toggleButton}
                isOn={isOn}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
