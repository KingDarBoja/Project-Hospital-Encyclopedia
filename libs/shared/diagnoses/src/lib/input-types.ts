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
  Tags?:                  Tags;
  ID:                     string;
  WalkAnimSuffix?:        WalkAnimSuffix;
  WalkSpeedModifier?:     number;
  WalkAnimSuffixTreated?: WalkAnimSuffix;
  Disabled?:              boolean;
  DontSendToHDU?:         boolean;
  BiohazardStretchers?:   boolean;
  FullyBandaged?:         boolean;
}

export enum DepartmentRef {
  DptCardiology = "DPT_CARDIOLOGY",
  DptEmergency = "DPT_EMERGENCY",
  DptGeneralSurgeryDepartment = "DPT_GENERAL_SURGERY_DEPARTMENT",
  DptInfectiousDiseasesDepartment = "DPT_INFECTIOUS_DISEASES_DEPARTMENT",
  DptInternalMedicineDepartment = "DPT_INTERNAL_MEDICINE_DEPARTMENT",
  DptNeurology = "DPT_NEUROLOGY",
  DptOrthopaedicsAndTraumatology = "DPT_ORTHOPAEDICS_AND_TRAUMATOLOGY",
  DptTraumatologyDepartment = "DPT_TRAUMATOLOGY_DEPARTMENT",
  DptOncologyDepartment = 'DPT_ONCOLOGY',
}

interface Examinations {
  ExaminationRef: string[];
}

export enum OccurrenceRef {
  OccurrenceCommon = "OCCURRENCE_COMMON",
  OccurrenceRare = "OCCURRENCE_RARE",
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

export enum Tag {
  Clinic = "clinic",
  Disease = "disease",
  Helicopter = "helicopter",
  Trauma = "trauma",
}

interface Treatments {
  TreatmentRef: string[];
}

enum WalkAnimSuffix {
  Crutch = "_crutch",
  Limp = "_limp",
}
