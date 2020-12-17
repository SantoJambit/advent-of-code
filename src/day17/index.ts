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

export function getCubeNeighbors3(cube: string): string[] {
    const [x, y, z] = cube.split(',').map((s) => parseInt(s));
    const neighbors: string[] = [];
    for (let dx = x - 1; dx < x + 2; dx++) {
        for (let dy = y - 1; dy < y + 2; dy++) {
            for (let dz = z - 1; dz < z + 2; dz++) {
                neighbors.push(`${dx},${dy},${dz}`);
            }
        }
    }
    return neighbors.filter((n) => n !== cube);
}

export function runCycle(cubes: Set<string>, getCubeNeighbors: (cube: string) => string[]) {
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
        if (activeNeighbors === 2 || activeNeighbors === 3) cubesAfter.add(cube);
    }
    // If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
    for (const cube in touchedNeighbors) {
        if (touchedNeighbors[cube] === 3) cubesAfter.add(cube);
    }
    return cubesAfter;
}

export function getCubeNeighbors4(cube: string): string[] {
    const [x, y, z, w] = cube.split(',').map((s) => parseInt(s));
    const neighbors: string[] = [];
    for (let dx = x - 1; dx < x + 2; dx++) {
        for (let dy = y - 1; dy < y + 2; dy++) {
            for (let dz = z - 1; dz < z + 2; dz++) {
                for (let dw = w - 1; dw < w + 2; dw++) {
                    neighbors.push(`${dx},${dy},${dz},${dw}`);
                }
            }
        }
    }
    return neighbors.filter((n) => n !== cube);
}

const puzzleInput3 = loadLayer(loadFile('day17/input.txt'), '0');
const puzzleInput4 = loadLayer(loadFile('day17/input.txt'), '0,0');

export const part1 = () => {
    let next = puzzleInput3;
    for (let i = 0; i < 6; i++) next = runCycle(next, getCubeNeighbors3);
    return next.size;
};

export const part2 = () => {
    let next = puzzleInput4;
    for (let i = 0; i < 6; i++) next = runCycle(next, getCubeNeighbors4);
    return next.size;
};
