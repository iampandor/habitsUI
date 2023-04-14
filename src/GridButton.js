import React from 'react';

const GridButton = ({ row, col, toggleButton, label, color, disabled, isReadOnly }) => {
  const handleClick = () => {
    if (isReadOnly) return;
    toggleButton(row, col);
  };

  return (
    <button
      className={`grid-button ${row === 0 || col === 0 ? 'header' : ''}`}
      onClick={handleClick}
      style={{ backgroundColor: color }}
      disabled={disabled || isReadOnly}
    >
      {label}
    </button>
  );
};

export default GridButton;
