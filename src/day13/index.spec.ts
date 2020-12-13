import { getNextBusDeparture, getResult1, parseSchedule, part1 } from '.';
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

describe('part1', () => {
    test('should return the result for the puzzle input', () => {
        expect(part1()).toBe(261);
    });
});
