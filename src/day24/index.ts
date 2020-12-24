import { loadFile } from '../lib';

const instructionRegex = /(e|w|se|sw|ne|nw)/;
const hexDirections = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0.5, dy: -1 },
    { dx: -0.5, dy: -1 },
    { dx: 0.5, dy: 1 },
    { dx: -0.5, dy: 1 },
];

interface Direction {
    dx: number;
    dy: number;
}

function getDirection(str: string) {
    switch (str) {
        case 'e':
            return { dx: 1, dy: 0 };
        case 'w':
            return { dx: -1, dy: 0 };
        case 'se':
            return { dx: 0.5, dy: -1 };
        case 'sw':
            return { dx: -0.5, dy: -1 };
        case 'ne':
            return { dx: 0.5, dy: 1 };
        case 'nw':
            return { dx: -0.5, dy: 1 };
    }
    throw new Error(`Unexpected token: "${str}"`);
}

export function parseDirections(line: string): Direction[] {
    return line
        .split(instructionRegex)
        .filter((v) => v)
        .map(getDirection);
}

function flipTiles(instructions: Direction[][]) {
    const blackTiles = new Set<string>();
    for (const directions of instructions) {
        let x = 0;
        let y = 0;
        for (const { dx, dy } of directions) {
            x += dx;
            y += dy;
        }
        const key = `${x}/${y}`;
        if (blackTiles.has(key)) blackTiles.delete(key);
        else blackTiles.add(key);
    }
    return blackTiles;
}

export function solution1(instructions: Direction[][]) {
    return flipTiles(instructions).size;
}

export function getNeighbors(key: string) {
    const [x, y] = key.split('/').map(parseFloat);
    return hexDirections.map(({ dx, dy }) => `${x + dx}/${y + dy}`);
}

function runDay(blackTiles: Set<string>) {
    const newBlackTiles = new Set<string>();
    const whiteTouched: { [s: string]: number } = {};
    for (const tile of blackTiles) {
        const neighbors = getNeighbors(tile);
        let blackNeighbors = 0;
        for (const neighbor of neighbors) {
            if (blackTiles.has(neighbor)) blackNeighbors++;
            else whiteTouched[neighbor] = (whiteTouched[neighbor] ?? 0) + 1;
        }
        if (blackNeighbors === 1 || blackNeighbors === 2)
            newBlackTiles.add(tile);
    }
    for (const tile in whiteTouched) {
        if (whiteTouched[tile] === 2) newBlackTiles.add(tile);
    }
    return newBlackTiles;
}

export function solution2(instructions: Direction[][]) {
    let blackTiles = flipTiles(instructions);
    for (let i = 0; i < 100; i++) blackTiles = runDay(blackTiles);
    return blackTiles.size;
}

const puzzleInput = loadFile('day24/input.txt').map(parseDirections);

export const part1 = () => solution1(puzzleInput);

export const part2 = () => solution2(puzzleInput);
