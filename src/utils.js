export const valueToColor = (value) => {
    if (value === null) return '';
    if (value === -1) {
        return "gray";
    }
    const r = Math.round((1 - value) * 255);
    const g = Math.round(value * 255);
    return `rgb(${r}, ${g}, 0)`;
};

export const getGridStartingDay = () => {
    const today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let day = new Date(Date.parse( mm + ' 01 ' + yyyy + ' 10:00:00 GMT')).getDay()
    return day + 1;
};

export const getButtonLabel = (row, col, currentGridIndex) => {
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
        const dayNumber = (row - 1) * 7 + col - getGridStartingDay(currentGridIndex) + 1;
        return dayNumber >= 1 && dayNumber <= 31 ? dayNumber.toString() : '';
    }
};

