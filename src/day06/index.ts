import { addArray, loadFileGroupedByBlankLine } from '../lib';

export function getUniqueQuestionsForGroup(group: string[]) {
    return group
        .map((line) => line.split(''))
        .flat()
        .filter((ch, index, array) => array.indexOf(ch) === index);
}

export function getGroupYesCounts(group: string[]) {
    return getUniqueQuestionsForGroup(group).length;
}

export function sumYesCountsOfGroups(groups: string[][]) {
    return addArray(groups.map(getGroupYesCounts));
}

export function getGroupYesCountsFixed(group: string[]) {
    const questions = getUniqueQuestionsForGroup(group);
    return questions.filter((ch) => group.every((line) => line.includes(ch))).length;
}

export function sumYesCountsOfGroupsFixed(groups: string[][]) {
    return addArray(groups.map(getGroupYesCountsFixed));
}

const puzzleInput = loadFileGroupedByBlankLine('day06/input.txt');

export const part1 = () => sumYesCountsOfGroups(puzzleInput);
export const part2 = () => sumYesCountsOfGroupsFixed(puzzleInput);
