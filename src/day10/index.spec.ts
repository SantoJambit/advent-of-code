import { countJoltArrangements, countJoltDifferences, part1, part2 } from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day10/example.txt').map((s) => parseInt(s));
const exampleInput2 = loadFile('day10/example2.txt').map((s) => parseInt(s));

describe('countJoltDifferences', () => {
    test('should count the jolt differences in the first example', () => {
        expect(countJoltDifferences(exampleInput)).toEqual([7, 0, 5]);
    });
    test('should count the jolt differences in the second example', () => {
        expect(countJoltDifferences(exampleInput2)).toEqual([22, 0, 10]);
    });
});

describe('countJoltArrangements', () => {
    test('should count the jolt arrangements in the first example', () => {
        expect(countJoltArrangements(exampleInput)).toBe(8);
    });
    test('should count the jolt arrangements in the second example', () => {
        expect(countJoltArrangements(exampleInput2)).toBe(19208);
    });
});

describe('part1', () => {
    test('should return the result of the puzzle', () => {
        expect(part1()).toBe(1755);
    });
});

describe('part2', () => {
    test('should return the possible jolt arrangements of the puzzle', () => {
        expect(part2()).toBe(4049565169664);
    });
});
