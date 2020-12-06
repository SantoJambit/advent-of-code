import { addArray, loadFileGroupedByBlankLine } from '../lib';

export function getGroupYesCounts(group: string[]) {
    const set = new Set<string>();
    for (const line of group) {
        for (const ch of line) set.add(ch);
    }
    return set.size;
}

export function sumYesCountsOfGroups(groups: string[][]) {
    return addArray(groups.map(getGroupYesCounts));
}

export function getGroupYesCountsFixed(group: string[]) {
    const set = new Set<string>(group[0]);
    for (const ch of set) {
        if (!group.every((line) => line.includes(ch))) set.delete(ch);
    }
    return set.size;
}

export function sumYesCountsOfGroupsFixed(groups: string[][]) {
    return addArray(groups.map(getGroupYesCountsFixed));
}

const puzzleInput = loadFileGroupedByBlankLine('day06/input.txt');

export const part1 = () => sumYesCountsOfGroups(puzzleInput);
export const part2 = () => sumYesCountsOfGroupsFixed(puzzleInput);
