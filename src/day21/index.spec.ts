import {
    parseFood,
    getNonAllergenicIngredients,
    countIngredientsInFoods,
    part1,
    getIngredientToAllergenMap,
    getCanonicalDangerousIngredientList,
    part2,
} from '.';
import { loadFile } from '../lib';

const exampleInput = loadFile('day21/example.txt').map(parseFood);
const nonAllergenicIngredients = new Set(['kfcds', 'nhms', 'trh', 'sbzzf']);

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

describe('getIngredientToAllergenMap', () => {
    test('should get a map of ingredients to allergens for the example input', () => {
        expect(getIngredientToAllergenMap(exampleInput)).toEqual({
            mxmxvkd: 'dairy',
            sqjhc: 'fish',
            fvjkl: 'soy',
        });
    });
});

describe('getCanonicalDangerousIngredientList', () => {
    test('should get the canonical dangerous ingredient list for the example input', () => {
        expect(getCanonicalDangerousIngredientList(exampleInput)).toBe(
            'mxmxvkd,sqjhc,fvjkl'
        );
    });
});

describe('part1', () => {
    test('should count the amount of non-allergenic ingredients occurences in the example input', () => {
        expect(part1()).toBe(2461);
    });
});

describe('part2', () => {
    test('should get the canonical dangerous ingredient list for the puzzle input', () => {
        expect(part2()).toBe('ltbj,nrfmm,pvhcsn,jxbnb,chpdjkf,jtqt,zzkq,jqnhd');
    });
});
