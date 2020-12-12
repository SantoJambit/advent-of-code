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

export interface Point {
    east: number;
    north: number;
}

export interface ShipState extends Point {
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

export function rotatePoint(point: Point, angle: number) {
    const rad = -angle * (Math.PI / 180);
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const { east, north } = point;
    point.east = Math.round(east * cos - north * sin);
    point.north = Math.round(east * sin + north * cos);
}

export interface ShipState2 extends Point {
    waypoint: Point;
}

export function applyInstruction2(state: ShipState2, { action, value }: Instruction) {
    switch (action) {
        case 'N':
            state.waypoint.north += value;
            break;
        case 'S':
            state.waypoint.north -= value;
            break;
        case 'E':
            state.waypoint.east += value;
            break;
        case 'W':
            state.waypoint.east -= value;
            break;
        case 'L':
            rotatePoint(state.waypoint, -value);
            break;
        case 'R':
            rotatePoint(state.waypoint, value);
            break;
        case 'F':
            state.east += state.waypoint.east * value;
            state.north += state.waypoint.north * value;
            break;
    }
}

export function applyInstructions2(state: ShipState2, instructions: Instruction[]) {
    for (const instruction of instructions) {
        applyInstruction2(state, instruction);
    }
}

export function getManhattanDistance(state: Point) {
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

export const part2 = () => {
    const state: ShipState2 = {
        east: 0,
        north: 0,
        waypoint: {
            east: 10,
            north: 1,
        },
    };
    applyInstructions2(state, puzzleInput);
    return getManhattanDistance(state);
};
