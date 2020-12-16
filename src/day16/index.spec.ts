import { getInvalidValues, getResult1, getRuleOrder, parseInput, part1, part2 } from '.';
import { loadFileGroupedByBlankLine } from '../lib';

const exampleInput = parseInput(loadFileGroupedByBlankLine('day16/example.txt'));
const exampleInput2 = parseInput(loadFileGroupedByBlankLine('day16/example2.txt'));

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

describe('getRuleOrder', () => {
    test('should return the rule order for the example input', () => {
        expect(getRuleOrder(exampleInput2)).toEqual(['row', 'class', 'seat']);
    });
});

describe('part1', () => {
    test('should return the sum of the invalid values of the puzzle input', () => {
        expect(part1()).toBe(23115);
    });
});

describe('part2', () => {
    test('should return the departure values multiplied with each other for the puzzle input', () => {
        expect(part2()).toBe(239727793813);
    });
});
