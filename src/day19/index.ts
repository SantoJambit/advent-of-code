import { loadFileGroupedByBlankLine } from '../lib';

const finalRuleRegex = /^"(.)"$/;

interface Rule {
    key: string;
    value?: string;
    subRules?: string[][];
}

export function prepareRule(rule: Rule, rules: { [s: string]: Rule }) {
    if (!rule.value) {
        rule.value = rule.subRules
            .map((sub) => {
                const r = sub
                    .map((key) => prepareRule(rules[key], rules))
                    .join('');
                if (sub.length) return `(?:${r})`;
                return r;
            })
            .join('|');
        if (rule.subRules.length > 1) rule.value = `(?:${rule.value})`;
    }
    return rule.value;
}

function prepareRuleMap(lines: string[]) {
    const rules: { [s: string]: Rule } = {};
    for (const line of lines) {
        const parts = line.split(': ');
        const key = parts[0];
        let match = finalRuleRegex.exec(parts[1]);
        if (match) {
            rules[key] = {
                key,
                value: match[1],
            };
        } else {
            const subRules = parts[1].split(' | ').map((p) => p.split(' '));
            rules[key] = {
                key,
                subRules,
            };
        }
    }
    return rules;
}

export function compileRule(lines: string[], key: string) {
    const rules = prepareRuleMap(lines);
    return new RegExp(`^${prepareRule(rules[key], rules)}$`);
}

export function countValidMessages(rule: RegExp, messages: string[]) {
    return messages.filter((message) => rule.test(message)).length;
}

export function countValidMessages2(lines: string[], messages: string[]) {
    // Feels a bit like cheating, since it only works for this example. But I see no other option at this moment.
    const rules = prepareRuleMap(lines);
    const p42 = prepareRule(rules['42'], rules);
    const p31 = prepareRule(rules['31'], rules);
    const rule = new RegExp(`^((?:${p42})+)((?:${p31})+)$`);
    const rule42 = new RegExp(p42, 'g');
    const rule31 = new RegExp(p31, 'g');
    return messages.filter((message) => {
        const match = message.match(rule);
        if (!match) return false;
        const count42 = match[1].match(rule42).length;
        const count31 = match[2].match(rule31).length;

        return count42 > count31;
    }).length;
}

const puzzleInput = loadFileGroupedByBlankLine('day19/input.txt');
const puzzleInput2 = loadFileGroupedByBlankLine('day19/input2.txt');

export const part1 = () =>
    countValidMessages(compileRule(puzzleInput[0], '0'), puzzleInput[1]);

export const part2 = () =>
    countValidMessages2(puzzleInput2[0], puzzleInput2[1]);
