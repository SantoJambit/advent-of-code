import { loadFile, multiplyArray } from '../lib';

const puzzleInput = loadFile('day01/input.txt').map((s) => parseInt(s, 10));

export function findSummands(sum: number, possibleSummands: number[]) {
    for (const a of possibleSummands) {
        const b = possibleSummands.find((s) => a + s === sum);
        if (b || b === 0) return [a, b];
    }
    return null;
}

export function findAnswer(sum: number, possibleSummands: number[]) {
    return multiplyArray(findSummands(sum, possibleSummands));
}

export function findSummands2(sum: number, possibleSummands: number[]) {
    for (const a of possibleSummands) {
        for (const b of possibleSummands) {
            const ab = a + b;
            const c = possibleSummands.find((s) => ab + s === sum);
            if (c || c === 0) return [a, b, c];
        }
    }
    return null;
}

export function findAnswer2(sum: number, possibleSummands: number[]) {
    return multiplyArray(findSummands2(sum, possibleSummands));
}

export const part1 = () => findAnswer(2020, puzzleInput);
export const part2 = () => findAnswer2(2020, puzzleInput);
