export enum DepartmentRef {
  DptCardiology = 'DPT_CARDIOLOGY',
  DptEmergency = 'DPT_EMERGENCY',
  DptGeneralSurgery = 'DPT_GENERAL_SURGERY_DEPARTMENT',
  DptInfectiousDiseases = 'DPT_INFECTIOUS_DISEASES_DEPARTMENT',
  DptInternalMedicine = 'DPT_INTERNAL_MEDICINE_DEPARTMENT',
  DptNeurology = 'DPT_NEUROLOGY',
  DptOrthopaedics = 'DPT_ORTHOPAEDICS_AND_TRAUMATOLOGY',
  DptTraumatology = 'DPT_TRAUMATOLOGY_DEPARTMENT',
  DptOncology = 'DPT_ONCOLOGY',
  DptEarNoseThroat = 'DPT_OTORHINOLARYNGOLOGY',
}

export const ModdedDepartments = [
  DepartmentRef.DptOncology,
  DepartmentRef.DptEarNoseThroat,
];
