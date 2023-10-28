import * as fs from "fs";
import { Drink, Ingredient } from "../../thecocktaildb/src/types";
import { isDrink } from "./helper";

export const writeToDisk = async (items: (Drink | Ingredient)[]): Promise<void> => {
  if (isDrink(items[0])) {
    write(items, "thecocktaildb/src/generated/with-images/drinks.ts");
    fs.copyFileSync(
      "thecocktaildb/src/types.ts",
      "thecocktaildb/src/generated/with-images/types.ts"
    );
  }

  fs.copyFileSync(
    "thecocktaildb/src/types.ts",
    "thecocktaildb/src/generated/without-images/types.ts"
  );
  write(
    items,
    `thecocktaildb/src/generated/without-images/${isDrink(items[0]) ? "drinks" : "ingredients"}.ts`
  );
};

const write = (items: (Drink | Ingredient)[], filename: string) => {
  const file = fs.createWriteStream(filename);
  if (items.length > 0) {
    const type = isDrink(items[0]) ? "Drink" : "Ingredient";
    file.write(`import { ${type} } from "./types";\n`);
    file.write("\n");
    file.write(
      `export const ${type.toLocaleLowerCase()}s: ${type}[] = ${JSON.stringify(items, null, 2)}`
    );
  }
  file.end();
};
