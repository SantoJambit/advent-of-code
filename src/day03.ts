import { count } from 'console';

export function countTreesForSlope(level: string[], dx: number, dy: number) {
    let x = 0;
    let y = 0;
    let trees = 0;
    const width = level[0].length;
    while (y < level.length) {
        if (level[y][x] !== '.') trees++;
        x = (x + dx) % width;
        y += dy;
    }
    return trees;
}
