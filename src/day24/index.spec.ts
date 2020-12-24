import { flipTiles, parseDirections, part1 } from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day24/example.txt').map(parseDirections);

describe('flipTiles', () => {
    test('should return the number of black tiles for the example input', () => {
        expect(flipTiles(exampleInput)).toBe(10);
    });
});

describe('part1', () => {
    test('should return the number of black tiles for the puzzle input', () => {
        expect(part1()).toBe(434);
    });
});
