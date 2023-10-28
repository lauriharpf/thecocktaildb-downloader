import { Drink, Ingredient } from "../../thecocktaildb/src/types";

export const isDrink = (item: Drink | Ingredient): item is Drink => {
    return (item as Drink).strDrink !== undefined;
};

export const isIngredient = (item: Drink | Ingredient): item is Ingredient => {
    return (item as Ingredient).strIngredient !== undefined;
};