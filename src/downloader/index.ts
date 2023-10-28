import { Drink, Ingredient } from "../../thecocktaildb/src/types";
import { writeToDisk } from "./writeToDisk";
import { fetchData } from "./CocktailAPI/fetchData";

const app = async () => {
  const drinks: (Drink | Ingredient)[] = await fetchData('drink');
  await writeToDisk(drinks);

  const ingredients: (Drink | Ingredient)[] = await fetchData('ingredient');
  await writeToDisk(ingredients);
};
app();
