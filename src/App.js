import React, { useState, useEffect } from 'react';
import GridButton from './GridButton';
import { valueToColor, getButtonLabel } from './utils';
import './App.css';

const App = () => {
  const rows = 7;
  const cols = 8;
  const gridCount = 4;
  const habitGrids = Array.from({ length: gridCount }, () =>
    Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) =>
        rowIndex === 0 || colIndex === 0 ? null : Math.random()
      )
    )
  );

  const summaryGrid = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) =>
      rowIndex === 0 || colIndex === 0
        ? null
        : habitGrids.reduce((acc, grid) => acc + grid[rowIndex][colIndex], 0) / gridCount
    )
  );

  const initialGrid = [...habitGrids];

  const useLocalStorageState = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  };

  const [grids, setGrids] = useLocalStorageState("gridStates", initialGrid);
  const [gridTitles, setGridTitles] = useLocalStorageState("gridTitles", [
    "Habit 1",
    "Habit 2",
    "Third Habit",
    "Summary",
  ]);

  const calculateSummaryGrid = () => {
    return grids[0].map((rowArr, rowIndex) =>
      rowArr.map((_, colIndex) =>
        rowIndex === 0 || colIndex === 0
          ? null
          : grids
            .slice(0, gridCount - 1) // Exclude the last grid (summary grid)
            .reduce((acc, grid) => acc + grid[rowIndex][colIndex], 0) / (gridCount - 1)
      )
    );
  };

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

  const updateGridTitle = (e) => {
    const newTitle = e.target.value;
    const newGridTitles = [...gridTitles];
    newGridTitles[currentGridIndex] = newTitle;
    setGridTitles(newGridTitles);
    localStorage.setItem("gridTitles", JSON.stringify(newGridTitles));
  };

  const switchToGrid = (index) => {
    setCurrentGridIndex(index);
  };


  return (
    <div className="App">
      <div className="main-container">
        <div className="title-container">
          <h1>Hábitos UI</h1>
          <input
            className="title-input"
            value={gridTitles[currentGridIndex]}
            onChange={updateGridTitle}
          />
        </div>
        <div className="grid-container">
          {(currentGridIndex === gridCount - 1
            ? calculateSummaryGrid()
            : grids[currentGridIndex]
          ).map((rowArr, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {rowArr.map((value, colIndex) => (
                <GridButton
                  key={`${rowIndex}-${colIndex}`}
                  row={rowIndex}
                  col={colIndex}
                  toggleButton={toggleButton}
                  value={value}
                  label={getButtonLabel(rowIndex, colIndex, currentGridIndex)}
                  color={valueToColor(value)}
                  disabled={rowIndex === 0 || colIndex === 0}
                  isReadOnly={currentGridIndex === gridCount - 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="grid-switcher">
        {gridTitles.map((title, index) => (
          <div key={index} className="grid-switcher-item">
            <button
              className={`grid-switcher-button${currentGridIndex === index ? ' active' : ''}`}
              onClick={() => switchToGrid(index)}
            >
              {title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;