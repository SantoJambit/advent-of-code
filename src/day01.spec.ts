import { findAnswer, findAnswer2, findSummands, findSummands2, part1, part2 } from './day01';

const exampleInput = [1721, 979, 366, 299, 675, 1456];

describe('findSummands', () => {
    test('should find the example summands', () => {
        expect(findSummands(2020, exampleInput)).toEqual([1721, 299]);
    });
});

describe('findAnswer', () => {
    test('should find the example answer', () => {
        expect(findAnswer(2020, exampleInput)).toBe(514579);
    });
    test('should find the puzzzle answer', () => {
        expect(part1()).toBe(788739);
    });
});

describe('findSummands2', () => {
    test('should find the example summands', () => {
        expect(findSummands2(2020, exampleInput)).toEqual([979, 366, 675]);
    });
});

describe('findAnswer2', () => {
    test('should find the example answer', () => {
        expect(findAnswer2(2020, exampleInput)).toBe(241861950);
    });
    test('should find the puzzle answer', () => {
        expect(part2()).toBe(178724430);
    });
});
