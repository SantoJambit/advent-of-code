import {
    getFinalScore,
    getFinalScore2,
    parsePlayerState,
    part1,
    part2,
} from '.';
import { loadFileGroupedByBlankLine } from '../lib';

const exampleInput = loadFileGroupedByBlankLine('day22/example.txt').map(
    parsePlayerState
);

describe('getFinalScore', () => {
    test('should calculate the final score for the example input', () => {
        expect(getFinalScore(exampleInput[0], exampleInput[1])).toBe(306);
    });
});

describe('getFinalScore2', () => {
    test('should calculate the final score for the example input using the recursive combat', () => {
        expect(getFinalScore2(exampleInput[0], exampleInput[1])).toBe(291);
    });
});

describe('part1', () => {
    test('should calculate the final score for the puzzle input', () => {
        expect(part1()).toBe(36257);
    });
});

describe('part2', () => {
    test('should calculate the final score for the puzzle input using the recursive combat', () => {
        expect(part2()).toBe(33304);
    });
});
