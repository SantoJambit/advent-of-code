import * as fs from 'fs';

export function loadFile<T>(path: string, lineConverter: (line: string) => T) {
    const lines = fs.readFileSync(`./src/${path}`, 'utf-8').split('\n');
    return lines.filter((s) => !!s).map(lineConverter);
}
