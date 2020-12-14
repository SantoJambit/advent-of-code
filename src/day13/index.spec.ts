import {
    chineseRemainder,
    findTimestampForMinuteDeparture,
    getNextBusDeparture,
    getResult1,
    parseSchedule,
    part1,
    part2,
} from '.';
import { loadFile } from '../lib';

const exampleInput = parseSchedule(loadFile('day13/example.txt'));

describe('getNextBusDeparture', () => {
    test('should return the the next bus departure for the example input', () => {
        expect(getNextBusDeparture(exampleInput)).toEqual({
            bus: 59,
            departure: 944,
        });
    });
});

describe('getResult1', () => {
    test('should return the result for the example input', () => {
        expect(getResult1(exampleInput)).toBe(295);
    });
});

describe('chineseRemainder', () => {
    test('should work', () => {
        expect(
            chineseRemainder([BigInt(3), BigInt(4), BigInt(5)], [BigInt(1), BigInt(2), BigInt(4)]),
        ).toBe(BigInt(34));
        expect(
            chineseRemainder([BigInt(3), BigInt(5), BigInt(7)], [BigInt(0), BigInt(1), BigInt(2)]),
        ).toBe(BigInt(51));
    });
});

describe('findTimestampForMinuteDeparture', () => {
    test('should find the timestamp for the example input', () => {
        expect(findTimestampForMinuteDeparture(exampleInput.buses)).toBe(BigInt(1068781));
    });
    test('should find the timestamp for the other example inputs', () => {
        expect(findTimestampForMinuteDeparture([17, null, 13, 19])).toBe(BigInt(3417));
        expect(findTimestampForMinuteDeparture([67, null, 7, 59, 61])).toBe(BigInt(779210));
        expect(findTimestampForMinuteDeparture([67, 7, null, 59, 61])).toBe(BigInt(1261476));
        expect(findTimestampForMinuteDeparture([1789, 37, 47, 1889])).toBe(BigInt(1202161486));
    });
});

describe('part1', () => {
    test('should return the result for the puzzle input', () => {
        expect(part1()).toBe(261);
    });
});

describe('part2', () => {
    test('should return the result for the puzzle input', () => {
        expect(part2()).toBe(BigInt(807435693182510));
    });
});
