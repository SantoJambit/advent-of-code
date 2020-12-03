import { countTreesForSlope } from './day03';
import { loadFile, multiplyArray } from './lib';

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

const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];

describe('countTreesForSlope', () => {
    test('should count trees for example input correctly', () => {
        const trees = slopes.map(([x, y]) => countTreesForSlope(exampleInput, x, y));
        expect(trees).toEqual([2, 7, 3, 4, 2]);
        expect(multiplyArray(trees)).toBe(336);
    });
    test('should count trees for puzzle input correctly', () => {
        const puzzleInput = loadFile('day03.input');
        const trees = slopes.map(([x, y]) => countTreesForSlope(puzzleInput, x, y));
        expect(trees).toEqual([57, 252, 64, 66, 43]);
        expect(multiplyArray(trees)).toBe(2608962048);
    });
});
