export interface DiagnoseDatabaseSchema {
  Database: Database;
}

interface Database {
  GameDBMedicalCondition: GameDBMedicalCondition[];
}

interface GameDBMedicalCondition {
  AbbreviationLocID:      string;
  Duration:               number;
  OccurrenceRef:          OccurrenceRef;
  Symptoms:               Symptoms;
  Examinations:           Examinations;
  Treatments:             Treatments;
  IconIndex:              number;
  DepartmentRef:          DepartmentRef;
  InsurancePayment:       number;
  Tags:                   Tags;
  WalkAnimSuffix?:        string;
  WalkSpeedModifier?:     number;
  WalkAnimSuffixTreated?: string;
  Disabled?:              boolean;
}

enum DepartmentRef {
  DptEmergency = "DPT_EMERGENCY",
}

interface Examinations {
  ExaminationRef: string[];
}

enum OccurrenceRef {
  OccurrenceCommon = "OCCURRENCE_COMMON",
  OccurrenceUncommon = "OCCURRENCE_UNCOMMON",
}

interface Symptoms {
  GameDBSymptomRules: GameDBSymptomRule[];
}

interface GameDBSymptomRule {
  DayOfFirstOccurence?: number;
  ProbabilityPercent?:  number;
  GameDBSymptomRef:     string;
}

interface Tags {
  Tag: Tag[];
}

enum Tag {
  Clinic = "clinic",
  Disease = "disease",
  Trauma = "trauma",
}

interface Treatments {
  TreatmentRef: string[];
}
