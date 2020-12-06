import {
    sumYesCountsOfGroups,
    getGroupYesCounts,
    part1,
    getGroupYesCountsFixed,
    sumYesCountsOfGroupsFixed,
    part2,
} from '.';
import { loadFileGroupedByBlankLine } from '../lib';

const exampleInput = loadFileGroupedByBlankLine('day06/example.txt');

describe('getGroupYesCounts', () => {
    test('should get yes counts of the example groups', () => {
        expect(exampleInput.map(getGroupYesCounts)).toEqual([3, 3, 3, 1, 1]);
    });
});

describe('sumYesCountsOfGroups', () => {
    test('should get the sum of yes counts of all example groups', () => {
        expect(sumYesCountsOfGroups(exampleInput)).toEqual(11);
    });
});

describe('getGroupYesCountsFixed', () => {
    test('should get yes counts of the example groups', () => {
        expect(exampleInput.map(getGroupYesCountsFixed)).toEqual([3, 0, 1, 1, 1]);
    });
});

describe('sumYesCountsOfGroupsFixed', () => {
    test('should get the sum of yes counts of all example groups', () => {
        expect(sumYesCountsOfGroupsFixed(exampleInput)).toEqual(6);
    });
});

describe('part1', () => {
    test('should get the sum of yes counts of all puzzle groups', () => {
        expect(part1()).toEqual(6530);
    });
});

describe('part2', () => {
    test('should get the sum of yes counts of all puzzle groups', () => {
        expect(part2()).toEqual(3323);
    });
});
