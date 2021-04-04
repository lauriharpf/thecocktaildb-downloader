import ProgressBar from "progress";
import fetch from "node-fetch";
import {
  Drink,
  LookupResponse,
  lookupResponseSchema,
} from "./cocktailApiTypes";

export const fetchDrinks = async (): Promise<Drink[]> => {
  const firstId = 11000;
  const howMany = 8000;
  const bar = new ProgressBar(
    "Fetching :bar :current/:total (:percent) ETA: :eta",
    howMany
  );

  const drinks: Drink[] = [];
  for (let id = firstId; id < firstId + howMany; id++) {
    const drink = await fetchDrink(id);
    if (drink) {
      drinks.push(drink);
    }
    bar.tick();
  }

  return drinks;
};

const fetchDrink = async (id: number): Promise<Drink | undefined> => {
  const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1";
  const result = await fetch(`${apiUrl}/lookup.php?i=${id}`);
  try {
    const lookupResponse: LookupResponse = lookupResponseSchema.parse(
      await result.json()
    );
    return lookupResponse.drinks ? lookupResponse.drinks[0] : undefined;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
