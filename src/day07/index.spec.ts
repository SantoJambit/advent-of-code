import { countPossibleContainerColors, parseRule, part1, Rule } from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day07/example.txt');
const exampleRules: Rule[] = [
    {
        color: 'light red',
        bags: [
            { count: 1, color: 'bright white' },
            { count: 2, color: 'muted yellow' },
        ],
    },
    {
        color: 'dark orange',
        bags: [
            { count: 3, color: 'bright white' },
            { count: 4, color: 'muted yellow' },
        ],
    },
    {
        color: 'bright white',
        bags: [{ count: 1, color: 'shiny gold' }],
    },
    {
        color: 'muted yellow',
        bags: [
            { count: 2, color: 'shiny gold' },
            { count: 9, color: 'faded blue' },
        ],
    },
    {
        color: 'shiny gold',
        bags: [
            { count: 1, color: 'dark olive' },
            { count: 2, color: 'vibrant plum' },
        ],
    },
    {
        color: 'dark olive',
        bags: [
            { count: 3, color: 'faded blue' },
            { count: 4, color: 'dotted black' },
        ],
    },
    {
        color: 'vibrant plum',
        bags: [
            { count: 5, color: 'faded blue' },
            { count: 6, color: 'dotted black' },
        ],
    },
    {
        color: 'faded blue',
        bags: [],
    },
    {
        color: 'dotted black',
        bags: [],
    },
];

describe('parseRule', () => {
    test('should parse the example rules correctly', () => {
        expect(exampleInput.map(parseRule)).toEqual(exampleRules);
    });
});

describe('countPossibleContainerColors', () => {
    test('should find out how many bag colors are required to carry at least one shiny gold bag in another bag with the example rules', () => {
        expect(countPossibleContainerColors(exampleRules, 'shiny gold')).toBe(4);
    });
});

describe('part1', () => {
    test('should find out how many bag colors are required to carry at least one shiny gold bag in another bag with the puzzle rules', () => {
        expect(part1()).toBe(128);
    });
});
