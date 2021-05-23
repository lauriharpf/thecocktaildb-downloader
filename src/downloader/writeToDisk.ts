import * as fs from "fs";
import { Drink } from "../../thecocktaildb/src/types";

export const writeToDisk = async (drinks: Drink[]): Promise<void> => {
  write(drinks, "thecocktaildb/src/generated/with-images/drinks.ts");
  fs.copyFileSync(
    "thecocktaildb/src/types.ts",
    "thecocktaildb/src/generated/with-images/types.ts"
  );

  const withNullThumbnailFilename = drinks.map((drink) => ({
    ...drink,
    thumbnailFilename: null,
  }));
  fs.copyFileSync(
    "thecocktaildb/src/types.ts",
    "thecocktaildb/src/generated/without-images/types.ts"
  );
  write(
    withNullThumbnailFilename,
    "thecocktaildb/src/generated/without-images/drinks.ts"
  );
};

const write = (drinks: Drink[], filename: string) => {
  const drinksFile = fs.createWriteStream(filename);
  drinksFile.write('import { Drink } from "./types";\n');
  drinksFile.write("\n");
  drinksFile.write(
    `export const drinks: Drink[] = ${JSON.stringify(drinks, null, 2)}`
  );
  drinksFile.end();
};
