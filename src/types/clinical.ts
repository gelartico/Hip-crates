export type RobotColor = 'blue' | 'pink' | 'yellow';

export type SimulationMode = 'patient' | 'creator';

export type ClinicalModule = 'respiratorio' | 'cardio' | 'neuro' | 'digestivo';

export type ClinicalStage = 'initial' | 'improving' | 'worsened' | 'resolved' | 'critical';

export interface VitalSigns {
  bpSystolic: number;
  bpDiastolic: number;
  heartRate: number;
  respRate: number;
  oxygenSat: number;
  temperature: number;
  painScore: number; // 0-10 scale
}

export interface PhysicalExamFindings {
  general: string;
  cardiac: string;
  pulmonary: string;
  skin: string;
  abdomen: string;
  extremities: string;
  neckVessels: string;
  neurological: string;
}

export interface ComplementaryStudies {
  ecg: {
    rhythm: string;
    summary: string;
    stElevationLeads: string[];
    stElevationMm: number;
    detailedDescription: string;
  };
  troponins: string;
  cpkCkmb: string;
  hemogram: string;
  biochemistry: string;
  coagulation: string;
  chestXray: string;
  radiologyImage?: {
    type: 'xray' | 'resonance' | 'angiotac';
    title: string;
    report: string;
    findingsHighlight: string;
    technicalData: string;
  };
  arterialBloodGas: string;
  otherDefault: string;
}

export interface ClinicalAction {
  id: string;
  name: string;
  category: 'monitoring' | 'oxygen' | 'antiplatelet' | 'anticoagulation' | 'antiischemic' | 'reperfusion' | 'fluid' | 'contraindicated';
  isCorrect: boolean;
  isMandatory?: boolean;
  doseDescription?: string;
  rationale: string;
  vitalImpact?: Partial<VitalSigns>;
}

export interface AvailableOrder {
  id: string;
  keywords: string[];
  department: 'Laboratorio central' | 'Radiología & Imagen' | 'Cardiología' | 'Enfermería de Urgencias' | 'Farmacia Hospitalaria';
  tipo: 'imagen' | 'valores' | 'examen_fisico' | 'tratamiento' | 'rechazado';
  titulo: string;
  reporte: string;
  valores?: Record<string, string>;
  costo_puntos: number;
  tiempo_espera_min: number;
  es_pertinente: boolean;
  actionId?: string;
  imageType?: 'ecg' | 'xray' | 'angiotac';
}

export interface NursingLogEntry {
  id: string;
  timestamp: string;
  department: string;
  orderText: string;
  responseText: string;
  cost: number;
  waitTimeMin: number;
  tipo: 'imagen' | 'valores' | 'examen_fisico' | 'tratamiento' | 'rechazado';
  valores?: Record<string, string>;
  imageType?: 'ecg' | 'xray' | 'angiotac';
}

export interface ClinicalCase {
  id: string;
  code: string;
  title: string;
  patientName?: string;
  clinicalModule?: ClinicalModule;
  gender: 'masculino' | 'femenino';
  age: number;
  colorTheme: RobotColor;
  chiefComplaint: string;
  history: {
    hypertension: string;
    smoking: string;
    allergies: string;
    medications: string;
    pastSurgeries: string;
    familyHistory: string;
    otherAntecedents?: string;
  };
  currentSymptoms: {
    painLocation: string;
    painQuality: string;
    painIrradiation: string;
    painIntensity: number;
    associatedSymptoms: string[];
    onset: string;
    dyspneaLevel: 'none' | 'mild' | 'moderate' | 'severe';
  };
  initialVitals: VitalSigns;
  physicalExam: PhysicalExamFindings;
  complementaryStudies: ComplementaryStudies;
  ordenes_disponibles: {
    estudios: AvailableOrder[];
  };
  targetDiagnosis: string;
  expectedActions: ClinicalAction[];
  contraindicatedActions: {
    id: string;
    name: string;
    harmRationale: string;
    vitalPenalty: Partial<VitalSigns>;
  }[];
  debriefNotes: {
    clinicalPearl: string;
    guidelineReference: string;
    keyPitfalls: string[];
  };
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'robodoc' | 'system';
  text: string;
  timestamp: string;
  type?: 'anamnesis' | 'physical_exam' | 'lab_result' | 'treatment' | 'system_alert';
  isPhysicalExam?: boolean;
  isLabResult?: boolean;
}
