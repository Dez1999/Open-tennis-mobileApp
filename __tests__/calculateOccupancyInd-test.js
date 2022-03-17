const calculateOccupancyInd = require('../src/generalUser/utils/calculateOccupancyInd');

test('Returns if Area is Free or Busy', () => {
    expect(calculateOccupancyInd(5)).toBe("BUSY");
    expect(calculateOccupancyInd(0)).toBe("FREE");
})