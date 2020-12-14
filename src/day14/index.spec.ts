import {
    applyInstructions,
    applyInstructions2,
    applyMask,
    applyMask2,
    getModifiedAddresses,
    getSumOfMemoryValues,
    parseInstructions,
    part1,
    part2,
} from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day14/example.txt').map(parseInstructions);
const exampleInput2 = loadFile('day14/example2.txt').map(parseInstructions);
const exampleMask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X';

describe('applyMask', () => {
    test('should apply the mask correctly', () => {
        expect(applyMask(exampleMask, BigInt(11))).toBe(BigInt(73));
        expect(applyMask(exampleMask, BigInt(101))).toBe(BigInt(101));
        expect(applyMask(exampleMask, BigInt(0))).toBe(BigInt(64));
    });
});

describe('applyInstructions', () => {
    test('should apply the instructions correctly to the example input', () => {
        expect(applyInstructions(exampleInput)).toEqual({
            7: BigInt(101),
            8: BigInt(64),
        });
    });
});

describe('applyMask2', () => {
    test('should apply the mask correctly', () => {
        expect(applyMask2('000000000000000000000000000000X1001X', BigInt(42))).toBe(
            '000000000000000000000000000000X1101X',
        );
        expect(applyMask2('00000000000000000000000000000000X0XX', BigInt(26))).toBe(
            '00000000000000000000000000000001X0XX',
        );
    });
});

describe('getModifiedAddresses', () => {
    test('should return the modified addresses for the example', () => {
        expect(getModifiedAddresses('000000000000000000000000000000X1001X', BigInt(42))).toEqual([
            '000000000000000000000000000000011010',
            '000000000000000000000000000000011011',
            '000000000000000000000000000000111010',
            '000000000000000000000000000000111011',
        ]);
        expect(getModifiedAddresses('00000000000000000000000000000001X0XX', BigInt(26))).toEqual([
            '000000000000000000000000000000010000',
            '000000000000000000000000000000010001',
            '000000000000000000000000000000010010',
            '000000000000000000000000000000010011',
            '000000000000000000000000000000011000',
            '000000000000000000000000000000011001',
            '000000000000000000000000000000011010',
            '000000000000000000000000000000011011',
        ]);
    });
});

describe('getSumOfMemoryValues', () => {
    test('should get the sum of all memory values', () => {
        expect(
            getSumOfMemoryValues({
                7: BigInt(101),
                8: BigInt(64),
            }),
        ).toEqual(BigInt(165));
    });
    test('should get the sum of all memory values for part 2 example', () => {
        expect(getSumOfMemoryValues(applyInstructions2(exampleInput2))).toEqual(BigInt(208));
    });
});

describe('part1', () => {
    test('should get the sum of all memory values after running the puzzle instructions', () => {
        expect(part1()).toEqual(BigInt(7997531787333));
    });
});

describe('part2', () => {
    test('should get the sum of all memory values after running the puzzle instructions', () => {
        expect(part2()).toEqual(BigInt(3564822193820));
    });
});
