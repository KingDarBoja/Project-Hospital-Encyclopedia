export enum OccurrenceRefEnum {
  OccurrenceCommon = 'OCCURRENCE_COMMON',
  OccurrenceRare = 'OCCURRENCE_RARE',
  OccurrenceUncommon = 'OCCURRENCE_UNCOMMON',
  /* ------- MODS OCCURRENCES ------- */
  ModOccurrence_SL_COMMON = 'OCCURRENCE_SL_COMMON',
  ModOccurrence_SL_UNCOMMON = 'OCCURRENCE_SL_UNCOMMON',
  ModOccurrence_SL_UNLIKELY = 'OCCURRENCE_SL_UNLIKELY',
  ModOccurrence_SL_RARE = 'OCCURRENCE_SL_RARE',
  ModOccurrence_SL_PRETTYRARE = 'OCCURRENCE_SL_PRETTYRARE',
  ModOccurrence_SL_VERYRARE = 'OCCURRENCE_SL_VERYRARE',
  ModOccurrence_SL_ULTRARARE = 'OCCURRENCE_SL_ULTRARARE',
  ModOccurrence_SL_UNIQUE = 'OCCURRENCE_SL_UNIQUE',
  ModOccurrence_SL_ULTRAUNIQUE = 'OCCURRENCE_SL_ULTRAUNIQUE',
}

export type OccurrenceRef = `${OccurrenceRefEnum}`;
