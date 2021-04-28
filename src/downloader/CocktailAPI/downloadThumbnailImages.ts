import * as fs from "fs";
import fetch from "node-fetch";
import ProgressBar from "progress";
import { Drink } from "../../../thecocktaildb/src";

export const downloadThumbnailImages = async (
  drinks: Drink[]
): Promise<void> => {
  const drinksWithThumbnails = drinks.filter((drink) => drink.strDrinkThumb);

  const bar = new ProgressBar(
    "Fetching images :bar :current/:total (:percent) ETA: :eta",
    drinksWithThumbnails.length
  );

  for (const drink of drinksWithThumbnails) {
    await downloadThumbnailImage(drink.idDrink, drink.strDrinkThumb, bar);
  }
};

const downloadThumbnailImage = async (
  id: string,
  url: string,
  bar: ProgressBar
): Promise<void> => {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();

    const filename = url.substring(url.lastIndexOf("/") + 1);

    await fs.promises.writeFile(
      `thecocktaildb-images/generated/${filename}`,
      buffer
    );
    bar.tick();
  } catch (e) {
    console.log(e);
  }
};
