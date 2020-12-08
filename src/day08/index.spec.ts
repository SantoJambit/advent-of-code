import {
    applyInstruction,
    applyInstructionsUntilLoop,
    BootState,
    parseInstruction,
    part1,
} from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day08/example.txt').map(parseInstruction);

const state: BootState = {
    accumulator: 0,
    line: 0,
};

beforeEach(() => {
    state.accumulator = 0;
    state.line = 0;
});

describe('applyInstruction', () => {
    test('should apply the rules correctly', () => {
        expect(
            exampleInput.map((i) => {
                applyInstruction(state, i);
                return { ...state };
            }),
        ).toEqual([
            // nop +0
            {
                accumulator: 0,
                line: 1,
            },
            // acc +1
            {
                accumulator: 1,
                line: 2,
            },
            // jmp +4
            {
                accumulator: 1,
                line: 6,
            },
            // acc +3
            {
                accumulator: 4,
                line: 7,
            },
            // jmp -3
            {
                accumulator: 4,
                line: 4,
            },
            // acc -99
            {
                accumulator: -95,
                line: 5,
            },
            // acc +1
            {
                accumulator: -94,
                line: 6,
            },
            // jmp -4
            {
                accumulator: -94,
                line: 2,
            },
            // acc +6
            {
                accumulator: -88,
                line: 3,
            },
        ]);
    });
});

describe('applyInstructionsUntilLoop', () => {
    test('find the final state before loop', () => {
        applyInstructionsUntilLoop(state, exampleInput);
        expect(state).toEqual({
            accumulator: 5,
            line: 1,
        });
    });
});

describe('part1', () => {
    test('should find the result', () => {
        expect(part1()).toBe(2058);
    });
});
