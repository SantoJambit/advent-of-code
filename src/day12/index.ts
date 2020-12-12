import { loadFile } from '../lib';

const regex = /^([NSEWLRF])([0-9]+)$/;

export interface Instruction {
    action: string;
    value: number;
}

export function parseInstruction(line: string): Instruction {
    const match = regex.exec(line);
    if (!match) throw new Error(`Invalid instruction: "${line}"`);
    return {
        action: match[1],
        value: parseInt(match[2]),
    };
}

export interface ShipState {
    east: number;
    north: number;
    angle: number;
}

export function applyInstruction(state: ShipState, { action, value }: Instruction) {
    switch (action) {
        case 'N':
            state.north += value;
            break;
        case 'S':
            state.north -= value;
            break;
        case 'E':
            state.east += value;
            break;
        case 'W':
            state.east -= value;
            break;
        case 'L':
            state.angle = (state.angle - value) % 360;
            break;
        case 'R':
            state.angle = (state.angle + value) % 360;
            break;
        case 'F':
            const rad = -state.angle * (Math.PI / 180);
            state.east += Math.round(Math.cos(rad) * value);
            state.north += Math.round(Math.sin(rad) * value);
            break;
    }
}

export function applyInstructions(state: ShipState, instructions: Instruction[]) {
    for (const instruction of instructions) {
        applyInstruction(state, instruction);
    }
}

export function getManhattanDistance(state: ShipState) {
    return Math.abs(state.east) + Math.abs(state.north);
}

const puzzleInput = loadFile('day12/input.txt').map(parseInstruction);

export const part1 = () => {
    const state: ShipState = {
        east: 0,
        north: 0,
        angle: 0,
    };
    applyInstructions(state, puzzleInput);
    return getManhattanDistance(state);
};
