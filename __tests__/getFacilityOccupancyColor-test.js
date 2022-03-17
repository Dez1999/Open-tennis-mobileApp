const getFacilityOccupancyColor = require('../src/generalUser/utils/getFacilityOccupancyColor');

test('Returns the Occupancy Status in Color for a Facility', () => {
    expect(getFacilityOccupancyColor("FREE")).toBe("#28B625");
    expect(getFacilityOccupancyColor("BUSY")).toBe("#D32E2E");
    expect(getFacilityOccupancyColor("MODERATELY BUSY")).toBe("#F9B70F");
    expect(getFacilityOccupancyColor("NOT AVAILABLE")).toBe("#696A6D");
})