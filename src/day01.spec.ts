import { findAnswer, findSummands } from './day01';
import { loadFile } from './lib';

describe('findSummands', () => {
    test('should find summands', () => {
        expect(findSummands(2020, [1721, 979, 366, 299, 675, 1456])).toEqual([1721, 299]);
    });
});

describe('findAnswer', () => {
    test('should find the answer', () => {
        expect(findAnswer(2020, [1721, 979, 366, 299, 675, 1456])).toBe(514579);
    });
    test('should find the answer', () => {
        expect(
            findAnswer(
                2020,
                loadFile('day01.input', (s) => parseInt(s, 10)),
            ),
        ).toBe(788739);
    });
});
