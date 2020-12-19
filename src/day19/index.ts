import { loadFileGroupedByBlankLine } from '../lib';

const finalRuleRegex = /^"(.)"$/;

interface Rule {
    key: string;
    value?: string;
    subRules?: number[][];
}

export function prepareRule(rule: Rule, rules: { [s: string]: Rule }) {
    if (!rule.value) {
        rule.value = rule.subRules
            .map((sub) => {
                const r = sub
                    .map((key) => prepareRule(rules[key], rules))
                    .join('');
                if (sub.length) return `(${r})`;
                return r;
            })
            .join('|');
        if (rule.subRules.length > 1) rule.value = `(${rule.value})`;
    }
    return rule.value;
}

export function compileRule(lines: string[], key: string) {
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
            const subRules = parts[1]
                .split(' | ')
                .map((p) => p.split(' ').map((e) => parseInt(e)));
            rules[key] = {
                key,
                subRules,
            };
        }
    }

    return new RegExp(`^${prepareRule(rules[key], rules)}$`);
}

export function countValidMessages(rule: RegExp, messages: string[]) {
    return messages.filter((message) => rule.test(message)).length;
}

const puzzleInput = loadFileGroupedByBlankLine('day19/input.txt');

export const part1 = () =>
    countValidMessages(compileRule(puzzleInput[0], '0'), puzzleInput[1]);
