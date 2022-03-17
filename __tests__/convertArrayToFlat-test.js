const convertArrayToFlat = require('../src/generalUser/utils/convertArrayToFlat');

test('Converts an array to a flat array', () => {
    expect(convertArrayToFlat([0, 0, 0, [0, 0]])).toStrictEqual([0,0,0,0,0]);
})