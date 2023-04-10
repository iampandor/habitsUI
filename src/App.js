import React, { useState, useEffect } from 'react';
import './App.css';

const GridButton = ({ row, col, toggleButton, value, label, color, disabled }) => {
  const handleClick = () => {
    toggleButton(row, col);
  };

  return (
    <button
      className={`grid-button ${row === 0 || col === 0 ? 'header' : ''}`}
      onClick={handleClick}
      style={{ backgroundColor: color }}
      disabled={disabled}
    >
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
        rowIndex === 0 || colIndex === 0 ? null : 0
      )
    )
  );

  const valueToColor = (value) => {
    if (value === null) return ''; // For header cells
    const r = Math.round((1 - value) * 255);
    const g = Math.round(value * 255);
    return `rgb(${r}, ${g}, 0)`;
  };

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

  const getGridStartingDay = () => {
    const startingDays = [7, 4, 1]; // Saturday, Wednesday, Sunday
    return startingDays[currentGridIndex];
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
      const dayNumber = (row - 1) * 7 + col - getGridStartingDay() + 1;
      return dayNumber >= 1 && dayNumber <= 31 ? dayNumber.toString() : '';
    }
  };

  const getGridTitle = () => {
    const gridTitles = ['Habit 1', 'Habit 2', 'Third Habit'];
    return gridTitles[currentGridIndex];
  };
  
  const switchGrid = () => {
    setCurrentGridIndex((prevIndex) => (prevIndex + 1) % gridCount);
  };


  return (
    <div className="App">
      <div className="title-container">
        <h1>{getGridTitle()}</h1>
        <button className="switch-button" onClick={switchGrid}>
          Switch Grid
        </button>
      </div>
      <div className="grid-container">
        {grids[currentGridIndex].map((rowArr, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {rowArr.map((value, colIndex) => (
              <GridButton
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                toggleButton={toggleButton}
                value={value}
                label={getButtonLabel(rowIndex, colIndex)}
                color={valueToColor(value)}
                disabled={rowIndex === 0 || colIndex === 0}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;