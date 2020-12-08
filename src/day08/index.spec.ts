import {
    applyInstruction,
    applyInstructionsUntilLoop,
    BootState,
    runInstructionsWithFix,
    parseInstruction,
    part1,
    part2,
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
    test('should find the final state before loop', () => {
        expect(applyInstructionsUntilLoop(state, exampleInput)).toBe(true);
        expect(state).toEqual({
            accumulator: 5,
            line: 1,
        });
    });
});

describe('runInstructionsWithFix', () => {
    test('should return the instructions, trying to patch it and return the final state', () => {
        expect(runInstructionsWithFix(exampleInput)).toBe(8);
    });
});

describe('part1', () => {
    test('should find the result', () => {
        expect(part1()).toBe(2058);
    });
});

describe('part2', () => {
    test('should find the bogous line to fix the infinite loop', () => {
        expect(part2()).toBe(1000);
    });
});
