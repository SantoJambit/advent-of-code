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

export function countValidPassports(passports: Partial<Passport>[]) {
    return passports.map(isPassportValid).filter((valid) => valid).length;
}

const puzzleInput = batchToPassports(loadFileGroupedByBlankLine('day04.input'));

export const part1 = () => countValidPassports(puzzleInput);
