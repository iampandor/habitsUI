import React, { useState, useEffect } from 'react';
import './App.css';

const GridButton = ({ row, col, toggleButton, isOn, label }) => {
  const handleClick = () => {
    if (row !== 0 && col !== 0) {
      toggleButton(row, col);
    }
  };

  return (
    <button className={`grid-button ${isOn ? 'on' : 'off'} ${row === 0 || col === 0 ? 'header' : ''}`} onClick={handleClick}>
      {label}
    </button>
  );
};

const App = () => {
  const rows = 7;
  const cols = 8;
  const initialGrid = Array.from({ length: rows }, (_, rowIndex) => {
    return Array.from({ length: cols }, (_, colIndex) => {
      return rowIndex === 0 || colIndex === 0 ? null : false;
    });
  });

  const [grid, setGrid] = useState(() => {
    const savedGrid = localStorage.getItem('gridState');
    return savedGrid ? JSON.parse(savedGrid) : initialGrid;
  });

  useEffect(() => {
    localStorage.setItem('gridState', JSON.stringify(grid));
  }, [grid]);

  const toggleButton = (row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((rowArr, i) =>
        rowArr.map((cell, j) => (i === row && j === col ? !cell : cell))
      );
      return newGrid;
    });
  };

  const getButtonLabel = (row, col) => {
    if (row === 0) {
      const days = [
        'Week',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      return days[col];
    } else if (col === 0) {
      return row === 0 ? 'Week' : row.toString();
    } else {
      return grid[row][col] ? 'On' : 'Off';
    }
  };

  return (
    <div className="App">
      <h1>Calendar Grid</h1>
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
                label={getButtonLabel(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
