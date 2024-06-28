import { DepartmentRef, OccurrenceRef } from '@ph-encyclopedia/shared/auxiliary';

export interface DiagnoseDatabaseSchema {
  Database: Database;
}

interface Database {
  GameDBMedicalCondition: GameDBMedicalCondition[];
}

interface GameDBMedicalCondition {
  AbbreviationLocID: string;
  Duration: number;
  OccurrenceRef: OccurrenceRef;
  Symptoms: Symptoms;
  Examinations: Examinations;
  Treatments: Treatments;
  IconIndex: number;
  /** Only applies for Mods */
  CustomIconBigAssetRef?: string;
  /** Only applies for Mods */
  CustomIconSmallAssetRef?: string;
  DepartmentRef: DepartmentRef;
  InsurancePayment: number;
  Tags?: Tags;
  ID: string;
  WalkAnimSuffix?: WalkAnimSuffix;
  WalkSpeedModifier?: number;
  WalkAnimSuffixTreated?: WalkAnimSuffix;
  Disabled?: boolean;
  DontSendToHDU?: boolean;
  BiohazardStretchers?: boolean;
  FullyBandaged?: boolean;
}

interface Examinations {
  ExaminationRef: string[];
}

interface Symptoms {
  GameDBSymptomRules: GameDBSymptomRule[];
}

interface GameDBSymptomRule {
  DayOfFirstOccurence?: number;
  ProbabilityPercent?: number;
  GameDBSymptomRef: string;
}

interface Tags {
  Tag: Tag[];
}

export enum Tag {
  Clinic = 'clinic',
  Disease = 'disease',
  Helicopter = 'helicopter',
  Trauma = 'trauma',
}

interface Treatments {
  TreatmentRef: string[];
}

enum WalkAnimSuffix {
  Crutch = '_crutch',
  Limp = '_limp',
}
