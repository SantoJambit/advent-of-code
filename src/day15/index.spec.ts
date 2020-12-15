import { part1, part2, play } from '.';

describe('play', () => {
    test('should return the 10th spoken number for the example inputs', () => {
        expect(play([0, 3, 6], 10)).toBe(0);
    });
    test('should return the 2020th spoken number for the example inputs', () => {
        expect(play([0, 3, 6], 2020)).toBe(436);
        expect(play([1, 3, 2], 2020)).toBe(1);
        expect(play([2, 1, 3], 2020)).toBe(10);
        expect(play([1, 2, 3], 2020)).toBe(27);
        expect(play([2, 3, 1], 2020)).toBe(78);
        expect(play([3, 2, 1], 2020)).toBe(438);
        expect(play([3, 1, 2], 2020)).toBe(1836);
    });
    test('should return the 30000000th spoken number for the example inputs', () => {
        expect(play([0, 3, 6], 30000000)).toBe(175594);
        expect(play([1, 3, 2], 30000000)).toBe(2578);
        expect(play([2, 1, 3], 30000000)).toBe(3544142);
        expect(play([1, 2, 3], 30000000)).toBe(261214);
        expect(play([2, 3, 1], 30000000)).toBe(6895259);
        expect(play([3, 2, 1], 30000000)).toBe(18);
        expect(play([3, 1, 2], 30000000)).toBe(362);
    });
});

describe('part1', () => {
    test('should return the 2020th spoken number for the puzzle input', () => {
        expect(part1()).toBe(639);
    });
});

describe('part2', () => {
    test('should return the 30000000th spoken number for the puzzle input', () => {
        expect(part2()).toBe(266);
    });
});
