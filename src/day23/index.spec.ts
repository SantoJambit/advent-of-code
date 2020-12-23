import { moveCups, part1 } from '.';

const exampleInput = [3, 8, 9, 1, 2, 5, 4, 6, 7];

describe('moveCups', () => {
    test('should return the new order of the cups starting at the cup with label1 for the example input', () => {
        expect(moveCups(exampleInput.slice(), 10)).toBe('92658374');
    });
});

describe('part1', () => {
    test('should return the new order of the cups starting at the cup with label1 for the puzzle input', () => {
        expect(part1()).toBe('38756249');
    });
});
