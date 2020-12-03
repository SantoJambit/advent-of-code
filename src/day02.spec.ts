import {
    countValidPasswords,
    parseInput,
    part1,
    part2,
    testOfficialPasswordPolicy,
    testPasswordPolicy,
} from './day02';

const exampleInput = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'].map(parseInput);

describe('testPasswordPolicy', () => {
    test('should test example password policies correctly', () => {
        const [a, b, c] = exampleInput;
        expect(testPasswordPolicy(a)).toBe(true);
        expect(testPasswordPolicy(b)).toBe(false);
        expect(testPasswordPolicy(c)).toBe(true);
    });
});

describe('testOfficialPasswordPolicy', () => {
    test('should test example password policies correctly', () => {
        const [a, b, c] = exampleInput;
        expect(testOfficialPasswordPolicy(a)).toBe(true);
        expect(testOfficialPasswordPolicy(b)).toBe(false);
        expect(testOfficialPasswordPolicy(c)).toBe(false);
    });
});

describe('countValidPasswords', () => {
    test('should count valid example passwords correctly', () => {
        expect(countValidPasswords(exampleInput, testPasswordPolicy)).toBe(2);
    });
    test('should count valid puzzle passwords correctly', () => {
        expect(part1()).toBe(582);
    });
    test('should count valid official puzzle passwords correctly', () => {
        expect(part2()).toBe(729);
    });
});
