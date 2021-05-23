export type CreativeCommonsConfirmed = "Yes" | "No";

export type Alcoholic = "Alcoholic" | "Non alcoholic" | "Optional alcohol";

export type IBA = "Contemporary Classics" | "Unforgettables" | "New Era Drinks";

export type Category =
  | "Ordinary Drink"
  | "Cocktail"
  | "Milk / Float / Shake"
  | "Other/Unknown"
  | "Cocoa"
  | "Shot"
  | "Coffee / Tea"
  | "Homemade Liqueur"
  | "Punch / Party Drink"
  | "Beer"
  | "Soft Drink / Soda";

export type Glass =
  | "Highball glass"
  | "Cocktail glass"
  | "Old-fashioned glass"
  | "Whiskey Glass"
  | "Collins glass"
  | "Pousse cafe glass"
  | "Champagne flute"
  | "Whiskey sour glass"
  | "Cordial glass"
  | "Brandy snifter"
  | "White wine glass"
  | "Nick and Nora Glass"
  | "Hurricane glass"
  | "Coffee mug"
  | "Shot glass"
  | "Jar"
  | "Irish coffee cup"
  | "Punch bowl"
  | "Pitcher"
  | "Pint glass"
  | "Copper Mug"
  | "Wine Glass"
  | "Beer mug"
  | "Margarita/Coupette glass"
  | "Beer pilsner"
  | "Beer Glass"
  | "Parfait glass"
  | "Mason jar"
  | "Margarita glass"
  | "Martini Glass"
  | "Balloon Glass"
  | "Coupe Glass"
  | "Cocktail Glass"
  | "Collins Glass"
  | "Highball Glass"
  | "Coffee Mug"
  | "Punch Bowl"
  | "Shot Glass"
  | "Champagne Flute"
  | "Old-Fashioned glass";

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: Category;
  strIBA: IBA | null;
  strAlcoholic: Alcoholic;
  strGlass: Glass;
  strInstructions: string;
  strInstructionsES: string | null;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string;
  "strInstructionsZH-HANS": string | null;
  "strInstructionsZH-HANT": string | null;
  strDrinkThumb: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: CreativeCommonsConfirmed;
  dateModified: string | null;
  thumbnailFilename: string | null;
}
