import { DiscomfortLevel } from "./input-types";

interface EmployeeSkill {
   name: string, description: string; icon_index: number
}

/**
 * Represents the examinations / treatments (which includes surgeries) with all
 * the corresponding fields converted to the localized strings.
 */
export interface ProcedureSchema {
  /** The `ID` attribute value. */
  name: string;
  /** The `AbbreviationLocID` tag value. */
  description: string;
  /** The `RequiredDoctorQualificationList` skillRef array values (if applies). */
  required_doctors?: EmployeeSkill[];
  /** The `RequiredStatLabQualificationRef` skillRef (if applies). */
  required_lab_spec?: EmployeeSkill;
  /** The `IconIndex` value to display the corresponding icon. */
  icon_index: number;
  /** The `DiscomfortLevel` enum value to reflect into a colour. */
  discomfort: DiscomfortLevel;
};
