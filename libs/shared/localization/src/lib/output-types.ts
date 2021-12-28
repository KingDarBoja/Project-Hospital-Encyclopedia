/** The supported `LanguageCode` of evert localization xml file. */
const LocalizationLang = ['en'] as const;

type LocalizationLang = typeof LocalizationLang[number];

export interface LocalizationSchema {
  /** The `LocID` tag value */
  id: string;
  /** The associated localized text per supported language (only "en" in the meantime). */
  i18n: Record<LocalizationLang, string>;
}
