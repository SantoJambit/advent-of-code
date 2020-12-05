import { loadFile } from '../lib';

interface FindState {
    lo: number;
    hi: number;
}

function reduceState(state: FindState, lower: boolean) {
    const half = (state.hi - state.lo) / 2;
    if (lower) state.hi = state.lo + Math.floor(half);
    else state.lo = state.lo + Math.ceil(half);
}

export function getRow(seat: string) {
    const state: FindState = { lo: 0, hi: 127 };
    for (let i = 0; i < 7; i++) reduceState(state, seat[i] === 'F');
    return state.lo;
}

export function getColumn(seat: string) {
    const state: FindState = { lo: 0, hi: 7 };
    for (let i = 7; i < 10; i++) reduceState(state, seat[i] === 'L');
    return state.lo;
}

export function getSeatId(row: number, column: number) {
    return row * 8 + column;
}

const puzzleInput = loadFile('day05/input.txt');

export const part1 = () =>
    Math.max(...puzzleInput.map((seat) => getSeatId(getRow(seat), getColumn(seat))));

export const part2 = () => {
    const seatIds = puzzleInput
        .map((seat) => getSeatId(getRow(seat), getColumn(seat)))
        .sort((a, b) => a - b);

    let startFrom = 1;
    for (let id = seatIds[0] + 1; id < seatIds[seatIds.length - 1] - 1; id++) {
        const index = seatIds.indexOf(id, startFrom);

        if (index < 0 && seatIds.includes(id - 1) && seatIds.includes(id + 1)) return id;

        startFrom = index;
    }
    return null;
};
