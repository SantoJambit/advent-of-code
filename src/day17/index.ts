import { loadFile } from '../lib';

export function loadLayer(lines: string[], suffixCoords: string) {
    const cubes = new Set<string>();
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            if (line[x] === '#') cubes.add(`${x},${y},${suffixCoords}`);
        }
    }
    return cubes;
}

function getCubeNeighbors(cube: string): string[] {
    const coordinates = cube.split(',').map((s) => parseInt(s));
    let prefixes: number[][] = [[]];
    for (const c of coordinates) {
        const a = c - 1;
        const b = c + 1;
        const newPrefixes = [];
        for (const prefix of prefixes) {
            newPrefixes.push([...prefix, a]);
            newPrefixes.push([...prefix, b]);
            newPrefixes.push([...prefix, c]);
        }
        prefixes = newPrefixes;
    }
    const neighbors = prefixes.map((values) => values.join(','));
    return neighbors.filter((n) => n !== cube);
}

export function runCycle(cubes: Set<string>) {
    const cubesAfter = new Set<string>();
    const touchedNeighbors: { [s: string]: number } = {};
    for (const cube of cubes) {
        const neighbors = getCubeNeighbors(cube);
        let activeNeighbors = 0;
        for (const n of neighbors) {
            if (cubes.has(n)) {
                activeNeighbors++;
            } else {
                if (n in touchedNeighbors) touchedNeighbors[n]++;
                else touchedNeighbors[n] = 1;
            }
        }
        // If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
        if (activeNeighbors === 2 || activeNeighbors === 3)
            cubesAfter.add(cube);
    }
    // If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
    for (const cube in touchedNeighbors) {
        if (touchedNeighbors[cube] === 3) cubesAfter.add(cube);
    }
    return cubesAfter;
}

const puzzleInput3 = loadLayer(loadFile('day17/input.txt'), '0');
const puzzleInput4 = loadLayer(loadFile('day17/input.txt'), '0,0');

export const part1 = () => {
    let next = puzzleInput3;
    for (let i = 0; i < 6; i++) next = runCycle(next);
    return next.size;
};

export const part2 = () => {
    let next = puzzleInput4;
    for (let i = 0; i < 6; i++) next = runCycle(next);
    return next.size;
};
