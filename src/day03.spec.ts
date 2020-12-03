import { countTreesForSlope } from './day03';
import { loadFile } from './lib';

const exampleInput = [
    '..##.......',
    '#...#...#..',
    '.#....#..#.',
    '..#.#...#.#',
    '.#...##..#.',
    '..#.##.....',
    '.#.#.#....#',
    '.#........#',
    '#.##...#...',
    '#...##....#',
    '.#..#...#.#',
];

describe('countTreesForSlope', () => {
    test('should count trees for example input correctly', () => {
        expect(countTreesForSlope(exampleInput, 3, 1)).toBe(7);
    });
    test('should count trees for puzzle input correctly', () => {
        expect(countTreesForSlope(loadFile('day03.input'), 3, 1)).toBe(252);
    });
});
