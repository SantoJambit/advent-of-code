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

export function applyMask2(mask: string, address: bigint) {
    const newAddress = address.toString(2).padStart(36, '0').split('');
    for (let i = 0; i < mask.length; i++) {
        const c = mask[i];
        if (c === '0') continue;
        newAddress[i] = c;
    }
    return newAddress.join('');
}

export function getModifiedAddressesRec(address: string, index: number, addresses: string[]) {
    while (address[index] !== 'X') {
        index++;
        if (index >= address.length) {
            addresses.push(address);
            return;
        }
    }
    const prefix = address.substr(0, index);
    const suffix = address.substr(index + 1);
    getModifiedAddressesRec(`${prefix}0${suffix}`, index + 1, addresses);
    getModifiedAddressesRec(`${prefix}1${suffix}`, index + 1, addresses);
}

export function getModifiedAddresses(mask: string, address: bigint) {
    const newAddress = applyMask2(mask, address);

    const addresses: string[] = [];
    getModifiedAddressesRec(newAddress, 0, addresses);
    return addresses;
}

export function applyInstructions2(instructions: Instruction[]) {
    let mask = 'X'.repeat(36);
    const memory: { [s: string]: bigint } = {};
    for (const instruction of instructions) {
        if (instruction.type === 'mask') {
            mask = instruction.value;
        } else {
            const addresses = getModifiedAddresses(mask, BigInt(instruction.address));
            for (const address of addresses) memory[address] = instruction.value;
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

export const part2 = () => getSumOfMemoryValues(applyInstructions2(puzzleInput));
