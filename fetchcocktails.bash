#!/bin/bash
# ProgressBar Author : Teddy Skarin (https://github.com/fearside/ProgressBar/)
# (minor customizations)
# 1. Create ProgressBar function
# 1.1 Input is currentState($1), totalState($2) and cocktailId($3)
function ProgressBar {
	# Process data
	let _progress=(${1}*100/${2}*100)/100
	let _done=(${_progress}*4)/10
	let _left=40-$_done
	# Build progressbar string lengths
	_done=$(printf "%${_done}s")
	_left=$(printf "%${_left}s")

	# 1.2 Build progressbar strings and print the ProgressBar line
	# 1.2.1 Output example:
	# 1.2.1.1 Progress : [########################################] 100%
	printf "\rFetching cocktail id ${3}: [${_done// /#}${_left// /-}] ${_progress}%%"
}

firstId=11000
lastId=19000
let "numberOfCocktailsToFetch = $lastId - $firstId + 1"

for (( id = $firstId; id <= $lastId; id++ ))
do      
	let "cocktailsFetched = $id - $firstId"	
	ProgressBar $cocktailsFetched $numberOfCocktailsToFetch $id
	
	# Fetch cocktail from TheCocktailDB
	wget -q -O "$id.json.tmp" "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=$id"	
	
	# Remove the response if it was empty: {"drinks":null} indicates no cocktail with this id
	find . -type f -name "$id.json.tmp" -exec grep -q '\{"drinks":null\}' {} \; -exec rm {} \;
	
	# Remove the wrapping "drinks" element from the response if it still exists
	if [ -f "$id.json.tmp" ]; then
		sed -i 's/{"drinks":\[//g' "$id.json.tmp"
		sed -i 's/\]}$/,/' "$id.json.tmp"
	fi
	
	sleep .5  # Wait a bit before the next request to excessive stress on the API
done

# Update ProgressBar to "all done" state
ProgressBar $numberOfCocktailsToFetch $numberOfCocktailsToFetch $lastId

# Combine responses to one large array of JSON objects
printf "\nCombining responses... "
echo "let drinks = [" > drinks.js 			# Add start of array declaration
cat *.json.tmp >> drinks.js 				# Join responses
sed -i 's/,$/\];/' drinks.js 				# Replace last "," with "];" that closes the array
echo "export default drinks;" >> drinks.js	# Export the array
printf "Done.\n"

printf "Removing temporary files... "
rm *.json.tmp
printf "Done.\n"
printf "Fetched cocktails output to drinks.js" 