import { performance } from 'perf_hooks';

const daysFinished = 3;
const fractionDigits = 3;
const warmupFrames = Array.from({ length: 20 });
const iterationFrames = Array.from({ length: 100 });

function measureMedian(fn: () => void) {
    warmupFrames.forEach(fn);
    const times = iterationFrames
        .map(() => {
            const start = performance.now();
            fn();
            return performance.now() - start;
        })
        .sort();
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
