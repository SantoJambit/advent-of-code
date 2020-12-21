import {
    parseFood,
    getNonAllergenicIngredients,
    countIngredientsInFoods,
    part1,
} from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day21/example.txt').map(parseFood);
const nonAllergenicIngredients = ['kfcds', 'nhms', 'trh', 'sbzzf'];

describe('getNonAllergenicIngredients', () => {
    test('should get the non-allergenic ingredients of the example input', () => {
        expect(getNonAllergenicIngredients(exampleInput)).toEqual(
            nonAllergenicIngredients
        );
    });
});

describe('countIngredientsInFoods', () => {
    test('should count the amount of non-allergenic ingredients occurences in the example input', () => {
        expect(
            countIngredientsInFoods(exampleInput, nonAllergenicIngredients)
        ).toBe(5);
    });
});

describe('part1', () => {
    test('should count the amount of non-allergenic ingredients occurences in the example input', () => {
        expect(part1()).toBe(2461);
    });
});
