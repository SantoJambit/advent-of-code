import { getLoopSize, transform, puzzleInput, part1 } from '.';

const exampleInput = {
    cardPublicKey: 5764801,
    doorPublicKey: 17807724,
};

describe('transform', () => {
    test('should return the example cards public key with a subject of 7 and a loop size of 8', () => {
        expect(transform(7, 8)).toBe(exampleInput.cardPublicKey);
    });
    test('should return the example doors public key with a subject of 7 and a loop size of 11', () => {
        expect(transform(7, 11)).toBe(exampleInput.doorPublicKey);
    });
    test('should return the example encryption key with the doors public key and a loop size of 8', () => {
        expect(transform(exampleInput.doorPublicKey, 8)).toBe(14897079);
    });
    test('should return the example encryption key with the doors public key and a loop size of 11', () => {
        expect(transform(exampleInput.cardPublicKey, 11)).toBe(14897079);
    });
});

describe('getLoopSize', () => {
    test('should return the example cards loop size', () => {
        expect(getLoopSize(7, exampleInput.cardPublicKey)).toBe(8);
    });
    test('should return the example doors loop size', () => {
        expect(getLoopSize(7, exampleInput.doorPublicKey)).toBe(11);
    });
    test('should return the puzzle cards loop size', () => {
        expect(getLoopSize(7, puzzleInput.cardPublicKey)).toBe(13330548);
    });
    test('should return the puzzle doors loop size', () => {
        expect(getLoopSize(7, puzzleInput.doorPublicKey)).toBe(17111924);
    });
});

describe('part1', () => {
    test('should return the puzzle doors loop size', () => {
        expect(part1()).toBe(18293391);
    });
});
