export const valueToColor = (value) => {
    if (value === null) return '';
    const r = Math.round((1 - value) * 255);
    const g = Math.round(value * 255);
    return `rgb(${r}, ${g}, 0)`;
  };
  
  export const getGridStartingDay = () => {
    return 1;
  };
  
  export const getButtonLabel = (row, col) => {
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
  
  