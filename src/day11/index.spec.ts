import {
    applyRules,
    applyRulesUntilNoChange,
    countOccupiedSeats,
    part1,
    expectedRules,
    actualRules,
    countVisibleOccupiedSeats,
    part2,
} from '.';
import { loadFileGroupedByBlankLine } from '../lib';

const exampleInput = loadFileGroupedByBlankLine('day11/example.txt');
const exampleInput2 = loadFileGroupedByBlankLine('day11/example2.txt');

describe('applyRules', () => {
    test('should return the next state for each example input state when using the expected rules', () => {
        expect(applyRules(exampleInput[0], expectedRules)).toEqual(exampleInput[1]);
        expect(applyRules(exampleInput[1], expectedRules)).toEqual(exampleInput[2]);
        expect(applyRules(exampleInput[2], expectedRules)).toEqual(exampleInput[3]);
        expect(applyRules(exampleInput[3], expectedRules)).toEqual(exampleInput[4]);
        expect(applyRules(exampleInput[4], expectedRules)).toEqual(exampleInput[5]);
        expect(applyRules(exampleInput[5], expectedRules)).toEqual(exampleInput[5]);
    });
    test('should return the next state for each example input state when using the actual rules', () => {
        expect(applyRules(exampleInput2[0], actualRules)).toEqual(exampleInput2[1]);
        expect(applyRules(exampleInput2[1], actualRules)).toEqual(exampleInput2[2]);
        expect(applyRules(exampleInput2[2], actualRules)).toEqual(exampleInput2[3]);
        expect(applyRules(exampleInput2[3], actualRules)).toEqual(exampleInput2[4]);
        expect(applyRules(exampleInput2[4], actualRules)).toEqual(exampleInput2[5]);
        expect(applyRules(exampleInput2[5], actualRules)).toEqual(exampleInput2[6]);
        expect(applyRules(exampleInput2[6], actualRules)).toEqual(exampleInput2[6]);
    });
});

describe('countVisibleOccupiedSeats', () => {
    test('should count the visible occupied seats for the examples', () => {
        const test = [
            '.......#.',
            '...#.....',
            '.#.......',
            '.........',
            '..#L....#',
            '....#....',
            '.........',
            '#........',
            '...#.....',
        ];
        expect(countVisibleOccupiedSeats(test, 3, 4)).toEqual(8);
        const test2 = ['.............', '.L.L.#.#.#.#.', '.............'];
        expect(countVisibleOccupiedSeats(test2, 1, 1)).toEqual(0);
        const test3 = ['.##.##.', '#.#.#.#', '##...##', '...L...', '##...##', '#.#.#.#', '.##.##.'];
        expect(countVisibleOccupiedSeats(test3, 3, 3)).toEqual(0);
    });
});

describe('applyRulesUntilNoChange', () => {
    test('should return the final state for the example input state', () => {
        expect(applyRulesUntilNoChange(exampleInput[0], expectedRules)).toEqual(exampleInput[5]);
    });
});

describe('countOccupiedSeats', () => {
    test('should return the number of occupied seats for the example input state', () => {
        expect(countOccupiedSeats(exampleInput[5])).toBe(37);
    });
});

describe('part1', () => {
    test('should return the number of occupied seats for the puzzle input state when using the expected rules', () => {
        expect(part1()).toBe(2273);
    });
});

describe('part2', () => {
    test('should return the number of occupied seats for the puzzle input state when using the actual rules', () => {
        expect(part2()).toBe(2064);
    });
});
