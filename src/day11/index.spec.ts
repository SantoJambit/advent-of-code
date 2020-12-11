import { applyRules, applyRulesUntilNoChange, countOccupiedSeats, part1 } from '.';
import { loadFile } from '../lib';

const exampleInput = [
    loadFile('day11/example0.txt'),
    loadFile('day11/example1.txt'),
    loadFile('day11/example2.txt'),
    loadFile('day11/example3.txt'),
    loadFile('day11/example4.txt'),
    loadFile('day11/example5.txt'),
];

describe('applyRules', () => {
    test('should return the next state for each example input state', () => {
        expect(applyRules(exampleInput[0])).toEqual(exampleInput[1]);
        expect(applyRules(exampleInput[1])).toEqual(exampleInput[2]);
        expect(applyRules(exampleInput[2])).toEqual(exampleInput[3]);
        expect(applyRules(exampleInput[3])).toEqual(exampleInput[4]);
        expect(applyRules(exampleInput[4])).toEqual(exampleInput[5]);
        expect(applyRules(exampleInput[5])).toEqual(exampleInput[5]);
    });
});

describe('applyRulesUntilNoChange', () => {
    test('should return the final state for the example input state', () => {
        expect(applyRulesUntilNoChange(exampleInput[0])).toEqual(exampleInput[5]);
    });
});

describe('countOccupiedSeats', () => {
    test('should return the number of occupied seats for the example input state', () => {
        expect(countOccupiedSeats(exampleInput[5])).toBe(37);
    });
});

describe('part1', () => {
    test('should return the number of occupied seats for the puzzle input state', () => {
        expect(part1()).toBe(2273);
    });
});
