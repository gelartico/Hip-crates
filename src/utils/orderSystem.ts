import { ClinicalCase, AvailableOrder } from '../types/clinical';

export interface OrderResolution {
  matchedOrder?: AvailableOrder;
  department: string;
  responseText: string;
  cost: number;
  waitTimeMin: number;
  tipo: 'imagen' | 'valores' | 'examen_fisico' | 'tratamiento' | 'rechazado';
  valores?: Record<string, string>;
  imageType?: 'ecg' | 'xray' | 'angiotac';
  actionId?: string;
  isActionTreatment?: boolean;
}

export function resolveHospitalOrder(input: string, clinicalCase: ClinicalCase): OrderResolution {
  const query = input.toLowerCase().trim();
  const normalized = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const availableStudies = clinicalCase.ordenes_disponibles?.estudios || [];

  // Match against keywords in the case JSON
  for (const item of availableStudies) {
    const isMatched = item.keywords.some((kw) => {
      const normKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalized.includes(normKw) || normKw.includes(normalized);
    });

    if (isMatched) {
      return {
        matchedOrder: item,
        department: item.department,
        responseText: item.reporte,
        cost: item.costo_puntos,
        waitTimeMin: item.tiempo_espera_min,
        tipo: item.tipo,
        valores: item.valores,
        imageType: item.imageType,
        actionId: item.actionId,
        isActionTreatment: item.tipo === 'tratamiento',
      };
    }
  }

  // Common inappropriate orders based on clinical case context
  const isCoronary = /coronari|pecho|torac|infarto/i.test(clinicalCase.title + ' ' + clinicalCase.chiefComplaint);
  const isDigestive = clinicalCase.id === 'caso_001' || /gastric|esofag|epigastr|digestiv/i.test(clinicalCase.title + ' ' + clinicalCase.chiefComplaint);

  if (/resonancia|rmn|rm de|rodilla|tobillo|hombro|lumbar|cadera/i.test(normalized)) {
    return {
      department: 'Radiología & Imagen',
      responseText: 'Estudio no disponible en guardia de urgencias / Solicitud rechazada por falta de justificación clínica para el cuadro actual.',
      cost: 25,
      waitTimeMin: 45,
      tipo: 'rechazado',
    };
  }

  if (/tac|scanner|tomografia/i.test(normalized) && /craneo|cerebro|cerebral|cabeza/i.test(normalized)) {
    return {
      department: 'Radiología & Imagen',
      responseText: isCoronary
        ? 'Solicitud rechazada por radiología: Paciente consciente, orientado, sin traumatismo ni focalidad neurológica. No justificado en sospecha coronaria.'
        : 'Solicitud rechazada por radiología: Paciente consciente, lúcido (Glasgow 15/15) y afebril. Sin traumatismo ni focalidad que justifique TC craneal urgente.',
      cost: 25,
      waitTimeMin: 40,
      tipo: 'rechazado',
    };
  }

  if (/colonoscopia|fibrocolonoscopia/i.test(normalized)) {
    return {
      department: 'Servicio de Endoscopias',
      responseText: isDigestive
        ? 'Servicio de Endoscopias: Colonoscopia diferida. Con pérdida ponderal, saciedad precoz y dolor epigástrico, la prioridad absoluta es la Endoscopia Digestiva Alta (VEDA) con toma de biopsias.'
        : 'Servicio de Endoscopias: Estudio electivo rechazado. No justificado en la atención inmediata de este paciente.',
      cost: 20,
      waitTimeMin: 45,
      tipo: 'rechazado',
    };
  }

  if (/endoscopia|gastroscopia/i.test(normalized) && isCoronary) {
    return {
      department: 'Enfermería de Urgencias',
      responseText: 'Servicio de Endoscopias: Estudio electivo rechazado. Paciente con sospecha de síndrome coronario agudo en curso.',
      cost: 30,
      waitTimeMin: 60,
      tipo: 'rechazado',
    };
  }

  if (/eco|ecocardiograma|doppler/i.test(normalized)) {
    return {
      department: 'Cardiología',
      responseText: 'Ecocardiograma transtorácico urgente: Hipocinesia anteroapical concordante con el territorio de arteria descendente anterior. Fracción de eyección del VI estimada en 45%. Sin derrame pericárdico.',
      cost: 20,
      waitTimeMin: 20,
      tipo: 'valores',
      valores: {
        'Contractilidad global': 'Hipocinesia anteroapical',
        'FEVI': '45%',
        'Derrame pericárdico': 'Ausente',
        'Aorta ascendente': 'Calibre normal (32 mm)'
      }
    };
  }

  // Fallback for unlisted laboratory/study
  return {
    department: 'Laboratorio central',
    responseText: 'Muestra procesada. Parámetros solicitados dentro de límites normales de referencia.',
    cost: 10,
    waitTimeMin: 25,
    tipo: 'valores',
    valores: {
      'Resultado': 'Dentro de límites normales'
    }
  };
}
