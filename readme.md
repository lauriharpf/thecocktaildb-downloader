# TheCocktailDB Downloader

[TheCocktailDB](https://thecocktaildb.com/) [API](https://thecocktaildb.com/api.php) offers over 500 cocktail recipes in JSON format. The API is great for many projects, but some need an offline version of the data. **This project fetches data from TheCocktailDB for offline use.**

# How to get the data?
For most uses, here are dumps of the data returned by TheCocktailDB API on 2nd of January, 2020:

|File|Content|
|----|-------|
|**[drinks.js](https://raw.githubusercontent.com/lauriharpf/thecocktaildb-downloader/master/drinks.js)**|JavaScript array of all of the cocktails as JSON objects. Also see [example of using drinks.js at CodeSandbox](https://codesandbox.io/s/6wql1zz9on). 
|**[drinks.sql](https://raw.githubusercontent.com/lauriharpf/thecocktaildb-downloader/master/drinks.sql)**|Same data in SQL format; a CREATE TABLE statement and INSERT statements for each cocktail.

Please [support TheCocktailDB](https://www.patreon.com/thedatadb) when using the data for commercial purposes.

# Getting fresh data
If the above files are too old for you, run the downloader to produce a fresh file. On Linux/Unix (including MacOS):

1. Download [fetchcocktails.bash](https://raw.githubusercontent.com/lauriharpf/thecocktaildb-downloader/master/fetchcocktails.bash) and place it to an empty directory in your system
2. Make the file executable: `chmod 744 fetchcocktails.bash`
3. Run it: `./fetchcocktails.bash`

On Windows, first install [Cygwin](http://www.cygwin.com/) to allow running bash scripts. Alternatively, [Git BASH](https://gitforwindows.org/) works if you also [install Wget](https://gist.github.com/evanwill/0207876c3243bbb6863e65ec5dc3f058).

## Converting drinks.js to SQL
If you'd rather have the data in SQL format, perform these steps after running `fetchcocktails.bash`:

1. Open drinks.js with a text editor.
2. Remove `let drinks = ` from the beginning of the file
3. Remove `;export default drinks;` from the end of the file. The file should now start with `[{` and end with `}]`
4. Save the file. 
5. Feed the file to a conversion tool, e.g. [Convert JSON to SQL](http://convertjson.com/json-to-sql.htm), to create the `CREATE TABLE` and `INSERT` statements to enter the data to your database.

# Feature requests and bug reports
Both are welcome, just open an issue.

# Projects using this data
As far as I know, only [Cocktails World](https://github.com/lauriharpf/cocktails) by yours truly. If you've built a public project with this data and want the project mentioned here, make a PR.