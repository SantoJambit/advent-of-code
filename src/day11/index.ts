import { addArray, loadFile } from '../lib';

function countNeighbours(input: string[], x: number, y: number) {
    return (
        (input[y - 1]?.[x - 1] === '#' ? 1 : 0) +
        (input[y - 1]?.[x] === '#' ? 1 : 0) +
        (input[y - 1]?.[x + 1] === '#' ? 1 : 0) +
        (input[y]?.[x - 1] === '#' ? 1 : 0) +
        (input[y]?.[x + 1] === '#' ? 1 : 0) +
        (input[y + 1]?.[x - 1] === '#' ? 1 : 0) +
        (input[y + 1]?.[x] === '#' ? 1 : 0) +
        (input[y + 1]?.[x + 1] === '#' ? 1 : 0)
    );
}

export function applyRules(input: string[]) {
    return input.map((line, y) => {
        return line
            .split('')
            .map((c, x) => {
                switch (c) {
                    case '#':
                        return countNeighbours(input, x, y) >= 4 ? 'L' : '#';
                    case 'L':
                        return countNeighbours(input, x, y) === 0 ? '#' : 'L';
                }
                return c;
            })
            .join('');
    });
}

export function applyRulesUntilNoChange(input: string[]) {
    let prev = input;
    do {
        const next = applyRules(prev);
        if (prev.every((line, index) => line === next[index])) break;
        prev = next;
    } while (true);
    return prev;
}

export function countOccupiedSeats(input: string[]) {
    return addArray(input.map((line) => line.replace(/[L.]/g, '').length));
}

const puzzleInput = loadFile('day11/input.txt');

export const part1 = () => countOccupiedSeats(applyRulesUntilNoChange(puzzleInput));
