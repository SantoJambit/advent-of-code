import { loadLayer, part1, runCycle } from '.';
import { loadFile } from '../lib';

const exampleInput = loadLayer(loadFile('day17/example.txt'));

describe('runCycle', () => {
    test('should return the active cubes after 1 cycle with the example input', () => {
        expect(runCycle(exampleInput).size).toBe(11);
    });
    test('should return the active cubes after 6 cycle with the example input', () => {
        let next = exampleInput;
        for (let i = 0; i < 6; i++) next = runCycle(next);
        expect(next.size).toBe(112);
    });
});

describe('part1', () => {
    test('should return the count of active cubes after 6 cycle with the puzzle input', () => {
        expect(part1()).toBe(295);
    });
});
