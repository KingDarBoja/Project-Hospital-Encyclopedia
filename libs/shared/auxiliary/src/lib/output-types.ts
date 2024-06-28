import { ModAssetType } from "./input-types";

type SharedGameSkillSchema = {
  /** The `ID` attribute tag. */
  id: string;
  /** The `ID` attribute tag is parsed into a locstring and stored in this field. */
  name: string;
  /** The `AbbreviationLocID` tag. */
  description_loc_id: string;
  /** The `AbbreviationLocID` tag value after parsed as locstring. */
  description: string;
  /** The `IconIndex` value to display the corresponding icon. */
  icon_index: number;
};

type BaseGameSkillSchema = SharedGameSkillSchema & {
  /** If the skill does not come from a mod file, we set this flag as "BASE". */
  type: 'BASE';
};

type ModdedGameSkillSchema = SharedGameSkillSchema & {
  /** If the skill come from a mod file, we set this flag as "MODDED". */
  type: 'MODDED';
  /** If the skill come from a mod file, this is the custom icon path. */
  icon_asset_ref: string;
};

export type SkillSchema = BaseGameSkillSchema | ModdedGameSkillSchema;

export interface RoomTypeSchema {
  /** The `ID` attribute tag. */
  id: string;
  /** The `ID` attribute tag is parsed into a locstring and stored in this field. */
  name: string;
  /** The `AbbreviationLocID` tag. */
  description_loc_id: string;
  /** The `AbbreviationLocID` tag value after parsed as locstring. */
  description: string;
  /** The `IconIndex` value to display the corresponding icon. */
  icon_index: number;
  /** The tags of required equipments. */
  equipment_tags: string[];
  /** The kind of office tags. */
  office_tags: string[];
  /** The required worker skill for this room. */
  worker?: string;
  /** Min width and height required for placing this room. */
  size: { width: number; height: number };
}

export interface AssetListSchema {
  /** The `ID` attribute tag. */
  id: string;
  /** The type of asset. */
  type: `${ModAssetType}`;
  /** The most important thing is the icon path. If empty, it comes from the
   * base game. Do not forget to prefix the folder dir mirroing the structure at
   * assets/icons/ */
  icon_path: `Mod_ONCO/${string}` | '';
}
