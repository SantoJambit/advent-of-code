import { getColumn, getRow, getSeatId, part1, part2 } from '.';

describe('getRow', () => {
    test('should get the example row', () => {
        expect(getRow('FBFBBFFRLR')).toEqual(44);
    });
});

describe('getColumn', () => {
    test('should find the example column', () => {
        expect(getColumn('FBFBBFFRLR')).toEqual(5);
    });
});

describe('getSeatId', () => {
    test('should get the example seat id', () => {
        expect(getSeatId(44, 5)).toEqual(357);
    });
});

describe('part1', () => {
    test('should return the highest seat id on the puzzle input', () => {
        expect(part1()).toEqual(813);
    });
});

describe('part2', () => {
    test('should your seat from the puzzle input', () => {
        expect(part2()).toEqual(612);
    });
});
