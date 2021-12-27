export interface ProcedureDatabaseSchema {
  Database: Database;
}

interface Database {
  GameDBExamination?: GameDBExamination[];
  GameDBTreatment?:   GameDBTreatment[];
}

interface GameDBExamination {
  ID:                                  string;
  AbbreviationLocID:                   string;
  DiscomfortLevel:                     DiscomfortLevel[];
  Procedure:                           GameDBExaminationProcedure;
  ExaminationType?:                    ExaminationType;
  Cost:                                number;
  IconIndex:                           number;
  DurationHours?:                      number;
  PatientNeedsToBeAbleToTalk?:         boolean;
  LabTestingExaminationRef?:           string;
  AlternativeExaminationRef?:          string;
  CancelWhenTransportedToICUOrTrauma?: boolean;
}

export enum DiscomfortLevel {
  High = "High",
  Low = "Low",
  Medium = "Medium",
  None = "None",
  Positive = "Positive",
}

enum ExaminationType {
  Examination = "EXAMINATION",
  Interview = "INTERVIEW",
  Observation = "OBSERVATION",
}

interface GameDBExaminationProcedure {
  StaffSelectionRules?:             StaffSelectionRules;
  RequiredDoctorQualificationList?: RequiredDoctorQualificationListClass;
  RequiredEquipmentList?:           PurpleRequiredEquipmentList[];
  RequiredRoomTags?:                RequiredRoomTagElement[];
  ProcedureScript?:                 string;
  ProcedureAnimationState?:         string;
  AnimationSetupLying?:             AnimationSetupIng[];
  AnimationSetupSitting?:           AnimationSetupIng;
  DressLevel?:                      DressLevel;
  Biohazard?:                       boolean;
  Priority:                         number;
  RequiredSkillsToPrescribe?:       RequiredDoctorQualificationListClass;
  RequiredStatLabQualificationRef?: RequiredStatLabQualificationRef;
  DetachedDepartmentRef?:           DepartmentRef;
  FallbackLabDepartmentRef?:        FallbackLabDepartmentRef;
  AnimationFrame?:                  number;
  OptionalEquipment?:               string;
  RequiredRoomTypeList?:            RequiredRoomTypeList;
  HospitalizationLevel?:            ExaminationType;
  RequiredNurseQualificationList?:  RequiredDoctorQualificationListClass;
}

interface AnimationSetupIng {
  AnimationNameIn?:   string;
  AnimationNameIdle?: string[];
  AnimationNameOut:   string;
}

enum DepartmentRef {
  DptGeneralSurgeryDepartment = "DPT_GENERAL_SURGERY_DEPARTMENT",
  DptInternalMedicineDepartment = "DPT_INTERNAL_MEDICINE_DEPARTMENT",
  DptNeurology = "DPT_NEUROLOGY",
  DptRadiology = "DPT_RADIOLOGY",
}

enum DressLevel {
  Full = "FULL",
  Half = "HALF",
  HalfTop = "HALF_TOP",
  Underwear = "UNDERWEAR",
}

enum FallbackLabDepartmentRef {
  DptLab = "DPT_LAB",
  DptRadiology = "DPT_RADIOLOGY",
}

interface RequiredDoctorQualificationListClass {
  SkillRef: SkillRef[];
}

export enum SkillRef {
  SkillDocQualifGeneralMedicine = "SKILL_DOC_QUALIF_GENERAL_MEDICINE",
  SkillDocSpecAcuteMedicine = "SKILL_DOC_SPEC_ACUTE_MEDICINE",
  SkillDocSpecAdvancedDiagnosis = "SKILL_DOC_SPEC_ADVANCED_DIAGNOSIS",
  SkillDocSpecAnesthesiology = "SKILL_DOC_SPEC_ANESTHESIOLOGY",
  SkillDocSpecCardioSurgery = "SKILL_DOC_SPEC_CARDIO_SURGERY",
  SkillDocSpecCardiology = "SKILL_DOC_SPEC_CARDIOLOGY",
  SkillDocSpecCriticalCare = "SKILL_DOC_SPEC_CRITICAL_CARE",
  SkillDocSpecGeneralSurgery = "SKILL_DOC_SPEC_GENERAL_SURGERY",
  SkillDocSpecInternalMedicine = "SKILL_DOC_SPEC_INTERNAL_MEDICINE",
  SkillDocSpecInternalMedicineSurgery = "SKILL_DOC_SPEC_INTERNAL_MEDICINE_SURGERY",
  SkillDocSpecNeuroSurgery = "SKILL_DOC_SPEC_NEURO_SURGERY",
  SkillDocSpecNeurology = "SKILL_DOC_SPEC_NEUROLOGY",
  SkillDocSpecOperativeSurgery = "SKILL_DOC_SPEC_OPERATIVE_SURGERY",
  SkillDocSpecOrthopaedicSurgery = "SKILL_DOC_SPEC_ORTHOPAEDIC_SURGERY",
  SkillDocSpecOrthopaedy = "SKILL_DOC_SPEC_ORTHOPAEDY",
  SkillDocSpecTraumaSurgery = "SKILL_DOC_SPEC_TRAUMA_SURGERY",
  SkillDocSpecTraumatology = "SKILL_DOC_SPEC_TRAUMATOLOGY",
  SkillNurseQualifPatientCare = "SKILL_NURSE_QUALIF_PATIENT_CARE",
  SkillNurseSpecMedicalSurgery = "SKILL_NURSE_SPEC_MEDICAL_SURGERY",
}

interface PurpleRequiredEquipmentList {
  RequiredEquipment: RequiredEquipment[];
}

interface RequiredEquipment {
  Tag:               string[];
  DurationHours?:    number;
  BlocksSpecialist?: boolean;
}

interface RequiredRoomTagElement {
  Tag: string[];
}

interface RequiredRoomTypeList {
  RequiredRoomTypeRef: string[];
}

enum RequiredStatLabQualificationRef {
  SkillLabSpecialistQualifScienceEducation = "SKILL_LAB_SPECIALIST_QUALIF_SCIENCE_EDUCATION",
  SkillLabSpecialistSpecCardiology = "SKILL_LAB_SPECIALIST_SPEC_CARDIOLOGY",
  SkillLabSpecialistSpecNeurology = "SKILL_LAB_SPECIALIST_SPEC_NEUROLOGY",
  SkillLabSpecialistSpecRadiology = "SKILL_LAB_SPECIALIST_SPEC_RADIOLOGY",
  SkillLabSpecialistSpecUsg = "SKILL_LAB_SPECIALIST_SPEC_USG",
}

enum StaffSelectionRules {
  DefaultRooms = "DEFAULT_ROOMS",
  RequiredRoomIgnoreDoctor = "REQUIRED_ROOM_IGNORE_DOCTOR",
  RequiredRoomOrDefaultRoom = "REQUIRED_ROOM_OR_DEFAULT_ROOM",
}

interface GameDBTreatment {
  AbbreviationLocID:              string;
  DiscomfortLevel:                DiscomfortLevel[];
  Procedure:                      GameDBTreatmentProcedure;
  TreatmentType?:                 TreatmentType;
  Cost?:                          number;
  IconIndex:                      number;
  HospitalizationTreatmentRef?:   HospitalizationTreatmentRef;
  DurationHours?:                 number;
  ReceiptType?:                   ReceiptType;
  AllowedWithAnyHospitalization?: boolean[];
  PharmacyPickup?:                boolean;
  CancelWhenTransferredToICU?:    boolean;
  SuccessRatePercent?:            number;
  DepartmentNamingExceptions?:    DepartmentNamingExceptions;
  OnlyAfterDiagnosis?:            boolean;
}

interface DepartmentNamingExceptions {
  DepartmentNamingException: DepartmentNamingException;
}

interface DepartmentNamingException {
  DepartmentID:      string;
  NameLocID:         string;
  AbbreviationLocID: string;
  IconID:            number;
}

enum HospitalizationTreatmentRef {
  TrtHospitalizationHighPriority = "TRT_HOSPITALIZATION_HIGH_PRIORITY",
  TrtHospitalizationNormal = "TRT_HOSPITALIZATION_NORMAL",
}

interface GameDBTreatmentProcedure {
  StaffSelectionRules?:                      StaffSelectionRules;
  RequiredSkillsToPrescribe?:                RequiredDoctorQualificationListClass;
  RequiredDoctorQualificationList?:          RequiredDoctorQualificationListClass;
  RequiredDoctorRoles?:                      RequiredRoles;
  FallbackDoctorDepartments?:                FallbackDoctorDepartments;
  RequiredNurseQualificationList?:           RequiredDoctorQualificationListClass;
  RequiredNurseRoles?:                       RequiredRoles;
  RequiredRoomTags?:                         RequiredRoomTagElement[];
  BedPositionsStaff?:                        BedPositionsStaff;
  Complications?:                            Complications;
  RequiredEquipmentList?:                    FluffyRequiredEquipmentList[];
  ProcedureScript?:                          ProcedureScript;
  SpeechBubbleRef?:                          SpeechBubbleRef;
  EquipmentFromAnyDepartment?:               boolean;
  DressLevel?:                               DressLevel;
  DressLevelAfter?:                          DressLevelAfter;
  SpeechBubbleRefPlease?:                    string;
  SpeechBubbleRefUse?:                       string;
  ReplacementSurgery?:                       boolean;
  AnimationSetupSitting?:                    AnimationSetupIng;
  AnimationSetupLying?:                      AnimationSetupIng[];
  DetachedDepartmentRef?:                    string;
  BottomProcedure?:                          boolean;
  RequiredStatLabQualificationRef?:          RequiredStatLabQualificationRef;
  FallbackLabDepartmentRef?:                 DepartmentRef;
  RequiredMobileWorkStationEquipmentSwitch?: boolean;
  TopProcedure?:                             boolean;
  HospitalizationLevel?:                     string;
}

interface BedPositionsStaff {
  MainSurgeonPosition:      MainSurgeonPosition;
  SurgeonAsistantPosition:  TPosition;
  AnesthesiologistPosition: TPosition;
  SurgeryNursePosition:     SurgeryNursePosition;
  AssistantNursePosition:   AssistantNursePosition;
}

enum TPosition {
  BodyRight = "BODY_RIGHT",
  HeadRight = "HEAD_RIGHT",
  None = "NONE",
}

enum AssistantNursePosition {
  BodyLeft = "BODY_LEFT",
  FeetRight = "FEET_RIGHT",
  FeetRightUp = "FEET_RIGHT_UP",
}

enum MainSurgeonPosition {
  BodyLeft = "BODY_LEFT",
  FeetRight = "FEET_RIGHT",
  HeadLeft = "HEAD_LEFT",
}

enum SurgeryNursePosition {
  FeetLeft = "FEET_LEFT",
  FeetLeftUp = "FEET_LEFT_UP",
}

interface Complications {
  Complication: Complication[];
}

interface Complication {
  SymptomRef:                      SymptomRef;
  ProbabilityPercent:              number;
  ProbabilityPercentMaxSkillLevel: number;
}

enum SymptomRef {
  SymAbscess = "SYM_ABSCESS",
  SymAlveolarCollapse = "SYM_ALVEOLAR_COLLAPSE",
  SymBleedingFromTheWound = "SYM_BLEEDING_FROM_THE_WOUND",
  SymBrainSwelling = "SYM_BRAIN_SWELLING",
  SymCardiacTamponade = "SYM_CARDIAC_TAMPONADE",
  SymSeizures = "SYM_SEIZURES",
  SymSepsis = "SYM_SEPSIS",
  SymUnstableBloodPressure = "SYM_UNSTABLE_BLOOD_PRESSURE",
  SymWoundInfection = "SYM_WOUND_INFECTION",
}

enum DressLevelAfter {
  ForearmBandage = "FOREARM_BANDAGE",
  Full = "FULL",
  HalfTop = "HALF_TOP",
}

interface FallbackDoctorDepartments {
  DepartmentRef: DepartmentRefElement[];
}

enum DepartmentRefElement {
  DptDefault = "DPT_DEFAULT",
  DptIcu = "DPT_ICU",
}

enum ProcedureScript {
  ProcedureScriptTreatmentPrescription = "ProcedureScriptTreatmentPrescription",
  ProcedureScriptTreatmentProcedure = "ProcedureScriptTreatmentProcedure",
  ProcedureScriptTreatmentReceipt = "ProcedureScriptTreatmentReceipt",
  ProcedureScriptTreatmentResuscitation = "ProcedureScriptTreatmentResuscitation",
  ProcedureScriptTreatmentSurgery = "ProcedureScriptTreatmentSurgery",
  ProcedureScriptTreatmentSurgeryFracture = "ProcedureScriptTreatmentSurgeryFracture",
  ProcedureScriptTreatmentSurgeryFractureLegs = "ProcedureScriptTreatmentSurgeryFractureLegs",
  ProcedureScriptTreatmentSurgeryLaparoEndo = "ProcedureScriptTreatmentSurgeryLaparoEndo",
  ProcedureScriptTreatmentSurgeryLigiCauterization = "ProcedureScriptTreatmentSurgeryLigiCauterization",
  ProcedureScriptTreatmentSurgeryNeurology = "ProcedureScriptTreatmentSurgeryNeurology",
}

interface RequiredRoles {
  RoleRef: RoleRef[];
}

enum RoleRef {
  EmplRoleSurgery = "EMPL_ROLE_SURGERY",
  EmplRoleSurgeryAnesthesiology = "EMPL_ROLE_SURGERY_ANESTHESIOLOGY",
  EmplRoleSurgeryAssist = "EMPL_ROLE_SURGERY_ASSIST",
  EmplRoleSurgeryNurse = "EMPL_ROLE_SURGERY_NURSE",
}

interface FluffyRequiredEquipmentList {
  RequiredEquipment: RequiredRoomTagElement[];
}

enum SpeechBubbleRef {
  BubblePlaceholder = "BUBBLE_PLACEHOLDER",
}

enum ReceiptType {
  BloodBag = "BLOOD_BAG",
  IvBag = "IV_BAG",
  OxygenMask = "OXYGEN_MASK",
}

enum TreatmentType {
  Hospitalization = "HOSPITALIZATION",
  Prescription = "PRESCRIPTION",
  Procedure = "PROCEDURE",
  Receipt = "RECEIPT",
  Surgery = "SURGERY",
}
