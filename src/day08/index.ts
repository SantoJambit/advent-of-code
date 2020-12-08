import { loadFile } from '../lib';

export interface BootState {
    accumulator: number;
    line: number;
}

export type Operation = 'acc' | 'jmp' | 'nop';

export interface Instruction {
    operation: Operation;
    argument: number;
}

const instructionRegex = /^(acc|jmp|nop) ([+-][0-9]+)$/;

export function parseInstruction(line: string): Instruction {
    const match = instructionRegex.exec(line);
    if (!match) throw new Error(`Ilformed instruction: ${line}`);
    return {
        operation: match[1] as Operation,
        argument: parseInt(match[2]),
    };
}

export function applyInstruction(state: BootState, instruction: Instruction) {
    switch (instruction.operation) {
        case 'acc':
            state.accumulator += instruction.argument;
            state.line++;
            break;
        case 'nop':
            state.line++;
            break;
        case 'jmp':
            state.line += instruction.argument;
            break;
        default:
            throw new Error(`Unknown instruction ${instruction.operation}`);
    }
}

export function applyInstructionsUntilLoop(state: BootState, instructions: Instruction[]) {
    const lines = [state.line];
    do {
        const instruction = instructions[state.line];
        applyInstruction(state, instruction);
        if (lines.includes(state.line)) break;
        lines.push(state.line);
    } while (true);
}

const puzzleInput = loadFile('day08/input.txt').map(parseInstruction);

export const part1 = () => {
    const state = { accumulator: 0, line: 0 };
    applyInstructionsUntilLoop(state, puzzleInput);
    return state.accumulator;
};
