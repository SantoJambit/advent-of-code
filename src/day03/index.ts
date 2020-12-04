import { loadFile, multiplyArray } from '../lib';

export const puzzleInput = loadFile('day03/input.txt');

export const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];

export function countTreesForSlope(level: string[], dx: number, dy: number) {
    let x = 0;
    let y = 0;
    let trees = 0;
    const width = level[0].length;
    while (y < level.length) {
        if (level[y][x] !== '.') trees++;
        x = (x + dx) % width;
        y += dy;
    }
    return trees;
}

export const part1 = () => countTreesForSlope(puzzleInput, slopes[1][0], slopes[1][1]);

export const part2 = () =>
    multiplyArray(slopes.map(([x, y]) => countTreesForSlope(puzzleInput, x, y)));
