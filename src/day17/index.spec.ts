import { loadLayer, part1, part2, runCycle } from '.';
import { loadFile } from '../lib';

const exampleInput3 = loadLayer(loadFile('day17/example.txt'), "0");
const exampleInput4 = loadLayer(loadFile('day17/example.txt'), "0,0");

describe('runCycle', () => {
    describe('with 3 dimensions', () => {
        test('should return the active cubes after 1 cycle with the example input', () => {
            expect(runCycle(exampleInput3).size).toBe(11);
        });
        test('should return the active cubes after 6 cycle with the example input', () => {
            let next = exampleInput3;
            for (let i = 0; i < 6; i++) next = runCycle(next);
            expect(next.size).toBe(112);
        });
    });
    describe('with 4 dimensions', () => {
        test('should return the active hypercubes after 1 cycle with the example input', () => {
            expect(runCycle(exampleInput4).size).toBe(29);
        });
        test('should return the active hypercubes after 6 cycle with the example input', () => {
            let next = exampleInput4;
            for (let i = 0; i < 6; i++) next = runCycle(next);
            expect(next.size).toBe(848);
        });
    });
});

describe('part1', () => {
    test('should return the count of active cubes after 6 cycle with the puzzle input', () => {
        expect(part1()).toBe(295);
    });
});

describe('part2', () => {
    test('should return the count of active hypercubes after 6 cycle with the puzzle input', () => {
        expect(part2()).toBe(1972);
    });
});
