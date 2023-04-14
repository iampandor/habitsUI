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
        rowIndex === 0 || colIndex === 0 ? null : Math.round(Math.random())
      )
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
    const lastGridIndex = grids.length - 1;
    return grids[0].map((rowArr, rowIndex) =>
      rowArr.map((_, colIndex) =>
        rowIndex === 0 || colIndex === 0
          ? null
          : grids
            .slice(0, lastGridIndex) // Exclude the last grid (summary grid)
            .reduce((acc, grid) => acc + grid[rowIndex][colIndex], 0) / lastGridIndex
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

  const addGrid = () => {
    if (grids.length >= 11) {
      return;
    }
    const newGrid = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) =>
        rowIndex === 0 || colIndex === 0 ? null : Math.round(Math.random())
      )
    );
    setGrids([...grids, newGrid]);
    setGridTitles([...gridTitles.slice(0, -1), `Habit ${gridTitles.length}`, gridTitles.slice(-1)]);
  };

  // Add this function to your App component
  const removeGrid = () => {
    if (grids.length <= 2) return; // Prevent removing the last grid
    const updatedGrids = grids.filter((_, index) => index !== currentGridIndex);
    const updatedGridTitles = gridTitles.filter((_, index) => index !== currentGridIndex);
    setGrids(updatedGrids);
    setGridTitles(updatedGridTitles);
    setCurrentGridIndex(0);
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
          {(currentGridIndex === grids.length - 1
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
                  label={getButtonLabel(rowIndex, colIndex)}
                  color={valueToColor(value)}
                  disabled={rowIndex === 0 || colIndex === 0 || currentGridIndex === grids.length - 1}
                  isReadOnly={currentGridIndex === grids.length - 1}
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
        <div className="grid-switcher-item">
          <button className="grid-switcher-button" onClick={addGrid}>
            Add
      </button>
        </div>
        <div className="grid-switcher-item">
          {currentGridIndex !== grids.length - 1 && (
            <button className="grid-switcher-button" onClick={removeGrid}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;