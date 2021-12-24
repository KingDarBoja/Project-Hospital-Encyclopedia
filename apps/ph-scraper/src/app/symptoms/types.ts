export interface SymptomDatabaseSchema {
  Database: Database;
}

interface Database {
  GameDBSymptom: GameDBSymptom[];
}

interface GameDBSymptom {
  DescriptionLocID:          string;
  DiscomfortLevel:           DiscomfortLevel;
  PatientComplains:          boolean;
  Hazard:                    DiscomfortLevel;
  PatientMobility:           PatientMobility;
  Examinations:              Examinations;
  Treatments?:               Treatments;
  ShameLevel:                number;
  IsMainSymptom:             boolean;
  IconIndex:                 number;
  WalkAnimSuffix?:           WalkAnimSuffix;
  WalkSpeedModifier?:        number;
  RiskOfCollapseStartHours?: number;
  RiskOfCollapseEndHours?:   number;
  CollapseSymptomRef?:       string;
  CanNotTalk?:               boolean;
  RiskOfDeathStartHours?:    number;
  RiskOfDeathEndHours?:      number;
  CollapseProcedureRef?:     CollapseProcedureRef;
  PlanAllTreatments?:        boolean;
  BleedingLevel?:            number;
}

enum CollapseProcedureRef {
  ControlProcedureCollapseHigh = "CONTROL_PROCEDURE_COLLAPSE_HIGH",
  ControlProcedureCollapseLow = "CONTROL_PROCEDURE_COLLAPSE_LOW",
  ControlProcedureCollapseMedium = "CONTROL_PROCEDURE_COLLAPSE_MEDIUM",
}

enum DiscomfortLevel {
  High = "High",
  Low = "Low",
  Medium = "Medium",
  None = "None",
}

interface Examinations {
  ExaminationRef: ExaminationRef;
}

type ExaminationRef = string[] | string;

export enum PatientMobility {
  Imobile = "IMOBILE",
  Intubated = "INTUBATED",
  Mobile = "MOBILE",
}

interface Treatments {
  TreatmentRef: string;
}

enum WalkAnimSuffix {
  Limp = "_limp",
}
