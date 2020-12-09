import { loadFile } from '../lib';

export function isValidNumber(input: number[], preamble: number, index: number) {
    const value = input[index];
    const start = index - preamble;
    const lastCheck = index - 1;
    for (let a = start; a < lastCheck; a++) {
        for (let b = a + 1; b < index; b++) {
            if (a !== b && input[a] + input[b] === value) return true;
        }
    }
    return false;
}

export function getFirstInvalidNumber(input: number[], preamble: number) {
    for (let i = preamble; i < input.length; i++) {
        if (!isValidNumber(input, preamble, i)) return input[i];
    }
    return null;
}

export function getContiguousSliceForSum(input: number[], sum: number) {
    const lastCheck = input.length - 1;
    for (let a = 0; a < lastCheck; a++) {
        let c = input[a];
        for (let b = a + 1; b < input.length && c < sum; b++) {
            c += input[b];
            if (c === sum) return input.slice(a, b + 1);
        }
    }
    return null;
}

export function getEncryptionWeakness(input: number[], sum: number) {
    const slice = getContiguousSliceForSum(input, sum);
    return slice === null ? null : Math.max(...slice) + Math.min(...slice);
}

const puzzleInput = loadFile('day09/input.txt').map((s) => parseInt(s));

export const part1 = () => getFirstInvalidNumber(puzzleInput, 25);

export const part2 = () =>
    getEncryptionWeakness(puzzleInput, getFirstInvalidNumber(puzzleInput, 25));
