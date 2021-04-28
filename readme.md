# TheCocktailDB Downloader

[TheCocktailDB](https://thecocktaildb.com/) [API](https://thecocktaildb.com/api.php) offers over 500 drink recipes in JSON format. The API is great for many projects, but some need an offline version of the data. **This project fetches data from TheCocktailDB for offline use.**

# How to get the data?

For most uses, here are dumps of the data returned by TheCocktailDB API on the 28th of April, 2021:

| File                                                                                                                                    | Content                                    |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **[drinks.ts](https://raw.githubusercontent.com/lauriharpf/thecocktaildb-downloader/master/thecocktaildb/src/generated/drinks.ts)**     | TypeScript array of all of the drinks.     |
| **[thecocktaildb-images/generated](https://github.com/lauriharpf/thecocktaildb-downloader/tree/master/thecocktaildb-images/generated)** | All of the thumbnail images of the drinks. |

Please [support TheCocktailDB](https://www.patreon.com/thedatadb) when using the data for commercial purposes.

# Getting fresh data

If the above files are too old for you, run the downloader to produce a fresh file:

1. Install [Node.js](https://nodejs.org/en/) and [Yarn](https://classic.yarnpkg.com/en/docs/install)
1. `yarn` in the root project directory to fetch all dependencies
1. `yarn start` to start the download process

## Converting drinks.js to SQL

If you'd rather have the data in SQL format, perform these steps after running the downloader:

1. Open drinks.ts with a text editor.
2. Remove the following from the beginning of the file:

```
import { Drink } from "../types";

export const drinks: Drink[] =
```

3. The file should now start with `[{` and end with `}]`
4. Save the file.
5. Feed the file to a conversion tool, e.g. [Convert JSON to SQL](http://convertjson.com/json-to-sql.htm), to create the `CREATE TABLE` and `INSERT` statements to enter the data to your database.

# Feature requests and bug reports

Both are welcome, just open an issue.

# Projects using this data

If you've built a public project with this data and want the project mentioned here, make a PR.
