import ProgressBar from "progress";
import fetch from "node-fetch";
import { Drink } from "../../../thecocktaildb/src/types";
import { knownDrinkIds } from "./knownDrinkIds";
import { downloadThumbnailImage } from "./downloadThumbnailImage";

export const fetchDrinks = async (): Promise<Drink[]> => {
  const drinkIdsToFetch = determineDrinkIdsToFetch();
  return fetchDrinksOneByOneToPreventApiOverload(drinkIdsToFetch);
};

const determineDrinkIdsToFetch = (): number[] => {
  const lastKnownDrinkId = knownDrinkIds[knownDrinkIds.length - 1];
  const firstPotentialDrinkId = lastKnownDrinkId + 1;
  const numberOfPotentialIdsToCheck = 1000;
  const potentialNewDrinkIds = [...Array(numberOfPotentialIdsToCheck)].map(
    (_value, index) => firstPotentialDrinkId + index
  );
  const drinkIdsToFetch = knownDrinkIds.concat(potentialNewDrinkIds);
  return drinkIdsToFetch;
};

const fetchDrinksOneByOneToPreventApiOverload = async (
  allDrinkIds: number[]
): Promise<Drink[]> => {
  const bar = new ProgressBar(
    "Fetching drinks :bar :current/:total (:percent) ETA: :eta",
    allDrinkIds.length
  );

  const drinks: Drink[] = [];
  for (const drinkId of allDrinkIds) {
    const drink = await fetchDrink(drinkId);
    bar.tick();
    if (drink) {
      drinks.push(drink);
    }
  }

  return drinks;
};

const fetchDrink = async (id: number): Promise<Drink | undefined> => {
  const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1";
  const result = await fetch(`${apiUrl}/lookup.php?i=${id}`);
  const json = await result.json();

  if (!json.drinks) {
    return undefined;
  }

  const drink: Drink = json.drinks[0];
  if (drink.strDrinkThumb) {
    const extension = drink.strDrinkThumb.substring(
      drink.strDrinkThumb.lastIndexOf(".")
    );
    const thumbnailFilename =
      `${drink.idDrink}-${drink.strDrink}`
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase() + extension;
    try {
      await downloadThumbnailImage(drink.strDrinkThumb, thumbnailFilename);
      drink.thumbnailFilename = thumbnailFilename;
    } catch (e) {
      console.log(e);
    }
  }

  return drink;
};
