import { DiscomfortLevel } from "./input-types";

/**
 * Represents the examinations / treatments (which includes surgeries) with all
 * the corresponding fields converted to the localized strings.
 */
export interface ProcedureSchema {
  /** The `ID` attribute value. */
  name: string;
  /** The `AbbreviationLocID` tag value. */
  description: string;
  /** The `RequiredDoctorQualificationList` skillRef array values. */
  required_doctors: Array<{ name: string, description: string; icon_index: number }>;
  /** The `IconIndex` value to display the corresponding icon. */
  icon_index: number;
  /** The `DiscomfortLevel` enum value to reflect into a colour. */
  discomfort: DiscomfortLevel;
};
