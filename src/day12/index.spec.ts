import {
    applyInstruction,
    applyInstructions,
    getManhattanDistance,
    parseInstruction,
    part1,
    ShipState,
} from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day12/example.txt').map(parseInstruction);

const state: ShipState = {
    east: 0,
    north: 0,
    angle: 0,
};

beforeEach(() => {
    state.east = 0;
    state.north = 0;
    state.angle = 0;
});

describe('applyInstruction', () => {
    test('should apply the instruction correctly', () => {
        expect(
            exampleInput.map((i) => {
                applyInstruction(state, i);
                return { ...state };
            }),
        ).toEqual([
            // F10
            {
                east: 10,
                north: 0,
                angle: 0,
            },
            // N3
            {
                east: 10,
                north: 3,
                angle: 0,
            },
            // F7
            {
                east: 17,
                north: 3,
                angle: 0,
            },
            // R90
            {
                east: 17,
                north: 3,
                angle: 90,
            },
            // F11
            {
                east: 17,
                north: -8,
                angle: 90,
            },
        ]);
    });
});

describe('applyInstructions', () => {
    test('should apply the instructions correctly', () => {
        applyInstructions(state, exampleInput);
        expect(state).toEqual({
            east: 17,
            north: -8,
            angle: 90,
        });
    });
});

describe('getManhattanDistance', () => {
    test('should return the manhattan distance for the example', () => {
        expect(
            getManhattanDistance({
                east: 17,
                north: -8,
                angle: 90,
            }),
        ).toBe(25);
    });
});

describe('part1', () => {
    test('should return the manhattan distance for the puzzle input', () => {
        expect(part1()).toBe(845);
    });
});
