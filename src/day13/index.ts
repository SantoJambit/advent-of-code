import { addArray, loadFile, multiplyArray } from '../lib';

interface Schedule {
    earliestTimestamp: number;
    buses: Array<number | null>;
}

export function parseSchedule(lines: string[]): Schedule {
    return {
        earliestTimestamp: parseInt(lines[0]),
        buses: lines[1].split(',').map((s) => (s !== 'x' ? parseInt(s) : null)),
    };
}

export function getNextBusDeparture({ earliestTimestamp, buses }: Schedule) {
    const earliestDepartures = buses
        .filter((bus) => bus !== null)
        .map((bus) => {
            const departure = Math.ceil(earliestTimestamp / bus) * bus;
            return { bus, departure };
        });
    return earliestDepartures.sort((a, b) => a.departure - b.departure)[0];
}

export function getResult1(schedule: Schedule) {
    const { bus, departure } = getNextBusDeparture(schedule);
    return (departure - schedule.earliestTimestamp) * bus;
}

export function chineseRemainder(mods: bigint[], rests: bigint[]) {
    let xs = mods.map(() => BigInt(1));
    for (let i = 0; i < mods.length; i++) {
        const r = mods[i];
        for (let j = 0; j < mods.length; j++) {
            if (j !== i) xs[j] *= r;
        }
    }
    let sum = BigInt(0);
    const bigOne = BigInt(1);
    for (let i = 0; i < mods.length; i++) {
        const mod = mods[i];
        const rest = rests[i];
        const x = xs[i] % mod;
        let f = BigInt(1);
        while ((x * f) % mod !== bigOne) f++;
        sum += xs[i] * f * rest;
    }
    return sum % mods.slice(1).reduce((a, b) => a * b, mods[0]);
}

export function findTimestampForMinuteDeparture(buses: Array<number | null>) {
    const values = buses.map((mod, rest) => ({ mod, rest: rest })).filter((v) => v.mod !== null);
    const offset = buses.length + 1;
    const mods = values.map((v) => BigInt(v.mod));
    const rests = values.map((v) => BigInt(offset - v.rest));
    return chineseRemainder(mods, rests) - BigInt(offset);
}

const puzzleInput = parseSchedule(loadFile('day13/input.txt'));

export const part1 = () => getResult1(puzzleInput);

export const part2 = () => findTimestampForMinuteDeparture(puzzleInput.buses);
