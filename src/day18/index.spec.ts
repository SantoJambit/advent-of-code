import { evaluateExpression, part1 } from '.';
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

describe('part1', () => {
    test('should sum up all evaluated values of the puzzle input', () => {
        expect(part1()).toBe(4491283311856);
    });
});
