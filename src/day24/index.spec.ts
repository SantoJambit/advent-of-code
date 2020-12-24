import { solution1, parseDirections, part1, solution2, part2 } from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day24/example.txt').map(parseDirections);

describe('solution1', () => {
    test('should return the number of black tiles for the example input', () => {
        expect(solution1(exampleInput)).toBe(10);
    });
});

describe('solution2', () => {
    test('should return the number of black tiles for the example input after 100 days', () => {
        expect(solution2(exampleInput)).toBe(2208);
    });
});

describe('part1', () => {
    test('should return the number of black tiles for the puzzle input', () => {
        expect(part1()).toBe(434);
    });
});

describe('part2', () => {
    test('should return the number of black tiles for the puzzle input after 100 days', () => {
        expect(part2()).toBe(3955);
    });
});
