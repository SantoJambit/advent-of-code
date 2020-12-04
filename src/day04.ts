import { loadFileGroupedByBlankLine } from './lib';

export interface Passport {
    byr: string;
    iyr: string;
    eyr: string;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
    cid?: string;
}

export function batchToPassports(groups: string[][]): Partial<Passport>[] {
    return groups.map((group) => {
        const attributes = group.map((line) => line.split(' ')).flat();
        return attributes.reduce((acc, attribute) => {
            const [key, value] = attribute.split(':');
            acc[key] = value;
            return acc;
        }, {}) as Partial<Passport>;
    });
}

const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

export function isPassportValid(passport: Passport) {
    const keys = Object.keys(passport);
    return requiredKeys.every((key) => keys.includes(key));
}

const withinRange = (value: number, lo: number, hi: number) => value >= lo && value <= hi;
const heightRegex = /^([0-9]+)(cm|in)$/;
const hairColorRegex = /^#[0-9a-f]{6}$/;
const eyeColorRegex = /^(amb|blu|brn|gry|grn|hzl|oth)$/;
const pidRegex = /^[0-9]{9}$/;

export const validationRules = {
    byr: (s: string) => withinRange(parseInt(s), 1920, 2002),
    iyr: (s: string) => withinRange(parseInt(s), 2010, 2020),
    eyr: (s: string) => withinRange(parseInt(s), 2020, 2030),
    hgt: (s: string) => {
        const match = heightRegex.exec(s);
        if (!match) return false;
        const height = parseInt(match[1]);
        const unit = match[2];
        return unit === 'cm' ? withinRange(height, 150, 193) : withinRange(height, 59, 76);
    },
    hcl: (s: string) => hairColorRegex.test(s),
    ecl: (s: string) => eyeColorRegex.test(s),
    pid: (s: string) => pidRegex.test(s),
    cid: () => true,
};

export function isPassportValidStrict(passport: Passport) {
    if (!isPassportValid(passport)) return false;
    return Object.keys(passport)
        .map((key) => validationRules[key](passport[key]))
        .every((valid) => valid);
}

export function countValidPassports(passports: Partial<Passport>[]) {
    return passports.map(isPassportValid).filter((valid) => valid).length;
}

export function countValidPassportsStrict(passports: Partial<Passport>[]) {
    return passports.map(isPassportValidStrict).filter((valid) => valid).length;
}

const puzzleInput = batchToPassports(loadFileGroupedByBlankLine('day04.input'));

export const part1 = () => countValidPassports(puzzleInput);

export const part2 = () => countValidPassportsStrict(puzzleInput);
