import { loadFile } from '../lib';

const instructionRegex = /(e|w|se|sw|ne|nw)/;

interface Direction {
    dx: number;
    dy: number;
}

export function parseDirections(line: string): Direction[] {
    return line
        .split(instructionRegex)
        .filter((v) => v)
        .map((v) => {
            switch (v) {
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
            throw new Error(`Unexpected token: "${v}"`);
        });
}

export function flipTiles(instructions: Direction[][]) {
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
    return blackTiles.size;
}

const puzzleInput = loadFile('day24/input.txt').map(parseDirections);

export const part1 = () => flipTiles(puzzleInput);
