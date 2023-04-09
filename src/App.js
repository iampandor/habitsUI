import React, { useState, useEffect } from 'react';
import './App.css';

const GridButton = ({ row, col, toggleButton, isOn, label }) => {
  const handleClick = () => {
    toggleButton(row, col);
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
  const gridCount = 3;
  const initialGrid = Array.from({ length: gridCount }, () =>
    Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) =>
        rowIndex === 0 || colIndex === 0 ? null : false
      )
    )
  );

  const [grids, setGrids] = useState(() => {
    const savedGrids = localStorage.getItem('gridStates');
    return savedGrids ? JSON.parse(savedGrids) : initialGrid;
  });

  const [currentGridIndex, setCurrentGridIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('gridStates', JSON.stringify(grids));
  }, [grids]);

  const toggleButton = (row, col) => {
    if (row === 0 && col === 0) {
      setCurrentGridIndex((currentGridIndex + 1) % gridCount);
    } else {
      setGrids((prevGrids) => {
        const newGrids = prevGrids.map((grid, gridIndex) =>
          gridIndex === currentGridIndex
            ? grid.map((rowArr, i) =>
                rowArr.map((cell, j) => (i === row && j === col ? !cell : cell))
              )
            : grid
        );
        return newGrids;
      });
    }
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
      return grids[currentGridIndex][row][col] ? 'On' : 'Off';
    }
  };

  const getGridTitle = () => {
    const gridTitles = ['Habit 1', 'Habit 2', 'Third Habit'];
    return gridTitles[currentGridIndex];
  };

  return (
    <div className="App">
      <h1>{getGridTitle()}</h1>
      <div className="grid-container">
        {grids[currentGridIndex].map((rowArr, rowIndex) => (
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