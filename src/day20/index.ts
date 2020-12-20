import {
    addArray,
    loadFile,
    loadFileGroupedByBlankLine,
    multiplyArray,
} from '../lib';

const tileIdRegex = /^Tile ([0-9]+):$/;

function reverseString(str: string) {
    return str.split('').reverse().join('');
}

export function flipImageHorizontal(data: string[]) {
    return data.map(reverseString);
}

export function flipImageVertical(data: string[]) {
    return data.slice().reverse();
}

export function rotateImage(data: string[]) {
    // Rotate clockwise
    const firstLine = data[0].split('');
    return firstLine.map((_, i) =>
        data
            .map((line) => line[i])
            .reverse()
            .join('')
    );
}

class Tile {
    id: string;
    data: string[];
    borders: string[];
    unusedBorders: string[];
    possibleNeighbors: Tile[] = [];
    fixedNeighbors: Array<Tile | undefined> = [
        undefined,
        undefined,
        undefined,
        undefined,
    ];

    constructor(id: string, data: string[]) {
        this.data = data;
        this.id = id;
        this.updateBorders();
        this.unusedBorders = this.borders.slice();
    }

    updateBorders() {
        const top = this.data[0];
        const bottom = this.data[this.data.length - 1];
        const left = this.data.map((s) => s[0]).join('');
        const right = this.data.map((s) => s[s.length - 1]).join('');
        this.borders = [
            top,
            left,
            bottom,
            right,
            reverseString(top),
            reverseString(left),
            reverseString(bottom),
            reverseString(right),
        ];
    }

    flipHorizontal() {
        this.data = this.data.map(reverseString);
        this.updateBorders();
        const tempN = this.fixedNeighbors[1];
        this.fixedNeighbors[1] = this.fixedNeighbors[3];
        this.fixedNeighbors[3] = tempN;
    }

    flipVertical() {
        this.data.reverse();
        this.updateBorders();
        const tempN = this.fixedNeighbors[0];
        this.fixedNeighbors[0] = this.fixedNeighbors[2];
        this.fixedNeighbors[2] = tempN;
    }

    rotate() {
        // Rotate clockwise
        const firstLine = this.data[0].split('');
        this.data = firstLine.map((_, i) =>
            this.data
                .map((line) => line[i])
                .reverse()
                .join('')
        );

        this.fixedNeighbors = [
            this.fixedNeighbors[1],
            this.fixedNeighbors[2],
            this.fixedNeighbors[3],
            this.fixedNeighbors[0],
        ];
        this.updateBorders();
    }

    clone() {
        return new Tile(this.id, this.data.slice());
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

    fixNeighbors() {
        let changed = false;
        for (let i = 0; i < 4; i++) {
            if (this.fixedNeighbors[i]) continue;
            const border = this.borders[i];
            const reverseBorder = this.borders[i + 4];
            const filtered = this.possibleNeighbors.filter((tile) =>
                tile.unusedBorders.includes(border)
            );
            if (filtered.length === 1) {
                changed = true;
                const tile = filtered[0];
                this.fixedNeighbors[i] = tile;
                tile.unusedBorders = tile.unusedBorders.filter(
                    (b) => b !== border && b !== reverseBorder
                );
            }
        }
        return changed;
    }

    tryFixOrientation(
        border: string,
        direction: number,
        oppositeIndex: number
    ) {
        // Already oriented correctly
        if (border === this.borders[oppositeIndex]) {
            // console.log('already done');
            return true;
        }
        // Same side, only one flip required
        if (border === this.borders[direction]) {
            // console.log('Same side, only one flip required');
            if (direction % 2) this.flipHorizontal();
            else this.flipVertical();
            return true;
        }
        // Same side and reversed, flip twice
        if (border === this.borders[direction + 4]) {
            // console.log('Same side and reversed, flip twice');
            this.flipHorizontal();
            this.flipVertical();
            return true;
        }
        // Opposite side but reversed, only one flip required
        if (border === this.borders[oppositeIndex + 4]) {
            // console.log('Opposite side but reversed, only one flip required');
            if (direction % 2) this.flipVertical();
            else this.flipHorizontal();
            return true;
        }
        return false;
    }

    orientationFixed = false;
    fixOrientation() {
        // console.log(this.id);
        if (this.orientationFixed) {
            // console.log("already fixed");
            return;
        }
        this.orientationFixed = true;
        for (let i = 0; i < 4; i++) {
            const tile = this.fixedNeighbors[i];
            if (tile) {
                // tile.orientationFixed = true;
                const border = this.borders[i];
                const oppositeIndex = (i + 2) % 4;
                if (!tile.tryFixOrientation(border, i, oppositeIndex)) {
                    tile.rotate();
                    const r = tile.tryFixOrientation(border, i, oppositeIndex);
                    if (!r) throw new Error('not fixed after rotating either');
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            const tile = this.fixedNeighbors[i];
            if (tile) tile.fixOrientation();
        }
    }
}

export function parseTile(lines: string[]) {
    const idLine = lines.shift();
    const match = tileIdRegex.exec(idLine);
    if (!match) throw new Error(`Not matching tile Id regex: ${idLine}`);
    return new Tile(match[1], lines);
}

export function getCorners(tiles: Tile[]) {
    for (const tile of tiles) {
        for (const tile2 of tiles) {
            if (tile !== tile2) tile.testBorders(tile2);
        }
    }

    const corners = tiles.filter((tile) => tile.possibleNeighbors.length === 2);
    if (corners.length !== 4)
        throw new Error(`Got ${corners.length} possible corners instead of 4`);
    return corners;
}

export function getCornerIdsMultiplied(tiles: Tile[]) {
    return multiplyArray(getCorners(tiles).map((tile) => parseInt(tile.id)));
}

export function combineImage(tiles: Tile[]) {
    const corners = getCorners(tiles);
    for (const corner of corners) {
        corner.fixNeighbors();
    }
    let changed = true;
    do {
        changed = false;
        for (const tile of tiles) {
            if (tile.fixNeighbors()) changed = true;
        }
    } while (changed);

    // start by fixing one corner, recursive
    corners[0].fixOrientation();
    let rowStart = tiles.find(
        (tile) => !tile.fixedNeighbors[0] && !tile.fixedNeighbors[1]
    );

    let out: string[] = [];
    while (rowStart) {
        const nextStart = rowStart.fixedNeighbors[2];
        for (let row = 1; row < rowStart.data[0].length - 1; row++) {
            let data: string[] = [];
            for (let tile = rowStart; tile; tile = tile.fixedNeighbors[3]) {
                const line = tile.data[row];
                data.push(line.substr(1, line.length - 2));
            }
            out.push(data.join(''));
        }
        rowStart = nextStart;
    }
    return out;
}

export const monsterTemplate = loadFile('day20/monster.txt');

export function getWaterRoughness(image: string[]) {
    const monsters = [monsterTemplate];
    for (let i = 0; i < 3; i++) {
        monsters.push(rotateImage(monsters[monsters.length - 1]));
    }
    const addMonsters = [];
    for (const mon of monsters) {
        const horz = flipImageHorizontal(mon);
        addMonsters.push(horz);
        addMonsters.push(flipImageVertical(mon));
        addMonsters.push(flipImageVertical(horz));
    }

    const uniqueMonsters = monsters
        .concat(addMonsters)
        .filter((mon, i, list) => {
            return (
                list.findIndex((mon2) => {
                    if (mon.length !== mon2.length) return false;
                    return mon.every((line, i) => line === mon2[i]);
                }) !== i
            );
        });

    for (const monster of uniqueMonsters) {
        const width = monster[0].length;
        const height = monster.length;
        let count = 0;
        const modified = image.slice().map((line) => line.split(''));
        for (let y = 0; y < modified[0].length - height; y++) {
            for (let x = 0; x < modified.length - width; x++) {
                if (testMonster(x, y, modified, monster)) {
                    count++;
                    markMonster(x, y, modified, monster);
                }
            }
        }
        if (count) {
            return addArray(
                modified.map((line) => line.filter((c) => c === '#').length)
            );
        }
    }
    return 0;
}

function testMonster(
    ix: number,
    iy: number,
    image: string[][],
    monster: string[]
) {
    const width = monster[0].length;
    const height = monster.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (monster[y][x] === '#' && image[iy + y][ix + x] !== '#')
                return false;
        }
    }
    return true;
}

function markMonster(
    ix: number,
    iy: number,
    image: string[][],
    monster: string[]
) {
    const width = monster[0].length;
    const height = monster.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (monster[y][x] === '#') image[iy + y][ix + x] = '0';
        }
    }
    return true;
}

const puzzleInput = loadFileGroupedByBlankLine('day20/input.txt').map(
    parseTile
);

export const part1 = () =>
    getCornerIdsMultiplied(puzzleInput.map((tile) => tile.clone()));

export const part2 = () =>
    getWaterRoughness(combineImage(puzzleInput.map((tile) => tile.clone())));
