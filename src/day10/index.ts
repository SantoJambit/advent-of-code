import { loadFile } from '../lib';

export function countJoltDifferences(adapters: number[]) {
    let counts = [0, 0, 0];
    const values = adapters.slice().sort((a, b) => a - b);
    values.push(values[values.length - 1] + 3);
    let last = 0;
    for (const value of values) {
        const diff = value - last;
        if (diff > 3 || diff <= 0) throw new Error(`Invalid diff: ${diff} (${last}-${value})`);
        counts[diff - 1]++;
        last = value;
    }
    return counts;
}

function countJoltArrangementsRec(
    adapters: number[],
    skipIndex: number,
    prevValue: number,
    memo: { [s: string]: number },
) {
    const nextIndex = skipIndex + 1;
    if (nextIndex < adapters.length - 1) {
        const key = `${skipIndex}-${prevValue}`;
        let value = memo[key];
        if (!value) {
            const currentValue = adapters[skipIndex];
            const diff = adapters[nextIndex] - prevValue;
            value = countJoltArrangementsRec(adapters, nextIndex, currentValue, memo);
            // can't skip
            if (diff <= 3) value += countJoltArrangementsRec(adapters, nextIndex, prevValue, memo);

            memo[key] = value;
        }
        return value;
    }
    return 1;
}

export function countJoltArrangements(adapters: number[]) {
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1] + 3);
    return countJoltArrangementsRec(adapters, 0, 0, {});
}

const puzzleInput = loadFile('day10/input.txt').map((s) => parseInt(s));

export const part1 = () => {
    const counts = countJoltDifferences(puzzleInput);
    return counts[0] * counts[2];
};

export const part2 = () => countJoltArrangements(puzzleInput);
