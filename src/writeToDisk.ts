import * as fs from "fs";
import { Drink } from "./CocktailAPI/cocktailApiTypes";

export const writeToDisk = (drinks: Drink[]): void => {
  return fs.writeFileSync(
    "dist/drinks.json",
    JSON.stringify({ drinks }, null, 2),
    "utf8"
  );
};
