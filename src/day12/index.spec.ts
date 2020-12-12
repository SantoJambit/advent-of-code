import {
    applyInstruction,
    applyInstruction2,
    applyInstructions,
    applyInstructions2,
    getManhattanDistance,
    parseInstruction,
    part1,
    part2,
    ShipState,
    ShipState2,
} from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day12/example.txt').map(parseInstruction);

const state: ShipState = {
    east: 0,
    north: 0,
    angle: 0,
};

const state2: ShipState2 = {
    east: 0,
    north: 0,
    waypoint: {
        east: 10,
        north: 1,
    },
};

beforeEach(() => {
    state.east = 0;
    state.north = 0;
    state.angle = 0;
    state2.east = 0;
    state2.north = 0;
    state2.waypoint.east = 10;
    state2.waypoint.north = 1;
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

describe('applyInstruction2', () => {
    test('should apply the instruction correctly', () => {
        expect(
            exampleInput.map((i) => {
                applyInstruction2(state2, i);
                return JSON.parse(JSON.stringify(state2));
            }),
        ).toEqual([
            // F10
            {
                east: 100,
                north: 10,
                waypoint: {
                    east: 10,
                    north: 1,
                },
            },
            // N3
            {
                east: 100,
                north: 10,
                waypoint: {
                    east: 10,
                    north: 4,
                },
            },
            // F7
            {
                east: 170,
                north: 38,
                waypoint: {
                    east: 10,
                    north: 4,
                },
            },
            // R90
            {
                east: 170,
                north: 38,
                waypoint: {
                    east: 4,
                    north: -10,
                },
            },
            // F11
            {
                east: 214,
                north: -72,
                waypoint: {
                    east: 4,
                    north: -10,
                },
            },
        ]);
    });
});

describe('applyInstructions2', () => {
    test('should apply the instructions correctly', () => {
        applyInstructions2(state2, exampleInput);
        expect(state2).toEqual({
            east: 214,
            north: -72,
            waypoint: {
                east: 4,
                north: -10,
            },
        });
    });
});

describe('getManhattanDistance', () => {
    test('should return the manhattan distance for the example', () => {
        expect(
            getManhattanDistance({
                east: 17,
                north: -8,
            }),
        ).toBe(25);
        expect(
            getManhattanDistance({
                east: 214,
                north: 72,
            }),
        ).toBe(286);
    });
});

describe('part1', () => {
    test('should return the manhattan distance for the puzzle input', () => {
        expect(part1()).toBe(845);
    });
});

describe('part2', () => {
    test('should return the manhattan distance for the puzzle input', () => {
        expect(part2()).toBe(27016);
    });
});
