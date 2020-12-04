import { batchToPassports, countValidPassports, isPassportValid, Passport, part1 } from './day04';
import { loadFileGroupedByBlankLine } from './lib';

const exampleInput = loadFileGroupedByBlankLine('day04.example');

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

describe('countValidPassports', () => {
    test('should count the valid passports of the example', () => {
        expect(countValidPassports(expectedExamplePassports)).toBe(2);
    });
    test('should count the valid passports of the puzzle', () => {
        expect(part1()).toBe(196);
    });
});
