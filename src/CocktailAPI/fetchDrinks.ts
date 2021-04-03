import fetch from "node-fetch";
import {
  Drink,
  LookupResponse,
  lookupResponseSchema,
} from "./cocktailApiTypes";

export const fetchDrinks = async (): Promise<Drink[]> => {
  const firstId = 11000;
  const howMany = 2;

  const drinks: Drink[] = [];
  for (let id = firstId; id < firstId + howMany; id++) {
    const drink = await fetchDrink(id);
    drinks.push(drink);
  }

  return drinks;
};

const fetchDrink = async (id: number): Promise<Drink> => {
  const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1";
  const result = await fetch(`${apiUrl}/lookup.php?i=${id}`);
  const lookupResponse: LookupResponse = lookupResponseSchema.parse(
    await result.json()
  );
  return lookupResponse.drinks[0];
};
