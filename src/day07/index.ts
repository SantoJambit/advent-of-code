import { addArray, loadFile } from '../lib';

const ruleRegex = /^(.*) bags contain (.*).$/;
const bagRegex = /^([0-9]+) (.*) bags?$/;

export interface BagRule {
    color: string;
    count: number;
}

export interface Rule {
    color: string;
    bags: BagRule[];
}

export function parseBagRule(part: string): BagRule {
    const match2 = bagRegex.exec(part);
    if (!match2) throw new Error(`Ilformed bag expression "${part}" in rule`);
    const [, max, color] = match2;
    return {
        color,
        count: parseInt(max),
    };
}

export function parseRule(line: string): Rule {
    const match = ruleRegex.exec(line);
    if (!match) throw new Error('Ilformed rule');
    const [, color, content] = match;
    if (content === 'no other bags') return { color, bags: [] };
    const bags = content.split(', ').map(parseBagRule);
    return {
        color,
        bags,
    };
}

export function getPossibleDirectContainerColors(rules: Rule[], color: string) {
    return rules
        .filter((rule) => rule.bags.some((bagRule) => bagRule.color === color))
        .map((rule) => rule.color);
}

export function getPossibleContainerColors(rules: Rule[], color: string, out: Set<string>) {
    const colors = getPossibleDirectContainerColors(rules, color);
    for (const c of colors) {
        out.add(c);
        getPossibleContainerColors(rules, c, out);
    }
    return out;
}

export function countPossibleContainerColors(rules: Rule[], color: string) {
    return getPossibleContainerColors(rules, color, new Set()).size;
}

export function countRequiredIndividualBags(rules: Rule[], color: string) {
    const rule = rules.find((rule) => rule.color === color);
    if (!rule) throw new Error(`Rule not found for color "${color}"`);

    return addArray(
        rule.bags.map(
            (bagRule) =>
                bagRule.count + bagRule.count * countRequiredIndividualBags(rules, bagRule.color),
        ),
    );
}

const puzzleInput = loadFile('day07/input.txt').map(parseRule);

export const part1 = () => countPossibleContainerColors(puzzleInput, 'shiny gold');

export const part2 = () => countRequiredIndividualBags(puzzleInput, 'shiny gold');
