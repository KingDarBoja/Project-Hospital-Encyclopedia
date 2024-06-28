export interface SkillsDatabaseSchema {
  Database: SkillDatabaseSchema;
}

interface SkillDatabaseSchema {
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

export interface RoomTypesDatabaseSchema {
  Database: RoomTypeDatabaseSchema;
}

interface RoomTypeDatabaseSchema {
  GameDBRoomType: GameDBRoomType[];
}

interface GameDBRoomType {
  AbbreviationLocID: string;
  TextureID: string;
  IconIndex: number;
  AccessRights: string;
  RequiredEquipment: RequiredEquipment;
  LockedByDefault: string;
  /** These are different `Tag` array values. Ex: 'ui_mobile_cabinet', 'ui_bookcase */
  BuildingModeFilters: BuildingModeFilters;
  /** These are different `Tag` array values. Ex: 'ultrasonograph', 'sonography_unit' */
  Tags: BuildingModeFilters;
  MinWidth: number;
  MinHeight: number;
  ID: string;
  AcceptsOutpatients?: string;
  RequiredSkill?: string;
  StatisticsMultiplier?: string;
  Hidden?: string;
}

interface BuildingModeFilters {
  Tag: string[];
}

interface RequiredEquipment {
  GameDBRequiredEquipment: GameDBRequiredEquipment[];
}

interface GameDBRequiredEquipment {
  Tag: string;
  MinCount: string;
}

export interface ModAssetListsDatabaseSchema {
  Database: ModAssetListDatabaseSchema;
}

interface ModAssetListDatabaseSchema {
  GameDBAsset: ModGameDBAsset[];
}

interface ModGameDBAsset {
  Type: ModAssetType;
  File: string;
  ID: string;
}

export enum ModAssetType {
  TextureCustomSprite = 'TEXTURE_CUSTOM_SPRITE',
  TextureObjects = 'TEXTURE_OBJECTS',
}
