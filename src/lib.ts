import * as fs from 'fs';

export function loadFile<T>(path: string) {
    return fs
        .readFileSync(`./src/${path}`, 'utf-8')
        .split('\n')
        .filter((s) => !!s);
}
