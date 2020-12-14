import { applyInstructions, applyMask, getSumOfMemoryValues, parseInstructions, part1 } from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day14/example.txt').map(parseInstructions);
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

describe('getSumOfMemoryValues', () => {
    test('should get the sum of all memory values', () => {
        expect(
            getSumOfMemoryValues({
                7: BigInt(101),
                8: BigInt(64),
            }),
        ).toEqual(BigInt(165));
    });
});

describe('part1', () => {
    test('should get the sum of all memory values after running the puzzle instructions', () => {
        expect(part1()).toEqual(BigInt(7997531787333));
    });
});
