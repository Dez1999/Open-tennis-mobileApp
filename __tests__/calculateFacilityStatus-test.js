const calculateFacilityStatus = require('../src/generalUser/utils/calculateFacilityStatus');

test('Calculates Facility Status and returns Availability', () => {
    let moderatelyBusyList = [0, 0, 1];
    let freeList = [0, 0, 0, 0];
    let busyList = [0, 2, 3, 1];

    //Test Correct Responses
    expect(calculateFacilityStatus(freeList)).toBe("FREE");
    expect(calculateFacilityStatus(busyList)).toBe("BUSY");
    expect(calculateFacilityStatus(moderatelyBusyList)).toBe("MODERATELY BUSY");


    let moderatelyBusyList2 = [7, 0, 1, 0, 0];
    let freeList2 = [0, 0, 0, 0, 1];
    let busyList2 = [0, 2, 3, 0, 6, 2];


    //Test Results with larger Lists
    expect(calculateFacilityStatus(freeList2)).toBe("FREE");
    expect(calculateFacilityStatus(busyList2)).toBe("BUSY");
    expect(calculateFacilityStatus(moderatelyBusyList2)).toBe("MODERATELY BUSY");


    //Test that function returns any result and is not NULL
    expect(calculateFacilityStatus([0])).toBeTruthy();

})