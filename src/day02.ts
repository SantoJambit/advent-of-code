import { loadFile } from './lib';

export interface PasswordEntry {
    password: string;
    policy: PasswordPolicy;
}

export interface PasswordPolicy {
    letter: string;
    a: number;
    b: number;
}

const regex = /^([0-9]+)\-([0-9]+)\s+(.)\: (.*)$/;

export function parseInput(line: string): PasswordEntry {
    const x = regex.exec(line);
    if (!x || x.length !== 5) throw new Error('Invalid input' + line);
    const [_, a, b, letter, password] = x;
    return {
        policy: {
            letter,
            a: parseInt(a),
            b: parseInt(b),
        },
        password,
    };
}

export function testPasswordPolicy({ password, policy: { letter, a, b } }: PasswordEntry) {
    const count = password.split('').filter((c) => c === letter).length;
    return count >= a && count <= b;
}

export function testOfficialPasswordPolicy({ password, policy: { letter, a, b } }: PasswordEntry) {
    const matchA = password[a - 1] === letter;
    const matchB = password[b - 1] === letter;

    return matchA !== matchB;
}

export function countValidPasswords(
    entries: PasswordEntry[],
    test: (entry: PasswordEntry) => boolean,
) {
    return entries.filter(test).length;
}

const puzzleInput = loadFile('day02.input').map(parseInput);

export const part1 = () => countValidPasswords(puzzleInput, testPasswordPolicy);

export const part2 = () => countValidPasswords(puzzleInput, testOfficialPasswordPolicy);
