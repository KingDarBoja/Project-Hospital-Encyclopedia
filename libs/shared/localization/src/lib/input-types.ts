export interface LocalizationDatabaseSchema {
  Database: Database;
}

interface Database {
  GameDBStringTable: GameDBStringTable;
}

interface GameDBStringTable {
  LanguageCode:          LanguageCode;
  LanguageNameLocalized: LanguageNameLocalized;
  LocalizedStrings:      LocalizedStrings;
  ID:                    string;
}

export enum LanguageCode {
  En = "en",
}

export enum LanguageNameLocalized {
  English = "English",
}

export interface LocalizedStrings {
  GameDBLocalizedString: GameDBLocalizedString[];
}

export interface GameDBLocalizedString {
  LocID: string;
  Text:  string;
}
