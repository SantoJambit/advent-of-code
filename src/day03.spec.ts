import { countTreesForSlope, slopes, puzzleInput, part2, part1 } from './day03';
import { multiplyArray } from './lib';

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
        const trees = slopes.map(([x, y]) => countTreesForSlope(exampleInput, x, y));
        expect(trees).toEqual([2, 7, 3, 4, 2]);
        expect(multiplyArray(trees)).toBe(336);
    });
    test('should count trees for puzzle input correctly', () => {
        expect(part1()).toBe(252);
        const trees = slopes.map(([x, y]) => countTreesForSlope(puzzleInput, x, y));
        expect(trees).toEqual([57, 252, 64, 66, 43]);
        expect(part2()).toBe(2608962048);
    });
});
