import { getGridStartingDay, getButtonLabel } from './utils';

describe('getGridStartingDay', () => {
  it('returns the correct starting day for each grid index', () => {
    expect(getGridStartingDay(0)).toBe(7);
    expect(getGridStartingDay(1)).toBe(4);
    expect(getGridStartingDay(2)).toBe(1);
    expect(getGridStartingDay(3)).toBe(1);
  });
});

describe('getButtonLabel', () => {
  it('returns the correct label for header cells', () => {
    expect(getButtonLabel(0, 0)).toBe('Week');
    expect(getButtonLabel(0, 1)).toBe('Sunday');
    expect(getButtonLabel(0, 2)).toBe('Monday');
    expect(getButtonLabel(0, 3)).toBe('Tuesday');
    expect(getButtonLabel(0, 4)).toBe('Wednesday');
    expect(getButtonLabel(0, 5)).toBe('Thursday');
    expect(getButtonLabel(0, 6)).toBe('Friday');
    expect(getButtonLabel(0, 7)).toBe('Saturday');
  });
});
