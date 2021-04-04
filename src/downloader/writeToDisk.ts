import * as fs from "fs";
import { Drink } from "./CocktailAPI/cocktailApiTypes";

export const writeToDisk = (drinks: Drink[]): void => {
  const drinksFile = fs.createWriteStream(
    "src/thecocktaildb/generated/drinks.ts"
  );
  drinksFile.write('import { Drink } from "../drinkInterface";\n');
  drinksFile.write("\n");
  drinksFile.write(
    `export const drinks: Drink[] = ${JSON.stringify(drinks, null, 2)}`
  );
  drinksFile.end();
};
