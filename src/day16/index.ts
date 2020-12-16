import { addArray, loadFile, loadFileGroupedByBlankLine } from '../lib';

export interface Rule {
    type: string;
    range1: [number, number];
    range2: [number, number];
}

const ruleRegex = /^(.*): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)$/;

function parseRule(line: string): Rule {
    const match = ruleRegex.exec(line);
    if (!match) throw new Error(`Invalid rule: "${line}"`);

    const [_, type, range1a, range1b, range2a, range2b] = match;
    return {
        type,
        range1: [parseInt(range1a), parseInt(range1b)],
        range2: [parseInt(range2a), parseInt(range2b)],
    };
}

function parseTicket(line: string): number[] {
    return line.split(',').map((s) => parseInt(s));
}

export type TicketValues = number[];

export interface PuzzleInput {
    rules: Rule[];
    ticket: TicketValues;
    nearbyTickets: TicketValues[];
}

export function parseInput(groups: string[][]): PuzzleInput {
    if (groups.length !== 3) throw new Error(`Expected 3 groups in input, got ${groups.length}`);
    const yourTicketHeader = groups[1].shift();
    if (yourTicketHeader !== 'your ticket:')
        throw new Error(`Unexpected input: ${yourTicketHeader}`);
    const nearbyTicketsHeader = groups[2].shift();
    if (nearbyTicketsHeader !== 'nearby tickets:')
        throw new Error(`Unexpected input: ${nearbyTicketsHeader}`);

    return {
        rules: groups[0].map(parseRule),
        ticket: parseTicket(groups[1][0]),
        nearbyTickets: groups[2].map(parseTicket),
    };
}

function matchesRule(value: number, rule: Rule) {
    return (
        (value >= rule.range1[0] && value <= rule.range1[1]) ||
        (value >= rule.range2[0] && value <= rule.range2[1])
    );
}

export function getInvalidValues({ rules, nearbyTickets }: PuzzleInput): TicketValues {
    const result: TicketValues = [];
    for (const ticket of nearbyTickets) {
        for (const value of ticket) {
            if (!rules.some((rule) => matchesRule(value, rule))) {
                result.push(value);
            }
        }
    }
    return result;
}

export function getResult1(input: PuzzleInput) {
    return addArray(getInvalidValues(input));
}

const puzzleInput = parseInput(loadFileGroupedByBlankLine('day16/input.txt'));

export const part1 = () => getResult1(puzzleInput);
