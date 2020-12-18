import {
    applyAdvancedParentheses,
    evaluateAdvancedExpression,
    evaluateExpression,
    part1,
    part2,
} from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day18/example.txt');

describe('evaluateExpression', () => {
    test('should evaluate the example input correctly', () => {
        expect(exampleInput.map(evaluateExpression)).toEqual([
            71,
            51,
            26,
            437,
            12240,
            13632,
        ]);
    });
});

describe('applyAdvancedParentheses', () => {
    test('should add parentheses to sample expressions', () => {
        expect(exampleInput.map(applyAdvancedParentheses)).toEqual([
            '(1 + 2) * (3 + 4) * (5 + 6)',
            '((1 + (2 * 3)) + (4 * ((5 + 6))))',
            '2 * (3 + (4 * 5))',
            '(5 + (8 * ((3 + 9) + 3) * 4 * 3))',
            '5 * 9 * (7 * 3 * (3 + 9) * (3 + ((8 + 6) * 4)))',
            '(((((2 + 4) * 9) * (((6 + 9) * (8 + 6)) + 6)) + 2) + 4) * 2',
        ]);
    });
});

describe('evaluateAdvancedExpression', () => {
    test('should evaluate the example input correctly', () => {
        expect(exampleInput.map(evaluateAdvancedExpression)).toEqual([
            231,
            51,
            46,
            1445,
            669060,
            23340,
        ]);
    });
});

describe('part1', () => {
    test('should sum up all evaluated values of the puzzle input', () => {
        expect(part1()).toBe(4491283311856);
    });
});

describe('part2', () => {
    test('should sum up all evaluated values of the puzzle input', () => {
        expect(part2()).toBe(68852578641904);
    });
});
