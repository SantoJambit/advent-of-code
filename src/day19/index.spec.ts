import {
    compileRule,
    countValidMessages,
    countValidMessages2,
    part1,
    part2,
} from '.';
import { loadFileGroupedByBlankLine } from '../lib';

const exampleInput = loadFileGroupedByBlankLine('day19/example.txt');
const exampleInput2 = loadFileGroupedByBlankLine('day19/example2.txt');

describe('countValidMessages', () => {
    test('count the valid messages for rule 0 of the example input', () => {
        const rule = compileRule(exampleInput[0], '0');
        expect(countValidMessages(rule, exampleInput[1])).toBe(2);
    });
    test('count the valid messages for rule 0 of the example input 2', () => {
        const rule = compileRule(exampleInput2[0], '0');
        expect(countValidMessages(rule, exampleInput2[1])).toBe(3);
    });
});

describe('countValidMessages2', () => {
    test('count the valid messages for rule 0 of the example input 3', () => {
        expect(countValidMessages2(exampleInput2[0], exampleInput2[1])).toBe(
            12
        );
    });
});

describe('part1', () => {
    test('count the valid messages for rule 0 of the puzzle input', () => {
        expect(part1()).toBe(136);
    });
});

describe('part2', () => {
    test('count the valid messages for rule 0 of the puzzle input 2', () => {
        expect(part2()).toBe(256);
    });
});
