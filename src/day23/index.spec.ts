import { part1, part2, solution1, solution2 } from '.';

const exampleInput = [3, 8, 9, 1, 2, 5, 4, 6, 7];

describe('solution1', () => {
    test('should return the new order of the cups starting at the cup with label 1 for the example input', () => {
        expect(solution1(exampleInput, 10)).toBe('92658374');
    });
});

describe('solution2', () => {
    test('should return 2 cup labels after the cup with label 1 multiplied with eachother for the example input', () => {
        expect(solution2(exampleInput)).toBe(149245887792);
    });
});

describe('part1', () => {
    test('should return the new order of the cups starting at the cup with label 1 for the puzzle input', () => {
        expect(part1()).toBe('38756249');
    });
});

describe('part2', () => {
    test('should return 2 cup labels after the cup with label 1 multiplied with eachother for the puzzle input', () => {
        expect(part2()).toBe(21986479838);
    });
});
