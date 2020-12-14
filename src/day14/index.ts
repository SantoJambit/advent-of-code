import { loadFile } from '../lib';

const writeMemoryRegex = /^mem\[([0-9]+)\] = ([0-9]+)$/;
const maskRegex = /^mask = ([01X]{36})$/;

interface WriteMemory {
    type: 'mem';
    address: number;
    value: bigint;
}

interface Mask {
    type: 'mask';
    value: string;
}

type Instruction = WriteMemory | Mask;

export function parseInstructions(line: string): Instruction {
    let match = writeMemoryRegex.exec(line);
    if (match) {
        return {
            type: 'mem',
            address: parseInt(match[1]),
            value: BigInt(match[2]),
        };
    }
    match = maskRegex.exec(line);
    if (match) {
        return {
            type: 'mask',
            value: match[1],
        };
    }
    throw new Error(`Invalid instruction: ${line}`);
}

export function applyMask(mask: string, value: bigint) {
    for (let i = 0; i < mask.length; i++) {
        const c = mask[i];
        if (c === 'X') continue;
        const m = BigInt(1) << BigInt(mask.length - i - 1);
        if (c === '1') value |= m;
        else value = ~(~value | m);
    }
    return value;
}

export function applyInstructions(instructions: Instruction[]) {
    let mask = 'X'.repeat(36);
    const memory: { [s: string]: bigint } = {};
    for (const instruction of instructions) {
        if (instruction.type === 'mask') {
            mask = instruction.value;
        } else {
            memory[instruction.address] = applyMask(mask, instruction.value);
        }
    }
    return memory;
}

export function getSumOfMemoryValues(memory: { [s: string]: bigint }) {
    let sum = BigInt(0);
    for (const key in memory) {
        sum += memory[key];
    }
    return sum;
}

const puzzleInput = loadFile('day14/input.txt').map(parseInstructions);

export const part1 = () => getSumOfMemoryValues(applyInstructions(puzzleInput));
