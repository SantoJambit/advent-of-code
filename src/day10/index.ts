import { loadFile } from '../lib';

export function countJoltDifferences(adapters: number[]) {
    let counts = [0, 0, 0];
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1] + 3);
    let last = 0;
    for (const adapter of adapters) {
        const diff = adapter - last;
        if (diff > 3 || diff <= 0) throw new Error(`Invalid diff: ${diff} (${last}-${adapter})`);
        counts[diff - 1]++;
        last = adapter;
    }
    return counts;
}

const puzzleInput = loadFile('day10/input.txt').map((s) => parseInt(s));

export const part1 = () => {
    const counts = countJoltDifferences(puzzleInput);
    return counts[0] * counts[2];
};
