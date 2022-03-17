const getImageTypeFacility = require('../src/generalUser/utils/getImageTypeFacility');

const swimmingType = require('../src/generalUser/images/swimming_area.jpg');
const tennisType = require('../src/generalUser/images/tennis-court-dimensions.jpg');
const basketballType = require('../src/generalUser/images/Basketball-court.png');

test('Returns the specified image background type', () => {
    expect(getImageTypeFacility("TENNIS")).toStrictEqual(tennisType);
    expect(getImageTypeFacility("SWIMMING")).toStrictEqual(swimmingType);
    expect(getImageTypeFacility("BASKETBALL")).toStrictEqual(basketballType);
})