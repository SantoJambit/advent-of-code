import { loadFile } from '../lib';

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

export function countPossibleContainerColors(rules: Rule[], color: string) {
    const colors = getPossibleDirectContainerColors(rules, color);
    let colorsToCheck = colors;
    do {
        let nextColors = [];
        for (const color2 of colorsToCheck) {
            const additionalColors = getPossibleDirectContainerColors(rules, color2);
            for (const color3 of additionalColors) {
                if (!colors.includes(color3)) {
                    colors.push(color3);
                    nextColors.push(color3);
                }
            }
        }
        if (nextColors.length === 0) return colors.length;
        colorsToCheck = nextColors;
    } while (true);
}

const puzzleInput = loadFile('day07/input.txt').map(parseRule);

export const part1 = () => countPossibleContainerColors(puzzleInput, 'shiny gold');
