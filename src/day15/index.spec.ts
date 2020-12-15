import { part1, play } from '.';

describe('play', () => {
    test('should return the last spoken number for the example inputs', () => {
        expect(play([0, 3, 6], 10)).toBe(0);
        expect(play([0, 3, 6], 2020)).toBe(436);
        expect(play([1, 3, 2], 2020)).toBe(1);
        expect(play([2, 1, 3], 2020)).toBe(10);
        expect(play([1, 2, 3], 2020)).toBe(27);
        expect(play([2, 3, 1], 2020)).toBe(78);
        expect(play([3, 2, 1], 2020)).toBe(438);
        expect(play([3, 1, 2], 2020)).toBe(1836);
    });
});

describe('part1', () => {
    test('should return the last spoken number for the puzzle input', () => {
        expect(part1()).toBe(639);
    });
});
