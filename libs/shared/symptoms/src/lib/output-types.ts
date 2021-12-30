import { ProcedureSchema } from "@ph-encyclopedia/shared/procedures";
import { DiscomfortLevel, PatientMobility } from "./input-types";

interface CollapseSymptomSchema {
  /** Provide the `ID` tag of the collapse symptom for relationships. */
  id: string;
  name: string;
  start_hours: number;
  end_hours: number;
};

/**
 * Represents the symptoms with all
 * the corresponding fields converted to the localized strings.
 */
export interface SymptomSchema {
  /** The `ID` attribute value. */
  name: string;
  /** The `DescriptionLocID` tag value. */
  description: string;
  /** The `IconIndex` value to display the corresponding icon. */
  icon_index: number;
  /** The `ExaminationRef` list values converted to the corresponding examination. */
  examinations: ProcedureSchema[];
  /** The `TreatmentRef` value converted to the corresponding treatment. Some
   * symptoms have no treatment so far. */
  treatment?: ProcedureSchema;
  /** The `DiscomfortLevel` enum value to reflect into a colour. */
  discomfort: DiscomfortLevel;
  /** The `Hazard` value to reflect into a colour. */
  hazard: DiscomfortLevel;
  /** The `PatientMobility` enum value to reflect into a colour. */
  mobility: PatientMobility;
  /** The `IsMainSymptom` flag whetever this symptom represents the main diagnose. */
  main_sym: boolean;
  /** Some symptoms can lead to collapse, if that's the case, this field will
   * represent the symptom name and timeframe from the `CollapseSymptomRef` tag. */
  collapse_sym?: CollapseSymptomSchema;
}
