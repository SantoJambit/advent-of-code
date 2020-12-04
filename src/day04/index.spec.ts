import {
    batchToPassports,
    countValidPassports,
    isPassportValid,
    Passport,
    part1,
    isPassportValidStrict,
    validationRules,
    countValidPassportsStrict,
    part2,
} from '.';
import { loadFileGroupedByBlankLine } from '../lib';

const exampleInput = loadFileGroupedByBlankLine('day04/example.txt');
const exampleInvalidPassports = loadFileGroupedByBlankLine('day04/invalidPassports.txt');
const exampleValidPassports = loadFileGroupedByBlankLine('day04/validPassports.txt');

const expectedExamplePassports: Partial<Passport>[] = [
    {
        ecl: 'gry',
        pid: '860033327',
        eyr: '2020',
        hcl: '#fffffd',
        byr: '1937',
        iyr: '2017',
        cid: '147',
        hgt: '183cm',
    },
    {
        iyr: '2013',
        ecl: 'amb',
        cid: '350',
        eyr: '2023',
        pid: '028048884',
        hcl: '#cfa07d',
        byr: '1929',
    },
    {
        hcl: '#ae17e1',
        iyr: '2013',
        eyr: '2024',
        ecl: 'brn',
        pid: '760753108',
        byr: '1931',
        hgt: '179cm',
    },
    {
        hcl: '#cfa07d',
        eyr: '2025',
        pid: '166559648',
        iyr: '2011',
        ecl: 'brn',
        hgt: '59in',
    },
];

describe('batchToPassports', () => {
    test('should convert example input correctly to passports', () => {
        expect(batchToPassports(exampleInput)).toEqual(expectedExamplePassports);
    });
});

describe('isPassportValid', () => {
    test('should check if a passport is valid', () => {
        expect(expectedExamplePassports.map(isPassportValid)).toEqual([true, false, true, false]);
    });
});

describe('validationRules', () => {
    test('should validate byr correctly', () => {
        expect(validationRules.byr('2002')).toBe(true);
        expect(validationRules.byr('2003')).toBe(false);
    });
    test('should validate hgt correctly', () => {
        expect(validationRules.hgt('60in')).toBe(true);
        expect(validationRules.hgt('190cm')).toBe(true);
        expect(validationRules.hgt('190in')).toBe(false);
        expect(validationRules.hgt('190')).toBe(false);
    });
    test('should validate hcl correctly', () => {
        expect(validationRules.hcl('#123abc')).toBe(true);
        expect(validationRules.hcl('#123abz')).toBe(false);
        expect(validationRules.hcl('123abc')).toBe(false);
    });
    test('should validate ecl correctly', () => {
        expect(validationRules.ecl('brn')).toBe(true);
        expect(validationRules.ecl('wat')).toBe(false);
    });
    test('should validate pid correctly', () => {
        expect(validationRules.pid('000000001')).toBe(true);
        expect(validationRules.pid('0123456789')).toBe(false);
    });
});

describe('isPassportValidStrict', () => {
    test('should return true for strictly valid passports', () => {
        expect(
            batchToPassports(exampleValidPassports)
                .map(isPassportValidStrict)
                .every((valid) => valid),
        ).toBe(true);
    });
    test('should return false for not strictly valid passports', () => {
        expect(
            batchToPassports(exampleInvalidPassports)
                .map(isPassportValidStrict)
                .every((valid) => !valid),
        ).toBe(true);
    });
});

describe('countValidPassports', () => {
    test('should count the valid passports of the example', () => {
        expect(countValidPassports(expectedExamplePassports)).toBe(2);
    });
    test('should count the valid passports of the puzzle', () => {
        expect(part1()).toBe(196);
    });
});

describe('countValidPassportsStrict', () => {
    test('should count the strictly valid passports of the example', () => {
        expect(
            countValidPassportsStrict([
                ...batchToPassports(exampleInvalidPassports),
                ...batchToPassports(exampleValidPassports),
            ]),
        ).toBe(4);
    });
    test('should count the stricly valid passports of the puzzle', () => {
        expect(part2()).toBe(114);
    });
});
