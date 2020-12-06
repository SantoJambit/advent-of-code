import * as fs from 'fs';

export function loadFileRaw(path: string) {
    return fs.readFileSync(`./src/${path}`, 'utf-8').split('\n');
}

export function loadFile(path: string) {
    return loadFileRaw(path).filter((s) => !!s);
}

export function groupLinesByBlankLine(lines: string[]) {
    const groups: string[][] = [];
    let group: string[] | null = null;
    for (const line of lines) {
        if (!group || !line) {
            group = [];
            groups.push(group);
        }
        if (line) group.push(line);
    }
    return groups;
}

export function loadFileGroupedByBlankLine(path: string) {
    return groupLinesByBlankLine(loadFileRaw(path));
}

export function multiplyArray(values: number[]) {
    return values.slice(1).reduce((a, b) => a * b, values[0]);
}

export function addArray(values: number[]) {
    return values.slice(1).reduce((a, b) => a + b, values[0]);
}
