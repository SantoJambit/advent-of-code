import { loadFileGroupedByBlankLine, multiplyArray } from '../lib';

const tileIdRegex = /^Tile ([0-9]+):$/;

class Tile {
    id: string;
    borders: string[];
    possibleNeighbors: Tile[] = [];

    constructor(id: string, borders: string[]) {
        this.id = id;
        this.borders = borders;
    }

    testBorders(tile: Tile) {
        if (
            !this.possibleNeighbors.includes(tile) &&
            tile.borders.some((border) => this.borders.includes(border))
        ) {
            this.possibleNeighbors.push(tile);
            tile.possibleNeighbors.push(this);
        }
    }

    clone() {
        return new Tile(this.id, this.borders.slice());
    }
}

export function parseTile(lines: string[]) {
    const idLine = lines.shift();
    const match = tileIdRegex.exec(idLine);
    if (!match) throw new Error(`Not matching tile Id regex: ${idLine}`);

    const top = lines[0];
    const bottom = lines[lines.length - 1];
    const left = lines.map((s) => s[0]).join('');
    const right = lines.map((s) => s[s.length - 1]).join('');
    return new Tile(match[1], [
        top,
        left,
        right,
        bottom,
        top.split('').reverse().join(''),
        left.split('').reverse().join(''),
        right.split('').reverse().join(''),
        bottom.split('').reverse().join(''),
    ]);
}

export function getCornerIds(tiles: Tile[]) {
    for (const tile of tiles) {
        for (const tile2 of tiles) {
            if (tile !== tile2) tile.testBorders(tile2);
        }
    }

    const corners = tiles
        .filter((tile) => tile.possibleNeighbors.length === 2)
        .map((tile) => tile.id);
    if (corners.length !== 4)
        throw new Error(`Got ${corners.length} possible corners instead of 4`);
    return corners;
}

export function getCornerIdsMultiplied(tiles: Tile[]) {
    return multiplyArray(getCornerIds(tiles).map((id) => parseInt(id)));
}

const puzzleInput = loadFileGroupedByBlankLine('day20/input.txt').map(
    parseTile
);

export const part1 = () =>
    getCornerIdsMultiplied(puzzleInput.map((tile) => tile.clone()));
