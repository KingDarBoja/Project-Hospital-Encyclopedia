import { OccurrenceRef } from '@ph-encyclopedia/shared/auxiliary';
import { ProcedureSchema } from '@ph-encyclopedia/shared/procedures';
import { SymptomSchema } from '@ph-encyclopedia/shared/symptoms';

export enum OfficialDepartments {
  EMERGENCY = 'er',
  GENERAL_SURGERY = 'surg',
  INTERNAL_MEDICINE = 'intern',
  ORTHOPEDY = 'ortho',
  CARDIOLOGY = 'cardio',
  NEUROLOGY = 'neuro',
  TRAUMATOLOGY = 'trauma',
  INFECTIOUS_DISEASES = 'infect',
  ONCOLOGY = 'onco',
  OTORHINOLARYNGOLOGY = 'ent',
}

export type OfficialDepartmentsType = `${OfficialDepartments}`;

export type DiagnosesDict = {
  /** Emergency */
  er: Record<string, BaseGameDiagnoseSchema>;
  /** General Surgery */
  surg: Record<string, BaseGameDiagnoseSchema>;
  /** Internal Medicine */
  intern: Record<string, BaseGameDiagnoseSchema>;
  /** Orthopedy */
  ortho: Record<string, BaseGameDiagnoseSchema>;
  /** Cardiology */
  cardio: Record<string, BaseGameDiagnoseSchema>;
  /** Neurology */
  neuro: Record<string, BaseGameDiagnoseSchema>;
  /** Trauma */
  trauma: Record<string, BaseGameDiagnoseSchema>;
  /** Infectious Diseases */
  infect: Record<string, BaseGameDiagnoseSchema>;
  /** Mod: Oncology */
  onco: Record<string, ModdedGameDiagnoseSchema>;
  /** Mod: Ear Nose and Throat */
  ent: Record<string, ModdedGameDiagnoseSchema>;
};

type DiagnoseSymptomSchema = Pick<
  SymptomSchema,
  'id' | 'name' | 'icon_index' | 'hazard' | 'collapse_sym'
> & {
  /** The `ProbabilityPercent` tag value */
  probability: number;
  // Do not want to repeat extra information on diagnoses.
  examinations: Pick<ProcedureSchema, 'id' | 'name' | 'icon_index'>[];
  treatment?: Pick<ProcedureSchema, 'id' | 'name' | 'icon_index'>;
};

export type SharedDiagnoseSchema = {
  /** Provide the `ID` tag of the diagnose for relationships. */
  id: string;
  /** The `ID` attribute value. */
  name: string;
  /** The `DescriptionLocID` tag value. */
  description: string;
  /** The `IconIndex` value to display the corresponding icon. */
  icon_index: number;
  /** The `Symptoms` list with the corresponding examination / treatment. */
  symptoms: DiagnoseSymptomSchema[];
  /** The `InsurancePayment` raw value. */
  insurance: number;
  /** The `OccurrenceRef` enum value. */
  occurrence: OccurrenceRef;
};

export type BaseGameDiagnoseSchema = SharedDiagnoseSchema & {
  /** If the diagnose does not come from a mod file, we set this flag as "BASE" */
  type: 'BASE';
};

export type ModdedGameDiagnoseSchema = SharedDiagnoseSchema & {
  /** If the diagnose come from a mod file, we set this flag as "MODDED" */
  type: 'MODDED';
  /** The custom big icon asset ID. */
  bia_ref: string;
  /** The custom small icon asset ID. */
  sia_ref: string;
  /** The custom big icon asset path (path/to/png). */
  big_icon_path: string;
  small_icon_path: string;
};

/**
 * Represents the diagnose with all the corresponding fields converted to the
 * localized strings.
 */
export type DiagnoseSchema = BaseGameDiagnoseSchema | ModdedGameDiagnoseSchema;
