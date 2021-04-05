import { Drink } from "../../thecocktaildb/src/types";
import { fetchDrinks } from "./CocktailAPI/fetchDrinks";
import { writeToDisk } from "./writeToDisk";

const app = async () => {
  const drinks: Drink[] = await fetchDrinks();
  writeToDisk(drinks);
};
app();
