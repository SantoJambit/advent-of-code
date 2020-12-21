import { loadFile } from '../lib';

export interface Food {
    ingredients: string[];
    allergens: string[];
}

interface PossibleIngredients {
    allergen: string;
    ingredients: string[];
}

const foodRegex = /^(.*) \(contains (.*)\)$/;

export function parseFood(line: string): Food {
    const match = foodRegex.exec(line);
    if (!match) throw new Error(`Invalid food line: "${line}"`);
    return {
        ingredients: match[1].split(' '),
        allergens: match[2].split(', '),
    };
}

function sortByIngredientCount(a: PossibleIngredients, b: PossibleIngredients) {
    return b.ingredients.length - a.ingredients.length;
}

export function getNonAllergenicIngredients(foods: Food[]) {
    const ingredients: string[] = [];
    const foodsByAllergen: { [s: string]: Food[] } = {};
    for (const food of foods) {
        for (const allergen of food.allergens) {
            let list = foodsByAllergen[allergen];
            if (list) list.push(food);
            else foodsByAllergen[allergen] = [food];
        }
        for (const ingredient of food.ingredients) {
            if (!ingredients.includes(ingredient)) ingredients.push(ingredient);
        }
    }

    const possibleIngredients: PossibleIngredients[] = [];
    for (const allergen in foodsByAllergen) {
        const foods = foodsByAllergen[allergen];
        const otherFoods = foods.slice(1);
        const ingredients = foods[0].ingredients.filter((i) =>
            otherFoods.every((food) => food.ingredients.includes(i))
        );
        possibleIngredients.push({
            allergen,
            ingredients,
        });
    }

    const ingredientToAllergen: { [s: string]: string } = {};
    while (possibleIngredients.length) {
        let next = possibleIngredients.pop();
        if (next.ingredients.length !== 1) {
            possibleIngredients.push(next);
            possibleIngredients.sort(sortByIngredientCount);
            next = possibleIngredients.pop();
            if (next.ingredients.length !== 1)
                throw new Error('Did not expect more than one ingredient');
        }

        const ingredient = next.ingredients[0];
        ingredientToAllergen[ingredient] = next.allergen;
        for (const e of possibleIngredients) {
            e.ingredients = e.ingredients.filter((i) => i !== ingredient);
        }
    }
    const ingredientsWithAllergens = Object.keys(ingredientToAllergen);
    return ingredients.filter((i) => !ingredientsWithAllergens.includes(i));
}

export function countIngredientsInFoods(foods: Food[], ingredients: string[]) {
    let count = 0;
    for (const food of foods) {
        count += food.ingredients.filter((i) => ingredients.includes(i)).length;
    }
    return count;
}

const puzzleInput = loadFile('day21/input.txt').map(parseFood);

export const part1 = () =>
    countIngredientsInFoods(
        puzzleInput,
        getNonAllergenicIngredients(puzzleInput)
    );
