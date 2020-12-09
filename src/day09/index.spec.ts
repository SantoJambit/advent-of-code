import {
    getContiguousSliceForSum,
    getEncryptionWeakness,
    getFirstInvalidNumber,
    part1,
    part2,
} from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day09/example.txt').map((s) => parseInt(s));

describe('getFirstInvalidNumber', () => {
    test('should return the first invalid number in the example', () => {
        expect(getFirstInvalidNumber(exampleInput, 5)).toBe(127);
    });
});

describe('getContiguousSliceForSum', () => {
    test('should return the first contigous set of numbers in the example that add up to 127', () => {
        expect(getContiguousSliceForSum(exampleInput, 127)).toEqual([15, 25, 47, 40]);
    });
});

describe('getEncryptionWeakness', () => {
    test('should return the encryption weakness for the example', () => {
        expect(getEncryptionWeakness(exampleInput, 127)).toBe(62);
    });
});

describe('part1', () => {
    test('should return the first invalid number in the puzzle', () => {
        expect(part1()).toBe(90433990);
    });
});

describe('part2', () => {
    test('should return the encryption weakness for the puzzle', () => {
        expect(part2()).toBe(11691646);
    });
});
