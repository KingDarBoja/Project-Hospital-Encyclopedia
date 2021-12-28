export interface SkillsDatabaseSchema {
  Database: Database;
}

interface Database {
  GameDBSkill: GameDBSkill[];
}

interface GameDBSkill {
  AbbreviationLocID: string;
  IconIndex: number;
  ExtraLevelingPercent?: number;
  ID: string;
  ParentSkill?: ParentSkill;
}

enum ParentSkill {
  SkillDocQualifGeneralMedicine = 'SKILL_DOC_QUALIF_GENERAL_MEDICINE',
}
