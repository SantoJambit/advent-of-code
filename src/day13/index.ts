import { loadFile } from '../lib';

interface Schedule {
    referenceTimestamp: number;
    buses: number[];
}

export function parseSchedule(lines: string[]): Schedule {
    return {
        referenceTimestamp: parseInt(lines[0]),
        buses: lines[1]
            .split(',')
            .filter((s) => s !== 'x')
            .map((s) => parseInt(s)),
    };
}

export function getNextBusDeparture({ referenceTimestamp, buses }: Schedule) {
    const earliestDepartures = buses.map((bus) => {
        const departure = Math.ceil(referenceTimestamp / bus) * bus;
        return { bus, departure };
    });
    return earliestDepartures.sort((a, b) => a.departure - b.departure)[0];
}

export function getResult1(schedule: Schedule) {
    const { bus, departure } = getNextBusDeparture(schedule);
    return (departure - schedule.referenceTimestamp) * bus;
}

const puzzleInput = parseSchedule(loadFile('day13/input.txt'));

export const part1 = () => getResult1(puzzleInput);
