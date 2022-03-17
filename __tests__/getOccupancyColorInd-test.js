const getOccupancyColorInd = require('../src/generalUser/utils/getOccupancyColorInd');

test('Returns the Occupancy Status in Color for an Individual Area', () => {
    expect(getOccupancyColorInd("FREE")).toBe("#28B625");
    expect(getOccupancyColorInd("BUSY")).toBe("#D32E2E");
    expect(getOccupancyColorInd("Anything")).toBe("#696A6D");
})
