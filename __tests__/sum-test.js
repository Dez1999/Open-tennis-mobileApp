const sum = require('../src/generalUser/utils/sum');

test('Adds 1 + 2 equal 3', () => {
    expect(sum(1, 2)).toBe(3);
})