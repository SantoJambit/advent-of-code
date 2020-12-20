import {
    combineImage,
    getCorners,
    getCornerIdsMultiplied,
    parseTile,
    part1,
    flipImageVertical,
    getWaterRoughness,
    part2,
} from '.';
import { loadFile, loadFileGroupedByBlankLine } from '../lib';

const exampleInput = loadFileGroupedByBlankLine('day20/example.txt').map(
    parseTile
);
const exampleOutput = flipImageVertical(loadFile('day20/exampleImage.txt'));

describe('getCorners', () => {
    test('should get the corners for the example input', () => {
        expect(
            getCorners(exampleInput.map((tile) => tile.clone()))
                .map((tile) => parseInt(tile.id))
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

describe('combineImage', () => {
    test('should combine the image correctly', () => {
        expect(combineImage(exampleInput.map((tile) => tile.clone()))).toEqual(
            exampleOutput
        );
    });
});

describe('getWaterRoughness', () => {
    test('should get the water roughness of the example input', () => {
        expect(getWaterRoughness(exampleOutput)).toBe(273);
    });
});

describe('part1', () => {
    test('should get the corner ids of the puzzle input multiplied with eachother', () => {
        expect(part1()).toBe(17032646100079);
    });
});

describe('part2', () => {
    test('should get the water roughness of the puzzle input', () => {
        expect(part2()).toBe(2006);
    });
});
