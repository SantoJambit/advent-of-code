import { getFinalScore, parsePlayerState, part1 } from '.';
import { loadFileGroupedByBlankLine } from '../lib';

const exampleInput = loadFileGroupedByBlankLine('day22/example.txt').map(
    parsePlayerState
);

describe('getFinalScore', () => {
    test('should calculate the final score for the example input', () => {
        expect(getFinalScore(exampleInput[0], exampleInput[1])).toBe(306);
    });
});

describe('part1', () => {
    test('should calculate the final score for the example input', () => {
        expect(part1()).toBe(36257);
    });
});
