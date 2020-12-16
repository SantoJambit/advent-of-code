import { getInvalidValues, getResult1, parseInput, part1 } from '.';
import { loadFileGroupedByBlankLine } from '../lib';

const exampleInput = parseInput(loadFileGroupedByBlankLine('day16/example.txt'));

describe('getInvalidValues', () => {
    test('should return the invalid values of the example input', () => {
        expect(getInvalidValues(exampleInput)).toEqual([4, 55, 12]);
    });
});

describe('getResult1', () => {
    test('should return the sum of the invalid values of the example input', () => {
        expect(getResult1(exampleInput)).toBe(71);
    });
});

describe('part1', () => {
    test('should return the sum of the invalid values of the puzzle input', () => {
        expect(part1()).toBe(23115);
    });
});
