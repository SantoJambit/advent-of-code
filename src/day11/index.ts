import { addArray, loadFile } from '../lib';

function isSeatOccupied(input: string[], y: number, x: number) {
    return y >= 0 && y < input.length && x >= 0 && x < input[0].length && input[y][x] === '#';
}

function countNeighbours(input: string[], x: number, y: number) {
    return (
        (isSeatOccupied(input, y - 1, x - 1) ? 1 : 0) +
        (isSeatOccupied(input, y - 1, x) ? 1 : 0) +
        (isSeatOccupied(input, y - 1, x + 1) ? 1 : 0) +
        (isSeatOccupied(input, y, x - 1) ? 1 : 0) +
        (isSeatOccupied(input, y, x + 1) ? 1 : 0) +
        (isSeatOccupied(input, y + 1, x - 1) ? 1 : 0) +
        (isSeatOccupied(input, y + 1, x) ? 1 : 0) +
        (isSeatOccupied(input, y + 1, x + 1) ? 1 : 0)
    );
}

export function expectedRules(input: string[], x: number, y: number, currentValue: string) {
    switch (currentValue) {
        case '#':
            return countNeighbours(input, x, y) >= 4 ? 'L' : '#';
        case 'L':
            return countNeighbours(input, x, y) === 0 ? '#' : 'L';
    }
    return currentValue;
}

function canSeeOccupiedSeatInLine(input: string[], sx: number, sy: number, dx: number, dy: number) {
    let x = sx + dx;
    let y = sy + dy;

    while (x >= 0 && x < input[0].length && y >= 0 && y < input.length) {
        const c = input[y][x];
        if (c !== '.') return c === '#';
        x += dx;
        y += dy;
    }

    return false;
}

export function countVisibleOccupiedSeats(input: string[], x: number, y: number) {
    return (
        (canSeeOccupiedSeatInLine(input, x, y, -1, -1) ? 1 : 0) +
        (canSeeOccupiedSeatInLine(input, x, y, 0, -1) ? 1 : 0) +
        (canSeeOccupiedSeatInLine(input, x, y, 1, -1) ? 1 : 0) +
        (canSeeOccupiedSeatInLine(input, x, y, -1, 0) ? 1 : 0) +
        (canSeeOccupiedSeatInLine(input, x, y, 1, 0) ? 1 : 0) +
        (canSeeOccupiedSeatInLine(input, x, y, -1, 1) ? 1 : 0) +
        (canSeeOccupiedSeatInLine(input, x, y, 0, 1) ? 1 : 0) +
        (canSeeOccupiedSeatInLine(input, x, y, 1, 1) ? 1 : 0)
    );
}

export function actualRules(input: string[], x: number, y: number, currentValue: string) {
    switch (currentValue) {
        case '#':
            return countVisibleOccupiedSeats(input, x, y) >= 5 ? 'L' : '#';
        case 'L':
            return countVisibleOccupiedSeats(input, x, y) === 0 ? '#' : 'L';
    }
    return currentValue;
}

export function applyRules(
    input: string[],
    ruleHandler: (input: string[], x: number, y: number, currentValue: string) => string,
) {
    return input.map((line, y) => {
        return line
            .split('')
            .map((c, x) => ruleHandler(input, x, y, c))
            .join('');
    });
}

export function applyRulesUntilNoChange(
    input: string[],
    ruleHandler: (input: string[], x: number, y: number, currentValue: string) => string,
) {
    let prev = input;
    do {
        const next = applyRules(prev, ruleHandler);
        if (prev.every((line, index) => line === next[index])) break;
        prev = next;
    } while (true);
    return prev;
}

export function countOccupiedSeats(input: string[]) {
    return addArray(input.map((line) => line.replace(/[L.]/g, '').length));
}

const puzzleInput = loadFile('day11/input.txt');

export const part1 = () => countOccupiedSeats(applyRulesUntilNoChange(puzzleInput, expectedRules));

export const part2 = () => countOccupiedSeats(applyRulesUntilNoChange(puzzleInput, actualRules));
