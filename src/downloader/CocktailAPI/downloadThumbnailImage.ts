import * as fs from "fs";
import fetch from "node-fetch";

export const downloadThumbnailImage = async (
  url: string,
  filename: string
): Promise<string | null> => {
  const response = await fetch(url);
  const buffer = await response.buffer();

  await fs.promises.writeFile(
    `thecocktaildb/src/generated/with-images/${filename}`,
    buffer
  );
  return filename;
};
