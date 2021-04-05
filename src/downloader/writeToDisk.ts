import * as fs from "fs";
import { Drink } from "../../thecocktaildb/src/types";

export const writeToDisk = (drinks: Drink[]): void => {
  const drinksFile = fs.createWriteStream(
    "thecocktaildb/src/generated/drinks.ts"
  );
  drinksFile.write('import { Drink } from "../types";\n');
  drinksFile.write("\n");
  drinksFile.write(
    `export const drinks: Drink[] = ${JSON.stringify(drinks, null, 2)}`
  );
  drinksFile.end();
};
