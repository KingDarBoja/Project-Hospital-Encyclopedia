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
  ID:                        string;
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
  SpeechBubbleRef?:          SpeechBubbleRef;
  DressLevelWhenTreated?:    DressLevelWhenTreated;
  LyingAnimationSuffix?:     LyingAnimationSuffix;
}

enum CollapseProcedureRef {
  ControlProcedureCollapseHigh = "CONTROL_PROCEDURE_COLLAPSE_HIGH",
  ControlProcedureCollapseLow = "CONTROL_PROCEDURE_COLLAPSE_LOW",
  ControlProcedureCollapseMedium = "CONTROL_PROCEDURE_COLLAPSE_MEDIUM",
}

export enum DiscomfortLevel {
  High = "High",
  Low = "Low",
  Medium = "Medium",
  None = "None",
}

enum DressLevelWhenTreated {
  AbdomenBandage = "ABDOMEN_BANDAGE",
  ChestBandage = "CHEST_BANDAGE",
  ForearmBandage = "FOREARM_BANDAGE",
  HeadBandage = "HEAD_BANDAGE",
  LegBandage = "LEG_BANDAGE",
}

interface Examinations {
  ExaminationRef: string[];
}

enum LyingAnimationSuffix {
  WoundAbdomen = "_wound_abdomen",
  WoundArm = "_wound_arm",
  WoundChest = "_wound_chest",
  WoundHead = "_wound_head",
  WoundLeg = "_wound_leg",
}

export enum PatientMobility {
  Imobile = "IMOBILE",
  Intubated = "INTUBATED",
  Mobile = "MOBILE",
}

enum SpeechBubbleRef {
  BubblePlaceholder = "BUBBLE_PLACEHOLDER",
}

interface Treatments {
  TreatmentRef: string;
}

enum WalkAnimSuffix {
  Limp = "_limp",
}
