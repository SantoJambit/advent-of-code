import { loadFile } from '../lib';

export function loadLayer(lines: string[]) {
    const cubes = new Set<string>();
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            if (line[x] === '#') cubes.add(`${x},${y},0`);
        }
    }
    return cubes;
}

function getCubeNeighbors(x: number, y: number, z: number): string[] {
    const l = x - 1; // left
    const r = x + 1; // right
    const u = y - 1; // under
    const a = y + 1; // above
    const b = z - 1; // back
    const f = z + 1; // front
    return [
        `${l},${u},${b}`,
        `${l},${u},${z}`,
        `${l},${u},${f}`,
        `${l},${y},${b}`,
        `${l},${y},${z}`,
        `${l},${y},${f}`,
        `${l},${a},${b}`,
        `${l},${a},${z}`,
        `${l},${a},${f}`,
        `${x},${u},${b}`,
        `${x},${u},${z}`,
        `${x},${u},${f}`,
        `${x},${y},${b}`,
        `${x},${y},${f}`,
        `${x},${a},${b}`,
        `${x},${a},${z}`,
        `${x},${a},${f}`,
        `${r},${u},${b}`,
        `${r},${u},${z}`,
        `${r},${u},${f}`,
        `${r},${y},${b}`,
        `${r},${y},${z}`,
        `${r},${y},${f}`,
        `${r},${a},${b}`,
        `${r},${a},${z}`,
        `${r},${a},${f}`,
    ];
}

export function runCycle(cubes: Set<string>) {
    const cubesAfter = new Set<string>();
    const touchedNeighbors: { [s: string]: number } = {};
    for (const cube of cubes) {
        const c = cube.split(',').map((s) => parseInt(s));
        const neighbors = getCubeNeighbors(c[0], c[1], c[2]);
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

const puzzleInput = loadLayer(loadFile('day17/input.txt'));

export const part1 = () => {
    let next = puzzleInput;
    for (let i = 0; i < 6; i++) next = runCycle(next);
    return next.size;
};
