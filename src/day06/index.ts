import { addArray, loadFileGroupedByBlankLine } from "../lib";

export function getGroupYesCounts(group: string[]) {
    return group
        .map((line) => line.split(''))
        .flat()
        .filter((ch, index, array) => array.indexOf(ch) === index).length;
}

export function sumYesCountsOfGroups(groups: string[][]) {
    return addArray(groups.map(getGroupYesCounts));
}

const puzzleInput = loadFileGroupedByBlankLine('day06/input.txt');

export const part1 = () => sumYesCountsOfGroups(puzzleInput);
