import { compileRule, countValidMessages, part1 } from '.';
import { loadFileGroupedByBlankLine } from '../lib';

const exampleInput = loadFileGroupedByBlankLine('day19/example.txt');

describe('countValidMessages', () => {
    test('count the valid messages for rule 0 of the example input', () => {
        const rule = compileRule(exampleInput[0], '0');
        expect(countValidMessages(rule, exampleInput[1])).toBe(2);
    });
});

describe('part1', () => {
    test('count the valid messages for rule 0 of the puzzle input', () => {
        expect(part1()).toBe(136);
    });
});
