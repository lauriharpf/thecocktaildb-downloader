import ProgressBar from "progress";
import fetch from "node-fetch";
import { DataType, Drink, Ingredient } from "../../../thecocktaildb/src/types";
import { knownDrinkIds, knownIngredientIds } from "./knownDataIds";
import { downloadThumbnailImage } from "./downloadThumbnailImage";
import { isDrink } from "../helper";

const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1";
const lookupPath = "lookup.php";

export const fetchData = async (dataType: DataType): Promise<(Drink | Ingredient)[]> => {
  const dataIdsToFetch = determineIdsToFetch(dataType === 'drink' ? knownDrinkIds : knownIngredientIds);
  return fetchDataOneByOneToPreventApiOverload(dataType, dataIdsToFetch);
};

const determineIdsToFetch = (knownIds: number[]): number[] => {
  const lastKnownId = knownIds[knownIds.length - 1];
  const firstPotentialId = lastKnownId + 1;
  const numberOfPotentialIdsToCheck = 1000;
  const potentialNewIds = Array.from({ length: numberOfPotentialIdsToCheck }, (_value, index) => firstPotentialId + index);
  return knownIds.concat(potentialNewIds);
};

const fetchDataOneByOneToPreventApiOverload = async (dataType: DataType, allDataIds: number[]): Promise<(Drink | Ingredient)[]> => {
  const bar = new ProgressBar(
    "Fetching :dataType :bar :current/:total (:percent) ETA: :eta",
    allDataIds.length
  );
  const fetchedItems: (Drink | Ingredient)[] = [];


  for (const dataId of allDataIds) {
    try {
      const item = await fetchItem(dataType, dataId);
      if (item) {
        fetchedItems.push(item);
      }
    } catch (error) {
      console.error(`Error fetching ${dataType}: ${error}`);
    }

    bar.tick({ dataType });
  }

  return fetchedItems;
};

const fetchItem = async (dataType: DataType, id: number): Promise<Drink | Ingredient | undefined> => {
  const lookupUrl = `${apiUrl}/${lookupPath}`;
  const url = `${lookupUrl}?${getQueryParam(dataType, id)}`;

  const result = await fetch(url);
  const json = await result.json();

  if (!json[dataType + "s"]) {
    return undefined;
  }

  const item: Drink | Ingredient = json[dataType + "s"][0];
  if (isDrink(item) && item.strDrinkThumb) {
    const thumbnailFilename = createThumbnailFilenameForDrink(item);
    try {
      await downloadThumbnailImage(item.strDrinkThumb, thumbnailFilename);
      item.thumbnailFilename = thumbnailFilename;
    } catch (error) {
      console.error(`Error downloading thumbnail image: ${error}`);
    }
  }

  return item;
};

const createThumbnailFilenameForDrink = (drink: Drink): string => {
  const extension = drink.strDrinkThumb.substring(
    drink.strDrinkThumb.lastIndexOf(".")
  );
  const thumbnailFilename =
    `${drink.idDrink}-${drink.strDrink}`
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase() + extension;
  return thumbnailFilename;
};

const getQueryParam = (dataType: DataType, id: number): string => {
  const paramName = dataType === 'drink' ? "i" : "iid";
  return `${paramName}=${id}`;
};