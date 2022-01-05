import { ProcedureSchema } from '@ph-encyclopedia/shared/procedures';
import { SymptomSchema } from '@ph-encyclopedia/shared/symptoms';
import { OccurrenceRef } from '..';

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

/**
 * Represents the diagnose with all the corresponding fields converted to the
 * localized strings.
 */
export interface DiagnoseSchema {
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
}
