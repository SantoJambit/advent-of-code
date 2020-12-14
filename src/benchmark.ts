import { performance } from 'perf_hooks';

const daysFinished = 13;
const fractionDigits = 3;
const warmupConfig = {
    minFrames: 2,
    maxFrames: 20,
    maxTime: 100,
};
const iterationConfig = {
    minFrames: 3,
    maxFrames: 100,
    maxTime: 500,
};

type IterationConfig = typeof iterationConfig;

function measureTimes(fn: () => void, { minFrames, maxFrames, maxTime }: IterationConfig) {
    const totalStart = performance.now();
    let frames = 0;
    const times: number[] = [];
    do {
        const start = performance.now();
        fn();
        times.push(performance.now() - start);
        frames++;
    } while (
        frames < minFrames ||
        (frames < maxFrames && performance.now() - totalStart < maxTime)
    );
    return times;
}

function measureMedian(fn: () => void) {
    measureTimes(fn, warmupConfig);
    const times = measureTimes(fn, iterationConfig).sort();
    const medianTime = times[Math.round(times.length / 2)];
    return `${medianTime.toFixed(fractionDigits)} ms`;
}

const rows: [string, string, string][] = [];

for (let day = 1; day <= daysFinished; day++) {
    const { part1, part2 } = require(`./day${day.toString().padStart(2, '0')}`);
    rows.push([day.toString(), measureMedian(part1), measureMedian(part2)]);
}

const header = ['Day', 'Part 1', 'Part 2'];
const lengths = header.map((label, index) =>
    Math.max(label.length, ...rows.map((columns) => columns[index].length)),
);

const pad = (v: string, i: number) => v.padStart(lengths[i], ' ');

console.log(`| ${header.map(pad).join(' | ')} |`);
console.log(`| ${lengths.map((length) => '-'.repeat(length - 1)).join(': | ')}: |`);

for (const row of rows) {
    console.log(`| ${row.map(pad).join(' | ')} |`);
}
