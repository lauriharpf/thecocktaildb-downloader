import { Drink } from "../../thecocktaildb/src/types";
import { downloadThumbnailImages } from "./CocktailAPI/downloadThumbnailImages";
import { fetchDrinks } from "./CocktailAPI/fetchDrinks";
import { writeToDisk } from "./writeToDisk";

const app = async () => {
  const drinks: Drink[] = await fetchDrinks();
  writeToDisk(drinks);
  await downloadThumbnailImages(drinks);
};
app();
