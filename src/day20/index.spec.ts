import { getCornerIds, getCornerIdsMultiplied, parseTile, part1 } from '.';
import { loadFileGroupedByBlankLine } from '../lib';

const exampleInput = loadFileGroupedByBlankLine('day20/example.txt').map(
    parseTile
);

describe('getCornerIds', () => {
    test('should get the corner ids for the example input', () => {
        expect(
            getCornerIds(exampleInput.map((tile) => tile.clone()))
                .map((id) => parseInt(id))
                .sort((a, b) => a - b)
        ).toEqual([1171, 1951, 2971, 3079]);
    });
});

describe('getCornerIdsMultiplied', () => {
    test('should get the corner ids of the example input multiplied with eachother', () => {
        expect(
            getCornerIdsMultiplied(exampleInput.map((tile) => tile.clone()))
        ).toBe(20899048083289);
    });
});

describe('part1', () => {
    test('should get the corner ids of the puzzle input multiplied with eachother', () => {
        expect(part1()).toBe(17032646100079);
    });
});
