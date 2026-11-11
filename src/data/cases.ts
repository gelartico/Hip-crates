import { ClinicalCase } from '../types/clinical';

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'caso_dig_001',
    code: 'Módulo Digestivo · Caso 01',
    patientName: 'Hipócrates',
    clinicalModule: 'digestivo',
    title: 'Dolor Epigástrico, Saciedad Precoz y Pérdida Ponderal',
    gender: 'masculino',
    age: 64,
    colorTheme: 'yellow',
    chiefComplaint: 'Dolor epigástrico sordo que empeora al comer, saciedad precoz y pérdida de 8 kg en 3 meses.',
    history: {
      hypertension: 'Hipertensión arterial diagnosticada hace 8 años, en tratamiento con Enalapril 10 mg/día vía oral.',
      smoking: 'Tabaquismo intenso con índice tabáquico de 35 paquetes/año (fuma 1 paquete al día desde hace 35 años).',
      allergies: 'No refiere alergias medicamentosas conocidas ni a alimentos.',
      medications: 'Enalapril 10 mg/día por la mañana y Metformina 850 mg cada 12 horas con las comidas. Toma antiácidos ocasionales de venta libre.',
      pastSurgeries: 'Sin antecedentes quirúrgicos mayores.',
      familyHistory: 'Padre fallecido a los 70 años por patología oncológica digestiva no especificada. Madre con diabetes tipo 2 e hipertensión.',
      otherAntecedents: 'Diabetes Mellitus tipo 2 desde hace 6 años. Reflujo gastroesofágico crónico (pirosis frecuente) y antecedentes de gastritis diagnosticada hace años sin tratamiento erradicador completo para Helicobacter pylori.'
    },
    currentSymptoms: {
      painLocation: 'Región epigástrica y abdomen superior central.',
      painQuality: 'Dolor sordo continuo, sensación de pesadez gravativa y quemazón que empeora marcadamente con la ingesta.',
      painIrradiation: 'Sin irradiación posterior franca; ligera molestia urente retroesternal ascendente.',
      painIntensity: 4,
      associatedSymptoms: [
        'Saciedad precoz (se llena con pocos bocados)',
        'Pérdida involuntaria de 8 kg de peso en los últimos 3 meses',
        'Astenia progresiva y cansancio al esfuerzo habitual',
        'Náuseas postprandiales ocasionales sin vómitos francos'
      ],
      onset: 'Inicio insidioso hace 3 meses con empeoramiento progresivo en las últimas 3 semanas.',
      dyspneaLevel: 'none'
    },
    initialVitals: {
      bpSystolic: 130,
      bpDiastolic: 80,
      heartRate: 76,
      respRate: 16,
      oxygenSat: 97,
      temperature: 36.6,
      painScore: 4
    },
    physicalExam: {
      general: '*Paciente lúcido, afebril, orientado en tiempo, espacio y persona. Se aprecia palidez cutáneo-mucosa moderada y facies de adelgazamiento cronificado con atrofia de tejido adiposo superficial.*',
      cardiac: '*Ruidos cardíacos rítmicos y normofonéticos a 76 lpm. Sin soplos audibles, sin galope R3/R4, sin roces pericárdicos.*',
      pulmonary: '*Murmullo vesicular conservado en ambos campos pulmonares, sin ruidos respiratorios sobreañadidos (sin crepitantes ni sibilancias). Eupneico con ventilación espontánea.*',
      skin: '*Piel y mucosas con palidez moderada y leve tinte subictérico en conjuntivas. Sin petequias ni lesiones cutáneas.*',
      abdomen: '*Abdomen plano, blando, doloroso a la palpación profunda en epigastrio sin defensa ni descompresión (signo de Blumberg negativo). No se palpan masas epigástricas circunscritas ni visceromegalias (hígado y bazo dentro de límites normales). Ruidos hidroaéreos normales.*',
      extremities: '*Extremidades delgadas sin edemas periféricos. Pulsos arteriales distales presentes y simétricos.*',
      neckVessels: '*Sin ingurgitación yugular ni soplos carotídeos. No se palpan adenopatías en fosa supraclavicular izquierda (ganglio de Virchow negativo) ni cervicales.*',
      neurological: '*Glasgow 15/15. Pares craneales normales, sensibilidad y fuerza muscular 5/5 bilateral sin focalidad.*'
    },
    complementaryStudies: {
      ecg: {
        rhythm: 'Ritmo sinusal regular a 76 lpm',
        summary: 'Trazado normal sin alteraciones de la repolarización ni signos isquémicos',
        stElevationLeads: [],
        stElevationMm: 0,
        detailedDescription: 'Ritmo sinusal regular a 76 lpm, eje QRS a +45°, intervalos PR (0.16s) y QRS (0.08s) normales. Segmento ST isoeléctrico en todas las derivaciones. Sin signos de isquemia ni arritmias.'
      },
      troponins: '*Troponina I ultrasensible: 4 ng/L (Normal, valor de referencia < 14 ng/L). Sin necrosis miocárdica.*',
      cpkCkmb: '*CPK Total: 68 U/L | CK-MB: 1.8 ng/mL (Ambos dentro de rango normal).*',
      hemogram: '*Hemograma completo: Leucocitos 6,400/uL con fórmula leucocitaria normal. Hemoglobina 9.8 g/dL (baja), Hematocrito 30.2%, VCM 74 fL (microcítica), HCM 24 pg (hipocrómica), Plaquetas 310,000/uL. Conclusión: Anemia microcítica e hipocrómica sugerente de ferropenia por sangrado crónico oculto.*',
      biochemistry: '*Bioquímica sérica: Glucemia 138 mg/dL (DBT2), Urea 32 mg/dL, Creatinina 0.95 mg/dL (TFGe 88 ml/min), Albúmina 3.4 g/dL (leve hipoalbuminemia nutricional), Sodio 139 mEq/L, Potasio 4.2 mEq/L, Bilirrubina Total 1.4 mg/dL (Directa 0.4 mg/dL, matiz subictérico leve), AST/GOT 26 U/L, ALT/GPT 24 U/L, Fosfatasa Alcalina 94 U/L, Ferritina sérica 11 ng/mL (muy disminuida, confirmando ferropenia franca).*',
      coagulation: '*Coagulación: Tiempo de Protrombina 12.2 seg (INR 1.02), TTPA 28.0 seg, Fibrinógeno 340 mg/dL.*',
      chestXray: '*Radiografía de tórax PA: Silueta cardiaca de tamaño normal (ICT 0.46). Campos pleuropulmonares limpios, sin condensaciones, derrames ni lesiones nodulares metastásicas parenquimatosas en "suelta de globos".*',
      radiologyImage: {
        type: 'angiotac',
        title: 'TAC Tóraco-Abdomino-Pélvica con Contraste Oral e IV (Estadiaje)',
        report: 'Engrosamiento parietal concéntrico asimétrico de hasta 18 mm en antro gástrico y unión esofagogástrica con captación heterogénea de contraste. Se identifican 3 adenopatías perigástricas en curvatura menor y cadena gástrica izquierda de 12 a 16 mm de eje corto. Hígado sin metástasis focales evidentes. Ausencia de ascitis ni implantes peritoneales.',
        findingsHighlight: 'Tumoración gástrica antral/esófago distal con invasión parietal transmural y adenopatías locorregionales sospechosas (estadiaje presuntivo cT3 N1 M0). Requiere confirmación histopatológica por endoscopia y evaluación oncológica.',
        technicalData: 'TC helicoidal multicorte de tórax, abdomen y pelvis con contraste oral no iónico e intravenoso iodado.'
      },
      arterialBloodGas: '*Gasometría venosa: pH 7.39, pCO2 40 mmHg, HCO3 24 mEq/L, Lactato 0.9 mmol/L.*',
      otherDefault: '*Endoscopia Digestiva Alta (VEDA) con biopsia: Esófago distal muestra lengüetas de mucosa asalmonada de 3 cm compatibles con esófago de Barrett (Praga C2M3). En antro gástrico distal y cardias se visualiza lesión exofítica, vegetante y ulcerada de 3.5 cm de diámetro, friable, con sangrado en napa al contacto con el endoscopio. Se toman 8 biopsias. Anatomía patológica informa: Adenocarcinoma tubular infiltrante moderadamente diferenciado (G2) desarrollado sobre metaplasia intestinal.*'
    },
    ordenes_disponibles: {
      estudios: [
        {
          id: 'veda',
          keywords: ['endoscopia', 'endoscopia digestiva alta', 'veda', 'gastroscopia', 'biopsia gastrica', 'fibrogastroscopia'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Endoscopia Digestiva Alta (VEDA) con Biopsia',
          reporte: 'Esófago distal con lengüeta de mucosa de Barrett. Antro gástrico con masa vegetante y ulcerada de 3.5 cm con sangrado en napa. Biopsia confirma Adenocarcinoma gástrico tubular moderadamente diferenciado.',
          valores: {
            'Hallazgo macroscópico': 'Masa ulcerovegetante de 3.5 cm en antro/cardias',
            'Mucosa de Barrett': 'Presente en esófago distal (C2M3)',
            'Histopatología': 'Adenocarcinoma tubular infiltrante G2',
            'Helicobacter pylori': 'Positivo por prueba rápida de ureasa'
          },
          costo_puntos: 15,
          tiempo_espera_min: 30,
          es_pertinente: true,
          actionId: 'order_endoscopy'
        },
        {
          id: 'tac_estadiaje',
          keywords: ['tac abdomen', 'tac torax', 'tac toracoabdominal', 'tomografia', 'tac con contraste', 'estadiaje'],
          department: 'Radiología & Imagen',
          tipo: 'imagen',
          titulo: 'TAC Tóraco-Abdomino-Pélvica con Contraste (Estadiaje TNM)',
          reporte: 'Engrosamiento parietal de 18 mm en antro gástrico y cardias con adenopatías locorregionales en curvatura menor (12-16 mm). Sin metástasis hepáticas ni pulmonares visibles.',
          costo_puntos: 25,
          tiempo_espera_min: 40,
          es_pertinente: true,
          imageType: 'angiotac',
          actionId: 'order_ct_staging'
        },
        {
          id: 'hemograma',
          keywords: ['hemograma', 'anemia', 'ferritina', 'hierro', 'plaquetas', 'hemoglobina', 'vcm'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Hemograma Completo y Cinética de Hierro',
          reporte: 'Anemia microcítica e hipocrómica por microhemorragia tumoral oculta crónica.',
          valores: {
            'Hemoglobina': '9.8 g/dL (Ref: 13.5-17.5 g/dL) [BAJA]',
            'Hematocrito': '30.2%',
            'VCM': '74 fL (Ref: 80-100 fL) [MICROCÍTICA]',
            'HCM': '24 pg [HIPOCRÓMICA]',
            'Ferritina': '11 ng/mL (Ref: 30-300 ng/mL) [DÉFICIT CRÍTICO]',
            'Leucocitos': '6,400 /uL'
          },
          costo_puntos: 8,
          tiempo_espera_min: 20,
          es_pertinente: true,
          actionId: 'order_hemogram'
        },
        {
          id: 'bioquimica',
          keywords: ['bioquimica', 'perfil renal', 'creatinina', 'albumina', 'perfil hepatico', 'bilirrubina', 'glucosa'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Bioquímica Completa, Perfil Hepático y Renal',
          reporte: 'Panel metabólico con glucemia basal elevada y leve hipoalbuminemia nutricional.',
          valores: {
            'Glucemia': '138 mg/dL (DBT2 en tto con Metformina)',
            'Albúmina': '3.4 g/dL (Ref: 3.5-5.0 g/dL)',
            'Bilirrubina Total': '1.4 mg/dL (Tinte subictérico)',
            'Creatinina': '0.95 mg/dL (TFGe 88 ml/min)',
            'Fosfatasa Alcalina': '94 U/L'
          },
          costo_puntos: 8,
          tiempo_espera_min: 20,
          es_pertinente: true
        },
        {
          id: 'sangre_oculta',
          keywords: ['sangre oculta', 'fobt', 'heces', 'sangre en heces', 'fit'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Test Inmunológico de Sangre Oculta en Heces (FIT/FOBT)',
          reporte: 'Resultado: POSITIVO para sangrado digestivo oculto intraluminal.',
          valores: {
            'Sangre oculta en heces': 'POSITIVA (+)'
          },
          costo_puntos: 5,
          tiempo_espera_min: 15,
          es_pertinente: true
        },
        {
          id: 'rx_torax',
          keywords: ['rx torax', 'radiografia de torax', 'placa de torax', 'rx de torax'],
          department: 'Radiología & Imagen',
          tipo: 'imagen',
          titulo: 'Radiografía de Tórax PA',
          reporte: 'Silueta cardiaca normal. Sin nódulos metastásicos en campos pleuropulmonares ni derrame pleural.',
          costo_puntos: 10,
          tiempo_espera_min: 8,
          es_pertinente: true,
          imageType: 'xray'
        },
        {
          id: 'ecg',
          keywords: ['ecg', 'electrocardiograma', 'electro', 'trazado'],
          department: 'Cardiología',
          tipo: 'imagen',
          titulo: 'Electrocardiograma de 12 derivaciones',
          reporte: 'Ritmo sinusal regular a 76 lpm. Sin signos de isquemia aguda ni arritmias.',
          costo_puntos: 5,
          tiempo_espera_min: 1,
          es_pertinente: true,
          imageType: 'ecg'
        },
        {
          id: 'palpacion_abdomen',
          keywords: ['palpacion abdominal', 'palpar abdomen', 'vientre', 'dolor epigastrio'],
          department: 'Enfermería de Urgencias',
          tipo: 'examen_fisico',
          titulo: 'Palpación Abdominal Detallada',
          reporte: '*Abdomen blando, doloroso a la palpación profunda en epigastrio sin defensa involuntaria ni signos de peritonismo (Blumberg negativo). No se palpan masas epigástricas circunscritas.*',
          costo_puntos: 0,
          tiempo_espera_min: 1,
          es_pertinente: true
        },
        {
          id: 'omeprazol_tto',
          keywords: ['omeprazol', 'pantoprazol', 'ibp', 'inhibidor de bomba', 'esomeprazol'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Inhibidor de Bomba de Protones (Omeprazol 40 mg IV/VO)',
          reporte: 'Se administra Omeprazol 40 mg para supresión ácida gástrica y protección de mucosa.',
          costo_puntos: 2,
          tiempo_espera_min: 2,
          es_pertinente: true,
          actionId: 'give_ppi'
        },
        {
          id: 'hierro_tto',
          keywords: ['hierro', 'hierro sacarosa', 'ferroterapia', 'ferroterapia intravenosa'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Reposición de Hierro (Hierro Sacarosa IV)',
          reporte: 'Enfermería infunde ampolla de hierro sacarosa para corrección de anemia ferropénica secundaria.',
          costo_puntos: 4,
          tiempo_espera_min: 10,
          es_pertinente: true,
          actionId: 'iron_replacement'
        },
        {
          id: 'interconsulta_comite',
          keywords: ['interconsulta oncologia', 'cirugia digestiva', 'comite oncologico', 'gastroenterologia', 'oncologia'],
          department: 'Enfermería de Urgencias',
          tipo: 'tratamiento',
          titulo: 'Derivación Urgente a Comité Multidisciplinar (Gastroenterología, Cirugía Digestiva y Oncología)',
          reporte: 'Se cursa interconsulta urgente prioritaria para planificación de gastrectomía / resección oncológica y estadiaje formal.',
          costo_puntos: 0,
          tiempo_espera_min: 15,
          es_pertinente: true,
          actionId: 'oncology_consult'
        },
        {
          id: 'ibuprofeno_error',
          keywords: ['ibuprofeno', 'ketorolaco', 'diclofenaco', 'aines', 'naproxeno'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Prescripción de AINEs (Ibuprofeno 600 mg)',
          reporte: '¡Alerta de Seguridad Farmacológica! Los AINEs están gravemente contraindicados: riesgo severo de provocar hemorragia digestiva alta masiva sobre una neoplasia ulcerada y empeorar la anemia ferropénica.',
          costo_puntos: 25,
          tiempo_espera_min: 2,
          es_pertinente: false,
          actionId: 'give_nsaids_gastric'
        },
        {
          id: 'alta_prematura_error',
          keywords: ['alta medica', 'dar de alta', 'antiacido y a casa', 'gastritis comun y alta'],
          department: 'Enfermería de Urgencias',
          tipo: 'rechazado',
          titulo: 'Alta Hospitalaria con Antiácidos Simples',
          reporte: '¡Error Clínico Grave! Paciente de 64 años con síntomas de alarma (pérdida ponderal de 8 kg, saciedad precoz y anemia). Es mandatorio realizar endoscopia digestiva alta urgente.',
          costo_puntos: 40,
          tiempo_espera_min: 5,
          es_pertinente: false,
          actionId: 'premature_discharge_gastric'
        }
      ]
    },
    targetDiagnosis: 'Adenocarcinoma de esófago distal / gástrico antral sobre esófago de Barrett',
    expectedActions: [
      {
        id: 'order_endoscopy',
        name: 'Solicitar Endoscopia Digestiva Alta (VEDA) con toma de biopsia múltiple',
        category: 'monitoring',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Gastroscopia urgente con biopsias de antro y unión esofagogástrica',
        rationale: 'Estudio de primera línea mandatorio ante síntomas de alarma (pérdida ponderal y saciedad precoz en paciente > 50 años) para confirmar diagnóstico histopatológico.',
        vitalImpact: {}
      },
      {
        id: 'order_ct_staging',
        name: 'Solicitar TAC Tóraco-Abdomino-Pélvica con contraste (Estadiaje TNM)',
        category: 'monitoring',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'TC helicoidal multicorte con contraste oral e intravenoso',
        rationale: 'Indispensable para evaluar la profundidad tumoral, afectación ganglionar locorregional y descartar metástasis a distancia en hígado, peritoneo o pulmón.',
        vitalImpact: {}
      },
      {
        id: 'order_hemogram',
        name: 'Solicitar Hemograma completo y cinética de hierro',
        category: 'monitoring',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Hemograma con índices hematimétricos y ferritina sérica',
        rationale: 'Identifica y cuantifica la severidad de la anemia microcítica e hipocrómica por microhemorragia tumoral oculta.',
        vitalImpact: {}
      },
      {
        id: 'give_ppi',
        name: 'Prescribir Inhibidores de la Bomba de Protones (Omeprazol / Pantoprazol)',
        category: 'antiischemic',
        isCorrect: true,
        isMandatory: false,
        doseDescription: 'Omeprazol 40 mg IV o VO cada 24 horas',
        rationale: 'Reduce la secreción ácida gástrica, disminuye la irritación tumoral y favorece la cicatrización de lesiones mucosas sangrantes.',
        vitalImpact: { painScore: 2 }
      },
      {
        id: 'iron_replacement',
        name: 'Tratamiento de la Anemia Ferropénica (Hierro Sacarosa IV o VO)',
        category: 'fluid',
        isCorrect: true,
        isMandatory: false,
        doseDescription: 'Hierro sacarosa 100-200 mg IV en infusión lenta',
        rationale: 'Corrige el déficit marcial crónico provocado por las microhemorragias tumorales y mejora el estado de astenia del paciente.',
        vitalImpact: {}
      },
      {
        id: 'oncology_consult',
        name: 'Interconsulta Multidisciplinar Urgente (Cirugía Oncológica y Gastroenterología)',
        category: 'reperfusion',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Valoración en comité oncológico para resección quirúrgica y terapia neoadyuvante',
        rationale: '¡ACCIÓN DEFINITIVA TERAPÉUTICA! Planifica la gastrectomía / esofagectomía con linfadenectomía reglada según estadiaje TNM.',
        vitalImpact: { painScore: 1 }
      }
    ],
    contraindicatedActions: [
      {
        id: 'give_nsaids_gastric',
        name: 'Administrar AINEs (Ibuprofeno / Ketorolaco / Diclofenaco) para el dolor abdominal',
        harmRationale: 'Contraindicación formal: los AINEs inhiben las prostaglandinas protectoras de la mucosa gástrica y pueden precipitar una hemorragia digestiva alta masiva o perforación en una lesión tumoral ulcerada.',
        vitalPenalty: { painScore: 8, bpSystolic: 105, heartRate: 98 }
      },
      {
        id: 'premature_discharge_gastric',
        name: 'Dar de alta con diagnóstico presuntivo de "gastritis común" sin solicitar endoscopia',
        harmRationale: 'Grave iatrogenia médica: desestimar los síntomas de alarma en un adulto mayor (>50 años) demora el diagnóstico y condena al paciente a una etapa oncológica incurable.',
        vitalPenalty: { painScore: 7 }
      }
    ],
    debriefNotes: {
      clinicalPearl: 'En cualquier paciente de más de 50 años que consulte por dispepsia de reciente aparición, dolor epigástrico, saciedad precoz o pérdida de peso, la Endoscopia Digestiva Alta (VEDA) con toma de biopsias es OBLIGATORIA e inaplazable para descartar adenocarcinoma gástrico o esofágico.',
      guidelineReference: 'Guías de Práctica Clínica ESMO 2022 sobre Cáncer Gástrico y Esofágico / Guías ACG para la evaluación de la dispepsia y esófago de Barrett.',
      keyPitfalls: [
        'Tratar a ciegas con antiácidos o protectores gástricos sin solicitar endoscopia ante signos de alarma oncogástricos.',
        'Prescribir analgésicos tipo AINEs que precipitan hemorragia digestiva alta cataclísmica.',
        'Atribuir la anemia microcítica a la edad o dieta sin investigar sangrado digestivo crónico en un varón adulto mayor.'
      ]
    }
  },
  {
    id: 'caso_car_001',
    code: 'Módulo Cardio · Caso 01',
    patientName: 'Hipócrates',
    clinicalModule: 'cardio',
    title: 'Dolor Torácico Opresivo en Reposo (IAMCEST Anteroseptal)',
    gender: 'masculino',
    age: 58,
    colorTheme: 'blue',
    chiefComplaint: 'Dolor retroesternal opresivo irradiado a brazo izquierdo y diaforesis de 2h de evolución.',
    history: {
      hypertension: 'Hipertensión arterial diagnosticada hace 6 años, con tratamiento irregular (toma Enalapril solo cuando se siente mareado o le duele la cabeza).',
      smoking: 'Tabaquista activo con índice tabáquico de 20 paquetes/año (fuma 1 paquete al día desde hace 20 años).',
      allergies: 'No refiere alergias medicamentosas conocidas ni a contrastes yodados.',
      medications: 'Enalapril 20 mg por vía oral (toma irregular, última toma hace 3 días). No toma otros fármacos ni suplementos.',
      pastSurgeries: 'Apendicectomía a los 18 años sin complicaciones.',
      familyHistory: 'Padre fallecido por infarto agudo de miocardio a los 62 años. Madre viva con diabetes tipo 2.',
      otherAntecedents: 'Sedentario. No antecedentes de úlcera péptica activa ni de sangrado digestivo reciente.'
    },
    currentSymptoms: {
      painLocation: 'Retroesternal / precordial centro-torácico opresivo de gran intensidad.',
      painQuality: 'Opresivo, como si una losa pesada le estuviera aplastando el tórax. Sensación de muerte inminente.',
      painIrradiation: 'Se irradia hacia el cuello, la mandíbula y la cara interna del brazo izquierdo.',
      painIntensity: 8,
      associatedSymptoms: ['Diaforesis fría profusa', 'Náuseas moderadas sin vómitos', 'Leve sensación de falta de aire (disnea)'] ,
      onset: 'Comenzó de forma brusca hace 2 horas mientras estaba sentado mirando la televisión en reposo absoluto; no cede al cambiar de postura ni con la respiración.',
      dyspneaLevel: 'mild'
    },
    initialVitals: {
      bpSystolic: 155,
      bpDiastolic: 95,
      heartRate: 102,
      respRate: 22,
      oxygenSat: 94,
      temperature: 36.6,
      painScore: 8
    },
    physicalExam: {
      general: '*Paciente consciente, orientado en las tres esferas, quejumbroso, con mano en garra sobre el esternón (signo de Levine), diaforético y visiblemente angustiado.*',
      cardiac: '*Ruidos cardíacos rítmicos sin soplos audibles. Taquicárdico a 102 lpm. Sin galope R3 ni R4, sin roce pericárdico perceptible.*',
      pulmonary: '*Campos pulmonares limpios y bien ventilados bilateralmente. Murmullo vesicular conservado, sin estertores crepitantes ni sibilancias.*',
      skin: '*Piel llamativamente fría, pálida y con diaforesis profusa (sudoración fría copiosa). Relleno capilar en 2 segundos.*',
      abdomen: '*Abdomen blando, depresible, no doloroso a la palpación superficial ni profunda, ruidos hidroaéreos presentes y normales. Sin hepatomegalia ni reflujo hepatoyugular.*',
      extremities: '*Pulsos periféricos femorales, poplíteos, tibiales posteriores y pedios presentes, simétricos y de buena amplitud. No presenta edemas en miembros inferiores.*',
      neckVessels: '*Sin ingurgitación yugular a 45º. Pulsos carotídeos rítmicos y simétricos sin soplos.*',
      neurological: '*Escala de Coma de Glasgow 15/15. Pupilas isocóricas y normorreactivas. Sin déficit focal neurológico motor ni sensitivo.*'
    },
    complementaryStudies: {
      ecg: {
        rhythm: 'Ritmo sinusal taquicárdico a 102 lpm',
        summary: 'Elevación del segmento ST de 3 mm en derivaciones V1 a V4 (Cara Anteroseptal)',
        stElevationLeads: ['V1', 'V2', 'V3', 'V4'],
        stElevationMm: 3.0,
        detailedDescription: 'Ritmo sinusal regular a 102 lpm, PR normal (0.16s), QRS estrecho (0.08s). Se observa clara elevación convexa del segmento ST de 3 mm en derivaciones precordiales V1, V2, V3 y V4, asociada a ondas T positivas picudas hiperagudas. Imagen recíproca (espejo) con leve descenso del segmento ST en derivaciones de cara inferior (DII, DIII, aVF).'
      },
      troponins: '*Troponina I de alta sensibilidad: 480 ng/L (Límite superior normal: < 14 ng/L). Pendiente curva seriada a las 3 horas, franca necrosis miocárdica activa.*',
      cpkCkmb: '*CPK Total: 318 U/L (Ref: 30 - 200 U/L) | CK-MB masa: 41.5 ng/mL (Ref: < 5.0 ng/mL). Índice relativo marcadamente aumentado.*',
      hemogram: '*Hemograma urgente: Leucocitos 11,200/uL (72% neutrófilos, reacción de fase aguda por estrés), Hemoglobina 15.2 g/dL, Hematocrito 45.1%, Plaquetas 242,000/uL.*',
      biochemistry: '*Bioquímica sérica: Glucosa 124 mg/dL (estrés adrenérgico), Urea 34 mg/dL, Creatinina 0.92 mg/dL (TFGe > 90 ml/min/1.73m²), Sodio 139 mEq/L, Potasio 4.1 mEq/L, Cloro 101 mEq/L.*',
      coagulation: '*Coagulación: TP 12.0 seg (INR 1.01), TTPA 27.8 seg, Fibrinógeno 320 mg/dL.*',
      chestXray: '*Radiografía de tórax portátil (AP): Silueta cardiopericárdica de tamaño normal (índice cardiotorácico < 0.50). Senos costofrénicos libres. Trama vascular pulmonar de distribución normal sin líneas B de Kerley ni congestión alveolar.*',
      radiologyImage: {
        type: 'xray',
        title: 'Radiografía de Tórax Portátil (Proyección AP)',
        report: 'Silueta cardiopericárdica conservada sin cardiomegalia (ICT < 0.50). Hilios pulmonares de morfología y densidad normal. Campos pleuropulmonares sin consolidaciones ni infiltrados alveolares. Senos costofrénicos y cardiofrénicos libres bilateralmente. Sin signos de congestión venocapilar ni edema pulmonar agudo.',
        findingsHighlight: 'Rx Tórax sin alteraciones agudas evidentes: descarta neumotórax hipertensivo, disección aórtica con ensanchamiento mediastínico franco y edema agudo de pulmón.',
        technicalData: 'Estudio digital portátil en decúbito supino / Fowler 30°. KV 75, mAs 4.0. Calidad diagnóstica adecuada.'
      },
      arterialBloodGas: '*Gasometría arterial (aire ambiente): pH 7.42, pO2 84 mmHg, pCO2 36 mmHg, HCO3 23.5 mEq/L, EB -0.5, SatO2 94.5%, Lactato 1.1 mmol/L.*',
      otherDefault: '*Estudio complementario solicitado: Dentro de límites normales. Sin alteraciones patológicas agudas relevantes.*'
    },
    ordenes_disponibles: {
      estudios: [
        {
          id: 'ecg',
          keywords: ['ecg', 'electrocardiograma', 'trazado', 'electro', 'ecg 12 derivaciones', 'e.c.g'],
          department: 'Cardiología',
          tipo: 'imagen',
          titulo: 'Electrocardiograma de 12 derivaciones',
          reporte: 'Ritmo sinusal taquicárdico a 102 lpm. Se observa clara elevación del segmento ST de 3 mm en derivaciones V1 a V4 (Cara Anteroseptal) con ondas T hiperagudas e imagen en espejo en cara inferior.',
          costo_puntos: 5,
          tiempo_espera_min: 1,
          es_pertinente: true,
          imageType: 'ecg'
        },
        {
          id: 'rx_torax',
          keywords: ['rx torax', 'radiografia de torax', 'tele de torax', 'placa de torax', 'rx de torax', 'radiografia toracica'],
          department: 'Radiología & Imagen',
          tipo: 'imagen',
          titulo: 'Radiografía de Tórax Portátil AP',
          reporte: 'Silueta cardiopericárdica normal (ICT < 0.50). Senos costofrénicos libres. Sin consolidaciones, derrame ni ensanchamiento mediastínico agudo.',
          costo_puntos: 10,
          tiempo_espera_min: 8,
          es_pertinente: true,
          imageType: 'xray'
        },
        {
          id: 'enzimas',
          keywords: ['troponina', 'troponinas', 'troponina i', 'enzimas cardiacas', 'marcador cardiaco', 'biomarcadores', 'cpk', 'ck-mb'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Biomarcadores Cardíacos de Necrosis',
          reporte: 'Muestra sanguínea procesada con analizador de inmunoanálisis urgente. Curva seriada en curso.',
          valores: {
            'Troponina I ultrasensible': '480 ng/L (Ref: < 14 ng/L) [ELEVADA CRÍTICA]',
            'CPK Total': '318 U/L (Ref: 30-200 U/L)',
            'CK-MB masa': '41.5 ng/mL (Ref: < 5.0 ng/mL)'
          },
          costo_puntos: 10,
          tiempo_espera_min: 25,
          es_pertinente: true
        },
        {
          id: 'hemograma',
          keywords: ['hemograma', 'leucocitos', 'hematometria', 'plaquetas', 'hemoglobina', 'formula leucocitaria'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Hemograma Completo',
          reporte: 'Hemograma procesado por citometría de flujo.',
          valores: {
            'Leucocitos': '11,200 /uL (Neutrófilos 72%)',
            'Hemoglobina': '15.2 g/dL',
            'Hematocrito': '45.1%',
            'Plaquetas': '242,000 /uL'
          },
          costo_puntos: 8,
          tiempo_espera_min: 20,
          es_pertinente: true
        },
        {
          id: 'bioquimica',
          keywords: ['bioquimica', 'glucosa', 'creatinina', 'urea', 'perfil renal', 'electrolitos', 'iones', 'potasio', 'sodio'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Bioquímica Sérica e Iones',
          reporte: 'Panel metabólico básico analizado.',
          valores: {
            'Glucosa': '124 mg/dL',
            'Creatinina': '0.92 mg/dL (TFGe > 90 ml/min)',
            'Urea': '34 mg/dL',
            'Sodio (Na)': '139 mEq/L',
            'Potasio (K)': '4.1 mEq/L'
          },
          costo_puntos: 8,
          tiempo_espera_min: 20,
          es_pertinente: true
        },
        {
          id: 'coagulacion',
          keywords: ['coagulacion', 'inr', 'tiempo de protrombina', 'ttpa', 'fibrinogeno', 'hemostasia'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Coagulograma Básico',
          reporte: 'Tiempos de coagulación dentro de límites terapéuticos pre-intervención.',
          valores: {
            'TP (Protrombina)': '12.0 seg (INR 1.01)',
            'TTPA': '27.8 seg',
            'Fibrinógeno': '320 mg/dL'
          },
          costo_puntos: 8,
          tiempo_espera_min: 25,
          es_pertinente: true
        },
        {
          id: 'gasometria',
          keywords: ['gasometria', 'gasometria arterial', 'gases arteriales', 'lactato', 'ph'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Gasometría Arterial (Aire Ambiente)',
          reporte: 'Ventilación y equilibrio ácido-base compensado.',
          valores: {
            'pH': '7.42',
            'pO2': '84 mmHg',
            'pCO2': '36 mmHg',
            'SatO2': '94.5%',
            'Lactato': '1.1 mmol/L'
          },
          costo_puntos: 12,
          tiempo_espera_min: 15,
          es_pertinente: true
        },
        {
          id: 'dimero_d',
          keywords: ['dimero d', 'dimero-d', 'dimero'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Dímero D Cuantitativo',
          reporte: 'Dímero D: 280 ng/mL (Normal, < 500 ng/mL). Baja sospecha de tromboembolismo pulmonar en este contexto.',
          valores: {
            'Dímero D': '280 ng/mL (Normal)'
          },
          costo_puntos: 15,
          tiempo_espera_min: 30,
          es_pertinente: false
        },
        {
          id: 'auscultacion_cardiaca',
          keywords: ['auscultacion cardiaca', 'auscultar corazon', 'ruidos cardiacos', 'estetoscopio corazon', 'focos cardiacos'],
          department: 'Enfermería de Urgencias',
          tipo: 'examen_fisico',
          titulo: 'Auscultación Cardíaca al pie de cama',
          reporte: '*Ruidos cardíacos rítmicos sin soplos audibles. Taquicárdico a 102 lpm. Sin galope R3 ni R4, sin roce pericárdico perceptible.*',
          costo_puntos: 0,
          tiempo_espera_min: 1,
          es_pertinente: true
        },
        {
          id: 'auscultacion_pulmonar',
          keywords: ['auscultacion pulmonar', 'auscultar pulmones', 'campos pulmonares', 'murmullo vesicular'],
          department: 'Enfermería de Urgencias',
          tipo: 'examen_fisico',
          titulo: 'Auscultación Pulmonar Bilateral',
          reporte: '*Campos pulmonares limpios y bien ventilados bilateralmente. Murmullo vesicular conservado, sin estertores crepitantes ni sibilancias.*',
          costo_puntos: 0,
          tiempo_espera_min: 1,
          es_pertinente: true
        },
        {
          id: 'toma_pa',
          keywords: ['toma de presion', 'medir presion', 'presion arterial', 'tensiometro', 'esfigmomanometro'],
          department: 'Enfermería de Urgencias',
          tipo: 'examen_fisico',
          titulo: 'Toma Manual de Presión Arterial',
          reporte: '*Presión arterial: 155/95 mmHg en brazo derecho, 154/94 mmHg en brazo izquierdo. Pulso radial 102 lpm, rítmico y simétrico.*',
          costo_puntos: 0,
          tiempo_espera_min: 1,
          es_pertinente: true
        },
        {
          id: 'palpacion_abdomen',
          keywords: ['palpacion abdominal', 'palpar abdomen', 'abdomen', 'vientre'],
          department: 'Enfermería de Urgencias',
          tipo: 'examen_fisico',
          titulo: 'Palpación Abdominal',
          reporte: '*Abdomen blando, depresible, no doloroso a la palpación, ruidos hidroaéreos normales. Sin visceromegalias ni signos peritoneales.*',
          costo_puntos: 0,
          tiempo_espera_min: 1,
          es_pertinente: true
        },
        {
          id: 'aspirina',
          keywords: ['aspirina', 'aas', 'acido acetilsalicilico', 'aspirina 300', 'aspirina masticada'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Ácido Acetilsalicílico (AAS) 300 mg masticada',
          reporte: 'Enfermería administra 300 mg de AAS masticada por vía oral. Medicación tolerada.',
          costo_puntos: 2,
          tiempo_espera_min: 2,
          es_pertinente: true,
          actionId: 'aspirin_loading'
        },
        {
          id: 'ticagrelor',
          keywords: ['ticagrelor', 'segundo antiagregante', 'clopidogrel', 'prasugrel', 'dapt', 'doble antiagregacion'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Ticagrelor 180 mg carga oral',
          reporte: 'Enfermería administra carga de Ticagrelor 180 mg vía oral. Doble antiagregación completada.',
          costo_puntos: 5,
          tiempo_espera_min: 3,
          es_pertinente: true,
          actionId: 'second_antiplatelet'
        },
        {
          id: 'nitroglicerina',
          keywords: ['nitroglicerina', 'nitratos', 'solinitrina', 'nitrato sublingual'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Nitroglicerina sublingual 0.4 mg',
          reporte: 'Enfermería administra Nitroglicerina sublingual. El paciente refiere alivio parcial progresivo de la opresión precordial.',
          costo_puntos: 3,
          tiempo_espera_min: 2,
          es_pertinente: true,
          actionId: 'nitrates_sublingual'
        },
        {
          id: 'morfina',
          keywords: ['morfina', 'cloruro morfico', 'opiaceo', 'fentanilo'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Cloruro Mórfico 3 mg IV lento',
          reporte: 'Enfermería canaliza bolo iv de Morfina 3 mg. Dolor disminuye significativamente y baja tono simpático.',
          costo_puntos: 4,
          tiempo_espera_min: 3,
          es_pertinente: true,
          actionId: 'morphine_analgesia'
        },
        {
          id: 'codigo_infarto',
          keywords: ['codigo infarto', 'angioplastia', 'angioplastia primaria', 'hemodinamica', 'cateterismo', 'revascularizacion'],
          department: 'Cardiología',
          tipo: 'tratamiento',
          titulo: 'Activación de Red Código Infarto (Angioplastia Primaria Urgente)',
          reporte: '¡Alerta de Reperfusión activada! Equipo de Hemodinámica de guardia activado. Traslado prioritario inmediato al laboratorio de cateterismo.',
          costo_puntos: 0,
          tiempo_espera_min: 5,
          es_pertinente: true,
          actionId: 'urgent_reperfusion'
        },
        {
          id: 'ibuprofeno',
          keywords: ['ibuprofeno', 'ketorolaco', 'diclofenaco', 'aines', 'naproxeno'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'AINEs (Ibuprofeno 600 mg)',
          reporte: '¡Alerta de Seguridad Farmacológica! Los AINEs están formalmente contraindicados en el IAMCEST por riesgo de rotura miocárdica y trombosis.',
          costo_puntos: 20,
          tiempo_espera_min: 2,
          es_pertinente: false,
          actionId: 'give_nsaids'
        },
        {
          id: 'tac_craneo',
          keywords: ['tac craneo', 'tac cerebral', 'tac de craneo simple', 'tomografia cerebral', 'tac craneal'],
          department: 'Radiología & Imagen',
          tipo: 'rechazado',
          titulo: 'TAC de Cráneo Simple',
          reporte: 'Solicitud rechazada por el radiólogo de guardia: Paciente con Glasgow 15/15 sin focalidad neurológica ni traumatismo. Estudio no justificado ante dolor torácico coronario agudo.',
          costo_puntos: 25,
          tiempo_espera_min: 40,
          es_pertinente: false
        },
        {
          id: 'rmn_rodilla',
          keywords: ['resonancia de rodilla', 'rmn rodilla', 'resonancia magnetica de rodilla', 'rm rodilla'],
          department: 'Radiología & Imagen',
          tipo: 'rechazado',
          titulo: 'Resonancia Magnética de Rodilla',
          reporte: 'Estudio no disponible en guardia de urgencias / Solicitud rechazada por falta de justificación clínica.',
          costo_puntos: 35,
          tiempo_espera_min: 60,
          es_pertinente: false
        },
        {
          id: 'colonoscopia',
          keywords: ['colonoscopia', 'endoscopia digestiva baja', 'endoscopia'],
          department: 'Enfermería de Urgencias',
          tipo: 'rechazado',
          titulo: 'Colonoscopia de Urgencia',
          reporte: 'Servicio de Endoscopias: Estudio electivo rechazado. Paciente con sospecha de síndrome coronario agudo en curso.',
          costo_puntos: 40,
          tiempo_espera_min: 90,
          es_pertinente: false
        }
      ]
    },
    targetDiagnosis: 'Infarto Agudo de Miocardio con elevación del ST (IAMCEST) de cara anteroseptal',
    expectedActions: [
      {
        id: 'monitor_line',
        name: 'Monitorización continua y Vía Venosa',
        category: 'monitoring',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Monitor multiparamétrico + 2 vías venosas periféricas de calibre 18G',
        rationale: 'Mandatorio de inmediato en sospecha de síndrome coronario agudo para detectar arritmias malignas (TV/FV) y administrar fármacos.',
        vitalImpact: { heartRate: 98 }
      },
      {
        id: 'oxygen_rational',
        name: 'Oxigenoterapia Racional (solo si SatO2 < 90%)',
        category: 'oxygen',
        isCorrect: true,
        isMandatory: false,
        doseDescription: 'Mantener en observación; administrar O2 a 2-4 L/min solo si la SatO2 cae < 90%',
        rationale: 'Las guías ESC/AHA desaconsejan oxígeno sistemático si SatO2 >= 90% (evita hiperoxia que genera vasoconstricción coronaria y estrés oxidativo).',
        vitalImpact: { oxygenSat: 95 }
      },
      {
        id: 'aspirin_loading',
        name: 'Ácido Acetilsalicílico (Aspirina AAS)',
        category: 'antiplatelet',
        isCorrect: true,
        isMandatory: true,
        doseDescription: '150 - 300 mg vo masticada (o 250-500 mg iv)',
        rationale: 'Antiagregante plaquetario de primera línea para inhibir TXA2. Reduce significativamente la mortalidad cardiovascular precoz en el infarto.',
        vitalImpact: { painScore: 7 }
      },
      {
        id: 'second_antiplatelet',
        name: 'Segundo Antiagregante (Ticagrelor / Prasugrel / Clopidogrel)',
        category: 'antiplatelet',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Ticagrelor 180 mg carga (o Clopidogrel 300-600 mg o Prasugrel 60 mg)',
        rationale: 'Doble antiagregación plaquetaria (DAPT) obligatoria en IAMCEST antes o durante la angioplastia primaria.',
        vitalImpact: { painScore: 6 }
      },
      {
        id: 'heparin_anticoag',
        name: 'Anticoagulación parenteral (Heparina no fraccionada / Enoxaparina)',
        category: 'anticoagulation',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'HNF en bolo iv (70-100 UI/kg) o Enoxaparina 30 mg bolo iv + 1 mg/kg sc',
        rationale: 'Inhibe la cascada de coagulación y la propagación del trombo coronario oclusivo.',
        vitalImpact: {}
      },
      {
        id: 'nitrates_sublingual',
        name: 'Nitratos sublinguales o IV (Nitroglicerina)',
        category: 'antiischemic',
        isCorrect: true,
        isMandatory: false,
        doseDescription: 'Nitroglicerina 0.4 mg sl o infusión iv continua (titular según PA)',
        rationale: 'Venodilatador que reduce la precarga miocárdica y el consumo de O2, y dilata las arterias coronarias espásticas.',
        vitalImpact: { bpSystolic: 135, bpDiastolic: 85, painScore: 4 }
      },
      {
        id: 'morphine_analgesia',
        name: 'Opioide IV (Cloruro Mórfico / Fentanilo)',
        category: 'antiischemic',
        isCorrect: true,
        isMandatory: false,
        doseDescription: 'Morfina 2-4 mg iv lentos en caso de dolor torácico opresivo refractario',
        rationale: 'Alivia el dolor intenso y disminuye la activación simpática excesiva y el consumo de oxígeno miocárdico.',
        vitalImpact: { painScore: 3, heartRate: 88, respRate: 18 }
      },
      {
        id: 'urgent_reperfusion',
        name: 'Activación de Código Infarto / Angioplastia Primaria Urgente (ICP)',
        category: 'reperfusion',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Alerta hemodinámica urgente (Tiempo Puerta-Balón < 90 min) o Fibrinolisis si traslado > 120 min',
        rationale: '¡ACCIÓN DEFINITIVA SALVA-VIDAS! Apertura mecánica inmediata de la arteria coronaria culpable (Arteria Descendente Anterior) para rescatar miocardio isquémico.',
        vitalImpact: { bpSystolic: 125, bpDiastolic: 80, heartRate: 78, painScore: 1, respRate: 16, oxygenSat: 96 }
      }
    ],
    contraindicatedActions: [
      {
        id: 'give_nsaids',
        name: 'Administrar AINEs (Ibuprofeno / Diclofenaco / Ketorolaco)',
        harmRationale: 'Contraindicación absoluta: los AINEs aumentan el riesgo de rotura de pared libre miocárdica, trombosis y mortalidad.',
        vitalPenalty: { bpSystolic: 165, heartRate: 115, painScore: 9 }
      },
      {
        id: 'discharge_home',
        name: 'Alta hospitalaria con analgésicos comunes ("dolor osteomuscular")',
        harmRationale: 'Error fatal: abandonar a un paciente en pleno IAMCEST conlleva riesgo crítico de paro por fibrilación ventricular o shock cardiogénico.',
        vitalPenalty: { bpSystolic: 90, bpDiastolic: 55, heartRate: 130, painScore: 10 }
      },
      {
        id: 'hyperoxia_routine',
        name: 'Oxígeno a alto flujo indiscriminado (Mascarilla reservorio 15 L/min)',
        harmRationale: 'Con SatO2 en 94%, la hiperoxia no aporta beneficio demostrado y causa vasoconstricción de microvasculatura coronaria según ensayos AVOID y DETO2X.',
        vitalPenalty: { heartRate: 108 }
      }
    ],
    debriefNotes: {
      clinicalPearl: 'En presencia de dolor torácico opresivo con irradiación típica y diaforesis, el ECG de 12 derivaciones DEBE realizarse e interpretarse en los primeros 10 minutos (Regla de oro de la ESC).',
      guidelineReference: 'Guías ESC 2023 sobre el tratamiento del síndrome coronario agudo / Guías AHA/ACC STEMI.',
      keyPitfalls: [
        'Esperar el resultado de las troponinas para activar el Código Infarto: ¡NUNCA demorar la reperfusión ante un ECG con elevación persistente del ST!',
        'Administrar oxígeno indiscriminadamente cuando la saturación es >= 90%.',
        'Olvidar administrar el segundo antiagregante plaquetario (Ticagrelor o Clopidogrel).',
        'Prescribir AINEs que alteran la cicatrización miocárdica y promueven trombosis.'
      ]
    }
  },
  {
    id: 'caso_resp_001',
    code: 'Módulo Respiratorio · Caso 01',
    patientName: 'Hipócrates',
    clinicalModule: 'respiratorio',
    title: 'Fiebre, Tos Herrumbrosa y Dolor Pleurítico (NAC Lobar Derecha)',
    gender: 'femenino',
    age: 34,
    colorTheme: 'pink',
    chiefComplaint: 'Fiebre de 38.8 °C, tos con expectoración herrumbrosa y dolor pleurítico derecho.',
    history: {
      hypertension: 'No hipertensa.',
      smoking: 'No fumadora ni vapeadora.',
      allergies: 'Sin alergias medicamentosas conocidas ni alimentarias.',
      medications: 'Paracetamol 500 mg ocasional hace 48 horas sin mejoría franca.',
      pastSurgeries: 'Sin cirugías previas.',
      familyHistory: 'Sin antecedentes familiares de patología respiratoria.',
      otherAntecedents: 'Sin patología respiratoria crónica previa (no asma ni bronquiectasias). Cuadro catarral de vía aérea superior hace 5 días que empeoró abruptamente con escalofríos y fiebre.'
    },
    currentSymptoms: {
      painLocation: 'Hemitórax derecho a nivel de base e infraescapular.',
      painQuality: 'Dolor punzante tipo puntada de costado que se intensifica claramente con la inspiración profunda y los accesos de tos.',
      painIrradiation: 'Sin irradiación clara hacia cuello ni abdomen.',
      painIntensity: 7,
      associatedSymptoms: [
        'Fiebre alta cuantificada en 38.8 °C con escalofríos intensos y tiritona',
        'Tos productiva con expectoración herrumbrosa (color asalmonado/ladrillo)',
        'Disnea de esfuerzo moderado',
        'Cefalea holocraneana y astenia marcada'
      ],
      onset: 'Inicio abrupto hace 48 horas con pico febril de 39 °C, escalofríos y dolor pleurítico derecho.',
      dyspneaLevel: 'moderate'
    },
    initialVitals: {
      bpSystolic: 115,
      bpDiastolic: 70,
      heartRate: 104,
      respRate: 26,
      oxygenSat: 91,
      temperature: 38.8,
      painScore: 7
    },
    physicalExam: {
      general: '*Paciente lúcida, orientada, febril (38.8 °C), sudorosa, taquipneica a 26 rpm con respiración superficial antiálgica para evitar la expansión torácica derecha.*',
      cardiac: '*Taquicardia sinusal rítmica a 104 lpm sin soplos patológicos ni galope R3/R4.*',
      pulmonary: '*Inspección: Disminución de la excursión respiratoria en base derecha. Palpación: Aumento marcado de las vibraciones vocales (frémito táctil) en base pulmonar derecha. Percusión: Matidez franca en tercio inferior de hemitórax derecho. Auscultación: Murmullo vesicular abolido en base derecha, sustituido por soplo tubárico (respiración bronquial soplante), broncofonía y estertores crepitantes inspiratorios finos.*',
      skin: '*Piel caliente, enrojecida y diaforética. Sin exantemas ni cianosis periférica.*',
      abdomen: '*Blando, depresible, no doloroso a la palpación, ruidos hidroaéreos normales.*',
      extremities: '*Sin edemas distales ni signos de trombosis venosa profunda.*',
      neckVessels: '*Yugulares colapsadas, sin adenopatías cervicales palpables.*',
      neurological: '*Glasgow 15/15. Lúcida y orientada.*'
    },
    complementaryStudies: {
      ecg: {
        rhythm: 'Taquicardia sinusal a 104 lpm',
        summary: 'Taquicardia sinusal por fiebre e hipoxemia sin alteraciones isquémicas',
        stElevationLeads: [],
        stElevationMm: 0,
        detailedDescription: 'Taquicardia sinusal a 104 lpm, PR 0.14s, QRS estrecho, eje +60°, sin alteraciones de la repolarización.'
      },
      troponins: '*Troponina I ultrasensible: 3 ng/L (Normal). Sin necrosis miocárdica.*',
      cpkCkmb: '*CPK Total: 52 U/L | CK-MB: 1.2 ng/mL (Normales).*',
      hemogram: '*Hemograma de urgencias: Leucocitos 16,800 /mm³ con 84% neutrófilos y 8% abastonados (leucocitosis con desviación izquierda franca). Hemoglobina 13.4 g/dL, Hematocrito 40.5%, Plaquetas 275,000 /mm³.*',
      biochemistry: '*Bioquímica: Glucosa 108 mg/dL, Urea 28 mg/dL, Creatinina 0.8 mg/dL, Proteína C Reactiva (PCR) 185 mg/L (marcadamente elevada), Procalcitonina 2.4 ng/mL (infección bacteriana activa).*',
      coagulation: '*Coagulación: TP 92%, INR 1.05, KPTT 29 seg.*',
      chestXray: '*Radiografía de tórax PA y lateral: Consolidación alveolar lobar homogénea bien delimitada en lóbulo inferior derecho (LID) con presencia de broncograma aéreo evidente. Senos costofrénicos libres, sin derrame pleural significativo.*',
      radiologyImage: {
        type: 'xray',
        title: 'Radiografía de Tórax PA - Consolidación Lobar Derecha',
        report: 'Opacidad alveolar homogénea en base pulmonar derecha compatible con neumonía lobar neumocócica (LID) con broncograma aéreo.',
        findingsHighlight: 'Infiltrado neumónico lobar derecho típico de Streptococcus pneumoniae. Ausencia de derrame metaneumónico o cavitación.',
        technicalData: 'Telerradiografía de tórax posteroanterior en bipedestación.'
      },
      arterialBloodGas: '*Gasometría arterial (FiO2 21%): pH 7.46, PaO2 62 mmHg (Insuficiencia respiratoria aguda tipo I), PaCO2 31 mmHg (hiperventilación alveolar), HCO3 22 mEq/L, SatO2 91%.*',
      otherDefault: '*Cultivo de esputo y Gram: Diplococos Gram positivos lanceolados encapsulados en parejas compatibles con Streptococcus pneumoniae (Neumococo). Hemocultivos x2 pendientes de incubación.*'
    },
    ordenes_disponibles: {
      estudios: [
        {
          id: 'rx_torax_pneumo',
          keywords: ['rx torax', 'radiografia de torax', 'placa de torax', 'rx de torax', 'radiografia'],
          department: 'Radiología & Imagen',
          tipo: 'imagen',
          titulo: 'Radiografía de Tórax PA y Lateral',
          reporte: 'Consolidación alveolar lobar en lóbulo inferior derecho (LID) con broncograma aéreo franco. Senos costofrénicos libres.',
          costo_puntos: 10,
          tiempo_espera_min: 15,
          es_pertinente: true,
          imageType: 'xray'
        },
        {
          id: 'hemograma_resp',
          keywords: ['hemograma', 'leucocitos', 'pcr', 'procalcitonina', 'formula leucocitaria', 'analitica'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Hemograma Completo y Reactantes de Fase Aguda',
          reporte: 'Leucocitosis 16,800/mm³ con neutrofilia del 84% y desviación a la izquierda. PCR 185 mg/L y Procalcitonina 2.4 ng/mL.',
          valores: {
            'Leucocitos': '16,800 /mm³ (Ref: 4,000-10,000) [LEUCOCITOSIS SEVERA]',
            'Neutrófilos': '84% (Desviación izquierda con cayados 8%)',
            'Proteína C Reactiva': '185 mg/L (Ref: < 5 mg/L) [INFLAMACIÓN AGUDA]',
            'Procalcitonina': '2.4 ng/mL (Infección bacteriana invasiva)',
            'Hemoglobina': '13.4 g/dL',
            'Plaquetas': '275,000 /mm³'
          },
          costo_puntos: 8,
          tiempo_espera_min: 20,
          es_pertinente: true
        },
        {
          id: 'gasometria_resp',
          keywords: ['gasometria', 'gases arteriales', 'gasometria arterial', 'pao2', 'saturacion'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Gasometría Arterial Basal (FiO2 21%)',
          reporte: 'PaO2 62 mmHg, PaCO2 31 mmHg, SatO2 91%. Insuficiencia respiratoria aguda hipoxémica con alcalosis respiratoria compensadora.',
          valores: {
            'PaO2': '62 mmHg (Ref: 80-100 mmHg) [HIPOXEMIA AGUDA]',
            'PaCO2': '31 mmHg (Ref: 35-45 mmHg) [HIPOCAPNIA POR TAQUIPNEA]',
            'pH arterial': '7.46',
            'Bicarbonato': '22 mEq/L',
            'SatO2': '91%'
          },
          costo_puntos: 10,
          tiempo_espera_min: 10,
          es_pertinente: true
        },
        {
          id: 'oxigenoterapia_resp',
          keywords: ['oxigeno', 'gafas nasales', 'canula nasal', 'o2', 'oxigenoterapia'],
          department: 'Enfermería de Urgencias',
          tipo: 'tratamiento',
          titulo: 'Oxigenoterapia por Cánula Nasal a 2 L/min',
          reporte: 'Se colocan gafas nasales a 2 L/min. La saturación de oxígeno sube rápidamente a 96% y la taquipnea desciende a 20 rpm.',
          costo_puntos: 0,
          tiempo_espera_min: 1,
          es_pertinente: true,
          actionId: 'oxygen_therapy'
        },
        {
          id: 'antibiotico_resp',
          keywords: ['antibiotico', 'ceftriaxona', 'azitromicina', 'amoxicilina', 'levofloxacino', 'antibioticoterapia'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Antibioticoterapia Empírica IV (Ceftriaxona 2g + Azitromicina 500mg IV)',
          reporte: 'Se administra primera dosis de antibiótico intravenoso cubriendo Streptococcus pneumoniae y atípicos. Disminuye la curva térmica.',
          costo_puntos: 5,
          tiempo_espera_min: 5,
          es_pertinente: true,
          actionId: 'antibiotic_therapy'
        },
        {
          id: 'antipiretico_resp',
          keywords: ['paracetamol', 'antitemico', 'bajar fiebre', 'antipiretico', 'dipirona'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Antipirético / Analgésico (Paracetamol 1g IV)',
          reporte: 'Se infunde Paracetamol 1g IV. La temperatura baja a 37.1 °C y el dolor pleurítico se reduce a 2/10.',
          costo_puntos: 2,
          tiempo_espera_min: 2,
          es_pertinente: true,
          actionId: 'antipyretic_therapy'
        },
        {
          id: 'alta_error_resp',
          keywords: ['alta medica', 'dar de alta', 'tratamiento ambulatorio sin observar', 'enviar a casa'],
          department: 'Enfermería de Urgencias',
          tipo: 'rechazado',
          titulo: 'Alta Inmediata a Domicilio sin Estabilización',
          reporte: '¡Error Clínico Grave! Paciente con hipoxemia aguda (SatO2 91%), taquipnea (26 rpm) y dolor pleurítico. Requiere estabilización y observación.',
          costo_puntos: 35,
          tiempo_espera_min: 5,
          es_pertinente: false,
          actionId: 'premature_discharge_pneumonia'
        }
      ]
    },
    targetDiagnosis: 'Neumonía adquirida en la comunidad (NAC) lobar derecha por Streptococcus pneumoniae',
    expectedActions: [
      {
        id: 'oxygen_therapy',
        name: 'Oxigenoterapia suplementaria por cánula nasal (objetivo SatO2 > 92-94%)',
        category: 'oxygen',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Gafas nasales a 2-3 L/min',
        rationale: 'Corrige la hipoxemia aguda y el trabajo respiratorio secundario al shunt pulmonar intralobar.',
        vitalImpact: { oxygenSat: 96, respRate: 20 }
      },
      {
        id: 'antibiotic_therapy',
        name: 'Antibioticoterapia intravenosa empírica precoz (< 4h) para NAC',
        category: 'monitoring',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Ceftriaxona 2g IV/día + Azitromicina 500mg IV/día',
        rationale: 'Cobertura eficaz frente a Streptococcus pneumoniae y microorganismos atípicos en las primeras horas.',
        vitalImpact: { temperature: 37.4, heartRate: 88 }
      },
      {
        id: 'antipyretic_therapy',
        name: 'Administración de Paracetamol 1g IV para control de fiebre y dolor pleurítico',
        category: 'antiischemic',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Paracetamol 1g IV en infusión corta de 15 minutos',
        rationale: 'Alivia el dolor pleurítico facilitando una ventilación adecuada y desciende la fiebre.',
        vitalImpact: { painScore: 2, temperature: 37.1 }
      }
    ],
    contraindicatedActions: [
      {
        id: 'premature_discharge_pneumonia',
        name: 'Alta médica inmediata a domicilio sin oxigenoterapia ni estabilización',
        harmRationale: 'Grave riesgo de insuficiencia respiratoria aguda refractaria y sepsis bacteriana en domicilio.',
        vitalPenalty: { oxygenSat: 84, respRate: 34, heartRate: 125 }
      }
    ],
    debriefNotes: {
      clinicalPearl: 'La tríada clásica de fiebre súbita, tos con expectoración herrumbrosa y dolor pleurítico punzante orienta inequívocamente a Neumonía Adquirida en la Comunidad (NAC) lobar neumocócica. La presencia de taquipnea (FR >= 26) e hipoxemia obliga a iniciar oxigenoterapia y antibioticoterapia bactericida en las primeras 4 horas.',
      guidelineReference: 'Guías ATS/IDSA sobre el Diagnóstico y Tratamiento de la Neumonía Adquirida en la Comunidad (NAC).',
      keyPitfalls: [
        'Retrasar la primera dosis de antibiótico a la espera de resultados de cultivos.',
        'No evaluar la saturación de oxígeno por pulsioximetría en reposo y al esfuerzo.',
        'Omitir la búsqueda de estertores crepitantes y soplo tubárico en el examen físico respiratorio.'
      ]
    }
  },
  {
    id: 'caso_neu_001',
    code: 'Módulo Neuro · Caso 01',
    patientName: 'Hipócrates',
    clinicalModule: 'neuro',
    title: 'Déficit Motor Súbito en Hemicuerpo Derecho y Afasia (ACV Isquémico Agudo)',
    gender: 'femenino',
    age: 67,
    colorTheme: 'pink',
    chiefComplaint: 'Deficit motor súbito en hemicuerpo derecho y afasia de expresión de 1 hora de evolución.',
    history: {
      hypertension: 'Hipertensión arterial de 10 años de evolución, tratada con Olmesartán 20 mg/día.',
      smoking: 'No fumadora.',
      allergies: 'Sin alergias medicamentosas conocidas.',
      medications: 'Olmesartán 20 mg/día y Atorvastatina 20 mg/día. Fibrilación auricular paroxística diagnosticada recientemente sin tratamiento anticoagulante aún instaurado.',
      pastSurgeries: 'Colecistectomía hace 12 años.',
      familyHistory: 'Hermana fallecida por cardiopatía isquémica.',
      otherAntecedents: 'Fibrilación auricular no valvular paroxística no anticoagulada (CHA2DS2-VASc = 4). Dislipidemia.'
    },
    currentSymptoms: {
      painLocation: 'Sin dolor de cabeza ni dolor cervical (déficit neurológico focal indoloro).',
      painQuality: 'Sin dolor. Pérdida súbita completa de fuerza muscular en brazo y pierna derechos junto a imposibilidad para comunicarse.',
      painIrradiation: 'Sin dolor.',
      painIntensity: 1,
      associatedSymptoms: [
        'Pérdida de fuerza completa en brazo y pierna derechos (hemiplejía derecha braquiocrural)',
        'Desviación de comisura labial hacia la izquierda (parálisis facial central derecha)',
        'Incapacidad para hablar o articular palabras comprensibles (afasia motora de Broca)',
        'Comprensión parcial de órdenes sencillas conservada'
      ],
      onset: 'Inicio hiperagudo hace 60 minutos mientras desayunaba; tiempo de última hora asintomática normal: 1 hora exacta (Ventana terapéutica abierta < 4.5h).',
      dyspneaLevel: 'none'
    },
    initialVitals: {
      bpSystolic: 178,
      bpDiastolic: 96,
      heartRate: 86,
      respRate: 16,
      oxygenSat: 96,
      temperature: 36.6,
      painScore: 1
    },
    physicalExam: {
      general: '*Paciente lúcida, consciente, con mirada reactiva y angustiada ante la imposibilidad de hablar o mover el hemicuerpo derecho. Vía aérea permeable.*',
      cardiac: '*Ruidos cardíacos arrítmicos compatibles con Fibrilación Auricular a 86 lpm. Sin soplos cardíacos.*',
      pulmonary: '*Murmullo vesicular conservado bilateralmente sin ruidos sobreañadidos. Eupneica a 16 rpm.*',
      skin: '*Piel y mucosas normocoloreadas y normohidratadas.*',
      abdomen: '*Abdomen blando, no doloroso a la palpación.*',
      extremities: '*Hemicuerpo derecho con plejia flácida: fuerza muscular en extremidad superior derecha 0/5 y extremidad inferior derecha 0/5. Extremidades izquierdas con fuerza 5/5 conservada.*',
      neckVessels: '*Sin soplos carotídeos auscultables.*',
      neurological: '*Evaluación con Escala NIHSS = 14 puntos (Ictus isquémico moderado-severo). Pares craneales: Parálisis facial central derecha (respeta la musculatura de la frente). Desviación conjugada de la mirada hacia la izquierda. Motor: Hemiplejía derecha braquiocrural 0/5 con hipotonía y signo de Babinski derecho positivo. Sensibilidad: Hipoestesia en hemicuerpo derecho. Lenguaje: Afasia no fluente de Broca con emisión limitada a sílabas incomprensibles pero comprensión parcial conservada. Disartria severa.*'
    },
    complementaryStudies: {
      ecg: {
        rhythm: 'Fibrilación Auricular a 86 lpm',
        summary: 'Fibrilación auricular con respuesta ventricular media sin alteraciones isquémicas',
        stElevationLeads: [],
        stElevationMm: 0,
        detailedDescription: 'Ritmo de fibrilación auricular (ausencia de ondas P, intervalos R-R irregulares) a 86 lpm. QRS estrecho, eje normal, sin supradesnivel del ST.'
      },
      troponins: '*Troponina I ultrasensible: 6 ng/L (Normal).*',
      cpkCkmb: '*CPK Total: 58 U/L | CK-MB: 1.4 ng/mL (Normales).*',
      hemogram: '*Hemograma de urgencia: Leucocitos 7,200/uL, Hemoglobina 13.8 g/dL, Plaquetas 215,000/uL.*',
      biochemistry: '*Bioquímica urgente: Glucemia capilar 114 mg/dL (fundamental: DESCARTA hipoglucemia como simulador de ictus), Urea 34 mg/dL, Creatinina 0.9 mg/dL, Sodio 140 mEq/L, Potasio 4.0 mEq/L.*',
      coagulation: '*Coagulación urgente: TP 90% (INR 1.08), TTPA 28 seg, Fibrinógeno 320 mg/dL (Descarta coagulopatía o contraindicación hemostática).*',
      chestXray: '*Radiografía de tórax: Silueta cardiaca dentro de límites normales, campos pleuropulmonares limpios.*',
      radiologyImage: {
        type: 'angiotac',
        title: 'TAC Craneal Simple y Angio-TC Cerebral de Troncos y Polígono de Willis',
        report: 'TAC craneal basal sin contraste: Ausencia de signos de hemorragia intracraneal aguda (descarta hematoma intraparenquimatoso). Discreto borramiento insular izquierdo con signo de la arteria cerebral media hiperdensa. ASPECTS score 9. Angio-TC confirma oclusión completa del segmento M1 de arteria cerebral media izquierda.',
        findingsHighlight: 'ACV isquémico agudo con oclusión de gran vaso (M1 izquierda) dentro de ventana de revascularización (< 4.5h para rtPA IV y < 6h para trombectomía mecánica). Criterios óptimos para Código Ictus.',
        technicalData: 'TC helicoidal multidetector sin contraste seguida de angio-TC cerebral de troncos supraaórticos y polígono de Willis.'
      },
      arterialBloodGas: '*Gasometría venosa: pH 7.40, pCO2 39 mmHg, HCO3 24 mEq/L, Lactato 1.1 mmol/L.*',
      otherDefault: '*Protocolo Código Ictus / Stroke: Paciente en ventana terapéutica (tiempo de inicio 60 minutos, NIHSS 14, ASPECTS 9, sin hemorragia en TC, glucemia normal y coagulación normal). Indicación clase IA de trombolisis intravenosa con Alteplasa (rtPA 0.9 mg/kg) + trombectomía mecánica urgente de M1.*'
    },
    ordenes_disponibles: {
      estudios: [
        {
          id: 'tac_craneo_stroke',
          keywords: ['tac craneo', 'tomografia', 'tac cerebral', 'tc sin contraste', 'angiotac', 'escaner'],
          department: 'Radiología & Imagen',
          tipo: 'imagen',
          titulo: 'TAC Craneal Simple sin Contraste + Angio-TC Cerebral',
          reporte: 'Sin hemorragia intracraneal aguda. Signo de ACM hiperdensa izquierda. Angio-TC confirma oclusión de segmento M1 izquierdo. ASPECTS 9.',
          costo_puntos: 20,
          tiempo_espera_min: 15,
          es_pertinente: true,
          imageType: 'angiotac'
        },
        {
          id: 'glucemia_urgente',
          keywords: ['glucemia', 'glucosa', 'hemoglucotest', 'hgt', 'azucar'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Glucemia Capilar Urgente (Descarte de Stroke Mimic)',
          reporte: 'Glucemia capilar: 114 mg/dL. Se descarta hipoglucemia aguda como causa del déficit focal.',
          valores: {
            'Glucemia capilar': '114 mg/dL (Ref: 70-140 mg/dL)',
            'Diagnóstico': 'Hipoglucemia descartada'
          },
          costo_puntos: 0,
          tiempo_espera_min: 1,
          es_pertinente: true
        },
        {
          id: 'rtpa_trombolisis',
          keywords: ['rtpa', 'alteplasa', 'trombolisis', 'actilyse', 'fibrinolisis', 'trombolitico'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Trombolisis Intravenosa con Alteplasa (rtPA 0.9 mg/kg)',
          reporte: 'Se administra rtPA 0.9 mg/kg (10% en bolo inicial de 1 minuto y 90% en perfusión continua de 1 hora) dentro de la ventana de 4.5h.',
          costo_puntos: 15,
          tiempo_espera_min: 5,
          es_pertinente: true,
          actionId: 'rtpa_thrombolysis'
        },
        {
          id: 'trombectomia_mecanica',
          keywords: ['trombectomia', 'trombectomia mecanica', 'neurointervencionismo', 'cateterismo cerebral', 'stent retriever'],
          department: 'Enfermería de Urgencias',
          tipo: 'tratamiento',
          titulo: 'Trombectomía Mecánica Endovascular Urgente (M1 ACM)',
          reporte: 'Neurorradiología intervencionista realiza cateterismo y extracción mecánica del trombo con stent retriever. Recanalización TICI 3 completa.',
          costo_puntos: 25,
          tiempo_espera_min: 30,
          es_pertinente: true,
          actionId: 'mechanical_thrombectomy'
        },
        {
          id: 'codigo_ictus_activacion',
          keywords: ['codigo ictus', 'codigo stroke', 'activar codigo ictus', 'prioridad ictus'],
          department: 'Enfermería de Urgencias',
          tipo: 'tratamiento',
          titulo: 'Activación Inmediata de Código Ictus Hospitalario',
          reporte: 'Se activa alarma de Código Ictus. Neurólogo de guardia y sala de TAC despejada para atención sin demoras.',
          costo_puntos: 0,
          tiempo_espera_min: 1,
          es_pertinente: true,
          actionId: 'activate_stroke_code'
        },
        {
          id: 'bajar_pa_brusco_error',
          keywords: ['bajar presion', 'nitroprusiato', 'labetalol altas dosis', 'descenso brusco pa', 'hipotensionar'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Descenso Farmacológico Agresivo de la PA a < 130 mmHg',
          reporte: '¡Alerta de Seguridad Neurológica! Descenso brusco contraindicado: colapsa la presión de perfusión cerebral en la penumbra isquémica.',
          costo_puntos: 35,
          tiempo_espera_min: 5,
          es_pertinente: false,
          actionId: 'precipitous_bp_drop'
        },
        {
          id: 'dar_heparina_error',
          keywords: ['heparina bolo', 'anticoagular de inmediato', 'heparina no fraccionada', 'heparina sodica'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Bolo de Heparina No Fraccionada en Fase Aguda',
          reporte: '¡Error Grave de Seguridad! Contraindicado en las primeras 24 horas del ictus isquémico por alto riesgo de transformación hemorrágica masiva.',
          costo_puntos: 40,
          tiempo_espera_min: 2,
          es_pertinente: false,
          actionId: 'heparin_bolus_stroke'
        }
      ]
    },
    targetDiagnosis: 'Accidente Cerebrovascular (ACV) isquémico agudo en territorio de arteria cerebral media izquierda',
    expectedActions: [
      {
        id: 'activate_stroke_code',
        name: 'Activación inmediata de Código Ictus / Stroke urgente',
        category: 'monitoring',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Priorización máxima para acceso a TAC y neurorradiología',
        rationale: 'Reduce los tiempos puerta-aguja y puerta-ingle salvando parénquima cerebral en penumbra.',
        vitalImpact: {}
      },
      {
        id: 'rtpa_thrombolysis',
        name: 'Trombolisis intravenosa con rtPA (Alteplasa 0.9 mg/kg) en ventana < 4.5h',
        category: 'reperfusion',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Bolo del 10% en 1 min y el 90% restante en perfusión continua de 60 min',
        rationale: 'Fibrinolítico de primera línea para lisis del trombo y recanalización arterial temprana.',
        vitalImpact: {}
      },
      {
        id: 'mechanical_thrombectomy',
        name: 'Trombectomía mecánica endovascular urgente por oclusión de gran vaso (M1)',
        category: 'reperfusion',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Acceso femoral o radial con stent-retriever o tromboaspiración en ventana < 6h',
        rationale: 'Terapia combinada estándar con máxima evidencia para oclusión de arteria cerebral media proximal.',
        vitalImpact: {}
      }
    ],
    contraindicatedActions: [
      {
        id: 'heparin_bolus_stroke',
        name: 'Anticoagulación con heparina en bolo en fase hiperaguda (< 24h)',
        harmRationale: 'Riesgo inaceptable de transformación hemorrágica fatal en el tejido cerebral infartado.',
        vitalPenalty: { bpSystolic: 210, heartRate: 110 }
      },
      {
        id: 'precipitous_bp_drop',
        name: 'Descenso farmacológico brusco y agresivo de la presión arterial',
        harmRationale: 'Reduce críticamente la presión de perfusión en la penumbra isquémica extendiendo el infarto.',
        vitalPenalty: { bpSystolic: 100, bpDiastolic: 60, heartRate: 115 }
      }
    ],
    debriefNotes: {
      clinicalPearl: 'El tiempo es cerebro (Time is Brain): cada minuto de oclusión de gran vaso se pierden casi 2 millones de neuronas. En ventana menor a 4.5 horas sin hemorragia en el TAC y con glucemia normal, la trombolisis IV combinada con trombectomía mecánica precoz para oclusiones de M1 restaura el flujo y previene secuelas devastadoras.',
      guidelineReference: 'Guías de la American Heart Association / American Stroke Association (AHA/ASA) para el Manejo del Ictus Isquémico Agudo.',
      keyPitfalls: [
        'Omitir la determinación inmediata de glucemia capilar (la hipoglucemia es el imitador clásico del ictus).',
        'Bajar precipitadamente la presión arterial en las primeras 24 horas salvo cifras > 185/110 antes de trombolisis.',
        'Administrar antiagregantes plaquetarios o heparina antes de transcurridas 24 horas del rtPA.'
      ]
    }
  },
  {
    id: 'caso-03',
    code: 'Caso 03',
    title: 'Dolor Abdominal, Respiración Ácida y Deshidratación (CAD)',
    gender: 'femenino',
    age: 24,
    colorTheme: 'pink',
    chiefComplaint: 'Dolor abdominal difuso, náuseas, vómitos incoercibles y marcada astenia de 24 horas de evolución.',
    history: {
      hypertension: 'No hipertensa.',
      smoking: 'No fumadora.',
      allergies: 'No alergias.',
      medications: 'Insulina Glargina 22 UI/día y Lispro prandial. Refiere haber suspendido la insulina hace 48 horas porque no toleraba alimentos.',
      pastSurgeries: 'Ninguna.',
      familyHistory: 'Sin antecedentes de relevancia.',
      otherAntecedents: 'Diabetes Mellitus Tipo 1 diagnosticada a los 16 años.'
    },
    currentSymptoms: {
      painLocation: 'Abdominal difuso, epigástrico y periumbilical.',
      painQuality: 'Continuo, cólico sordo y opresivo ("pesadez dolorosa").',
      painIrradiation: 'Sin irradiación.',
      painIntensity: 6,
      associatedSymptoms: ['Poliuria y polidipsia intensa previa', 'Aliento con olor a fruta madura / manzanas ácidas (cetonemia)', 'Respiración rápida y profunda'],
      onset: 'Progresivo en las últimas 24 horas.',
      dyspneaLevel: 'moderate'
    },
    initialVitals: {
      bpSystolic: 95,
      bpDiastolic: 60,
      heartRate: 122,
      respRate: 30,
      oxygenSat: 97,
      temperature: 36.8,
      painScore: 6
    },
    physicalExam: {
      general: '*Paciente obnubilada, taquipneica con respiración de Kussmaul (hiperventilación profunda), mucosa oral intensamente seca y lengua saburral.*',
      cardiac: '*Taquicardia rítmica sin soplos a 122 lpm.*',
      pulmonary: '*Buena entrada de aire bilateral, hiperventilación profunda de Kussmaul sin estertores.*',
      skin: '*Piel seca, turgencia disminuida (signo del pliegue positivo).*',
      abdomen: '*Abdomen doloroso a la palpación difusa sin signos de irritación peritoneal (pseudoabdomen agudo por acidosis).*',
      extremities: '*Extremidades frías, pulsos radiales débiles y filiformes.*',
      neckVessels: '*Yugulares colapsadas.*',
      neurological: '*Somnolienta pero responde a estímulos verbales. Glasgow 14/15.*'
    },
    complementaryStudies: {
      ecg: {
        rhythm: 'Taquicardia sinusal a 122 lpm',
        summary: 'Ondas T picudas compatibles con hiperpotasemia relativa por acidosis',
        stElevationLeads: [],
        stElevationMm: 0,
        detailedDescription: 'Taquicardia sinusal regular a 122 lpm, ondas T simétricas y altas en precordiales secundarias a redistribución de potasio por acidosis metabólica severa.'
      },
      troponins: '*Troponinas: Negativas / Normales.*',
      cpkCkmb: '*Normales.*',
      hemogram: '*Leucocitosis reactiva 16,500/uL con desviación izquierda por estrés hiperosmolar y deshidratación.*',
      biochemistry: '*Glucemia: 485 mg/dL. Urea: 64 mg/dL. Creatinina: 1.6 mg/dL (Fracaso renal agudo prerrenal). Sodio: 128 mEq/L (Sodio corregido: 134 mEq/L). Potasio: 5.4 mEq/L. Cetonemia capilar: 5.8 mmol/L.*',
      coagulation: '*Normal.*',
      chestXray: '*Sin alteraciones pleuropulmonares.*',
      radiologyImage: {
        type: 'xray',
        title: 'Radiografía de Tórax y Abdomen Simple',
        report: 'Campos pulmonares libres de consolidaciones, infiltrados o condensaciones neumónicas. Diafragma íntegro. Abdomen sin niveles hidroaéreos patológicos ni neumoperitoneo subdiafragmático libre (descarta perforación de víscera hueca en paciente con dolor abdominal agudo).',
        findingsHighlight: 'Estudio radiológico normal: apoya que el dolor abdominal es secundario a gastroparesia y acidosis metabólica diabética (pseudoabdomen agudo) y no quirúrgico.',
        technicalData: 'Estudios portátiles AP tórax y decúbito abdominal.'
      },
      arterialBloodGas: '*Gasometría arterial: Acidosis metabólica grave con anión gap elevado. pH: 7.14, pO2: 98 mmHg, pCO2: 18 mmHg, HCO3: 6.2 mEq/L, Anion Gap: 24 mEq/L.*',
      otherDefault: '*Sedimento urinario: Glucosuria ++++, Cetonuria ++++, Nitritos negativos.*'
    },
    ordenes_disponibles: {
      estudios: [
        {
          id: 'gasometria',
          keywords: ['gasometria', 'gasometria arterial', 'gases arteriales', 'ph', 'bicarbonato', 'lactato'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Gasometría Arterial',
          reporte: 'Acidosis metabólica grave con anión gap marcadamente elevado.',
          valores: {
            'pH': '7.14 [ACIDOSIS GRAVE]',
            'pO2': '98 mmHg',
            'pCO2': '18 mmHg (Hiperventilación)',
            'HCO3 (Bicarbonato)': '6.2 mEq/L [CRÍTICO]',
            'Anion Gap': '24 mEq/L [ELEVADO]'
          },
          costo_puntos: 10,
          tiempo_espera_min: 15,
          es_pertinente: true
        },
        {
          id: 'glucemia_ionograma',
          keywords: ['glucemia', 'glucosa', 'potasio', 'sodio', 'ionograma', 'cetonemia', 'cetonas'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Glucemia Sérica, Cetonemia e Iones',
          reporte: 'Crisis hiperglucémica descompensada con cetonemia positiva.',
          valores: {
            'Glucemia': '485 mg/dL [MUY ELEVADA]',
            'Cetonemia capilar': '5.8 mmol/L [POSITIVA ++++]',
            'Potasio (K)': '5.4 mEq/L',
            'Sodio (Na)': '128 mEq/L',
            'Creatinina': '1.6 mg/dL (F. Renal prerrenal)'
          },
          costo_puntos: 10,
          tiempo_espera_min: 20,
          es_pertinente: true
        },
        {
          id: 'sedimento_orina',
          keywords: ['sedimento de orina', 'orina', 'cetonuria', 'glucosuria'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Sedimento y Tira de Orina',
          reporte: 'Glucosuria ++++, Cetonuria ++++, Nitritos negativos.',
          valores: {
            'Cetonuria': '++++',
            'Glucosuria': '++++'
          },
          costo_puntos: 5,
          tiempo_espera_min: 15,
          es_pertinente: true
        },
        {
          id: 'ecg',
          keywords: ['ecg', 'electrocardiograma'],
          department: 'Cardiología',
          tipo: 'imagen',
          titulo: 'ECG 12 derivaciones',
          reporte: 'Taquicardia sinusal a 122 lpm, ondas T simétricas y altas por acidosis e hiperpotasemia relativa.',
          costo_puntos: 5,
          tiempo_espera_min: 1,
          es_pertinente: true,
          imageType: 'ecg'
        },
        {
          id: 'rx_abdomen',
          keywords: ['rx abdomen', 'radiografia simple de abdomen'],
          department: 'Radiología & Imagen',
          tipo: 'imagen',
          titulo: 'Radiografía de Abdomen Simple',
          reporte: 'Sin niveles hidroaéreos patológicos ni neumoperitoneo subdiafragmático.',
          costo_puntos: 10,
          tiempo_espera_min: 15,
          es_pertinente: true,
          imageType: 'xray'
        }
      ]
    },
    targetDiagnosis: 'Cetoacidosis Diabética (CAD) severa en paciente con DM1 por omisión de insulina',
    expectedActions: [
      {
        id: 'fluid_resuscitation',
        name: 'Fluidoterapia intensiva con Suero Fisiológico 0.9%',
        category: 'fluid',
        isCorrect: true,
        isMandatory: true,
        doseDescription: '1000 - 1500 ml de NaCl 0.9% en la primera hora, luego titular según balance',
        rationale: 'Reexpansión intravascular prioritaria para corregir el déficit volumétrico de 5-6 litros.',
        vitalImpact: { bpSystolic: 110, bpDiastolic: 70, heartRate: 104 }
      },
      {
        id: 'insulin_perfusion',
        name: 'Insulinoterapia intravenosa regular en infusión continua',
        category: 'antiischemic',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Bolo opcional 0.1 UI/kg seguido de perfusión a 0.1 UI/kg/h',
        rationale: 'Frena la lipólisis, la cetogénesis y la gluconeogénesis hepática.',
        vitalImpact: { painScore: 3, respRate: 22 }
      }
    ],
    contraindicatedActions: [
      {
        id: 'insulin_without_k',
        name: 'Administrar insulina rápida en bolos sin monitorizar ni reponer Potasio',
        harmRationale: 'Peligro mortal: la insulina introduce potasio a las células y puede provocar hipopotasemia severa y arritmias ventriculares mortales.',
        vitalPenalty: { heartRate: 145, bpSystolic: 80 }
      }
    ],
    debriefNotes: {
      clinicalPearl: 'En todo paciente con DM1 que suspende insulina o presenta vómitos y dolor abdominal, sospechar Cetoacidosis Diabética antes de pensar en una patología quirúrgica ("pseudoabdomen agudo diabético").',
      guidelineReference: 'Consenso ADA/EASD sobre Crisis Hiperglucémicas en Adultos con Diabetes.',
      keyPitfalls: [
        'Nunca iniciar insulina si el potasio sérico inicial es < 3.3 mEq/L (reponer potasio primero).',
        'Suspender la fluidoterapia demasiado pronto.',
        'Suspender la perfusión de insulina cuando la glucosa llega a 200-250 mg/dL en lugar de añadir suero glucosado al 5% para terminar de cerrar el anión gap.'
      ]
    }
  },
  {
    id: 'caso_004',
    code: 'Caso 004',
    patientName: 'Hipócrates',
    title: 'Hemorragia Digestiva Alta por Úlcera Duodenal por AINEs',
    gender: 'masculino',
    age: 68,
    colorTheme: 'blue',
    chiefComplaint: 'Astenia, mareos al pararse y deposiciones negras y fétidas desde hace 24 horas.',
    history: {
      hypertension: 'Hipertensión arterial diagnosticada hace años en tratamiento médico irregular con Enalapril 10 mg/día.',
      smoking: 'Exfumador ocasional sin consumo tabáquico activo relevante.',
      allergies: 'Sin alergias medicamentosas conocidas ni antecedentes alérgicos.',
      medications: 'Toma Naproxeno 500 mg diario desde hace meses por dolores osteoarticulares severos en las rodillas. Enalapril 10 mg/día.',
      pastSurgeries: 'Sin antecedentes quirúrgicos abdominales mayores.',
      familyHistory: 'Sin antecedentes familiares de hemorragia digestiva ni patología oncológica gastrointestinal.',
      otherAntecedents: 'Epigastralgia urente nocturna en semanas previas que calmaba con la ingesta (síndrome ulceroso duodenal previo no estudiado). Gonartrosis bilateral de rodillas en automedicación continuada con AINEs.'
    },
    currentSymptoms: {
      painLocation: 'Epigastrio y abdomen superior.',
      painQuality: 'Dolor sordo continuo de tipo ardor gástrico que en semanas previas cedía al comer; actualmente predomina la astenia intensa, sensación de frío y mareo.',
      painIrradiation: 'Sin irradiación posterior ni a flancos.',
      painIntensity: 3,
      associatedSymptoms: [
        'Astenia intensa y marcada debilidad generalizada',
        'Mareos ortostáticos pronunciados con sensación lipotímica al incorporarse',
        'Dos deposiciones negras como alquitrán y extremadamente fétidas (melena franca)',
        'Sensación de frío corporal y boca seca con intensa sed'
      ],
      onset: 'Inicio agudo de deposiciones oscuras y debilidad en las últimas 24 horas sobre cuadro dispéptico urente previo.',
      dyspneaLevel: 'mild'
    },
    initialVitals: {
      bpSystolic: 90,
      bpDiastolic: 60,
      heartRate: 112,
      respRate: 18,
      oxygenSat: 97,
      temperature: 36.2,
      painScore: 3
    },
    physicalExam: {
      general: '*Paciente lúcido pero marcadamente decaído, pálido, sudoroso y con frialdad acra. Refiere sensación de desvanecimiento con el ortostatismo.*',
      cardiac: '*Taquicardia sinusal rítmica a 112 lpm. Tonos cardíacos normofonéticos sin soplos orgánicos audibles ni galope R3/R4.*',
      pulmonary: '*Murmullo vesicular conservado en ambos campos pulmonares, sin ruidos respiratorios sobreañadidos. Eupneico a 18 rpm.*',
      skin: '*Piel fría, diaforética, con palidez cutáneo-mucosa franca. Tiempo de relleno capilar prolongado (3 segundos).*',
      abdomen: '*Abdomen blando, depresible, leve dolor a la palpación profunda en epigastrio, sin defensa muscular involuntaria ni signos de peritonismo (Blumberg negativo). Ruidos hidroaéreos aumentados por peristalsis inducida por sangre intraluminal.*',
      extremities: '*Extremidades con frialdad distal, pulsos arteriales periféricos débiles, filiformes y taquicárdicos. Sin edemas periféricos.*',
      neckVessels: '*Venas yugulares colapsadas en decúbito a 45°, indicativas de hipovolemia intravascular aguda.*',
      neurological: '*Glasgow 15/15. Tacto rectal: Se constata melena franca, con abundante residuo negruzco, pegajoso y extremadamente fétido adherido al dedil de guante.*'
    },
    complementaryStudies: {
      ecg: {
        rhythm: 'Taquicardia sinusal a 112 lpm',
        summary: 'Taquicardia sinusal reactiva a hipovolemia y anemia aguda sin supradesnivel del ST',
        stElevationLeads: [],
        stElevationMm: 0,
        detailedDescription: 'Trazado con taquicardia sinusal a 112 lpm, eje QRS a +60°, intervalos PR y QRS normales. No se aprecian anomalías agudas del segmento ST ni ondas T isquémicas.'
      },
      troponins: '*Troponina I ultrasensible: 7 ng/L (Normal < 14 ng/L). Sin evidencia de daño miocárdico agudo.*',
      cpkCkmb: '*CPK Total: 64 U/L | CK-MB: 1.5 ng/mL (Normales).*',
      hemogram: '*Laboratorio de Urgencia: Hemoglobina 7.8 g/dL (Valor crítico bajo), Hematocrito 24%, Leucocitos 8,500 /mm³ (fórmula normal), Plaquetas 240,000 /mm³. TP 85% (INR 1.10), KPTT 32 seg. Conclusión: Anemia aguda severa secundaria a sangrado digestivo intraluminal.*',
      biochemistry: '*Bioquímica sérica de urgencia: Urea 68 mg/dL (elevada por digestión y reabsorción de proteínas hemáticas intraluminales), Creatinina 1.0 mg/dL, Glucemia 104 mg/dL, Sodio 138 mEq/L, Potasio 4.1 mEq/L.*',
      coagulation: '*Coagulación: Tiempo de Protrombina 85% (INR 1.10), KPTT 32 seg, Fibrinógeno 310 mg/dL.*',
      chestXray: '*Radiografía de tórax portátil: Silueta cardiaca dentro de límites normales. Sin condensaciones parenquimatosas ni signos de sobrecarga de volumen pulmonar.*',
      arterialBloodGas: '*Gasometría venosa: pH 7.36, pCO2 38 mmHg, HCO3 21 mEq/L, Exceso de bases -3 mEq/L, Lactato 2.1 mmol/L (hiperlactatemia moderada por hipoperfusión tisular).*',
      otherDefault: '*Videoendoscopia Digestiva Alta (VEDA): A nivel de la primera porción duodenal (bulbo), se visualiza úlcera péptica de 12 mm de diámetro con vaso visible no sangrante en su lecho (Clasificación de Forrest IIa). Se realiza terapia combinada con inyección de adrenalina 1:10.000 y colocación de hemoclips metálicos con éxito hemostático completo.*'
    },
    ordenes_disponibles: {
      estudios: [
        {
          id: 'veda_urgente',
          keywords: ['veda', 'endoscopia', 'gastroscopia', 'fibrogastroscopia', 'endoscopia digestiva alta', 'forrest'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Videoendoscopia Digestiva Alta (VEDA) con Terapia Hemostática',
          reporte: 'Bulbo duodenal: Úlcera de 12 mm con vaso visible no sangrante (Forrest IIa). Se realiza terapia combinada exitosa con inyección de adrenalina y colocación de clips metálicos.',
          valores: {
            'Localización': 'Primera porción duodenal (Bulbo)',
            'Tamaño de úlcera': '12 mm de diámetro',
            'Clasificación Forrest': 'Forrest IIa (Vaso visible no sangrante)',
            'Procedimiento terapéutico': 'Inyección de adrenalina 1:10.000 + Hemoclips mecánicos',
            'Resultado hemostático': 'Hemostasia definitiva lograda sin resangrado inmediato'
          },
          costo_puntos: 15,
          tiempo_espera_min: 35,
          es_pertinente: true,
          actionId: 'order_endoscopy'
        },
        {
          id: 'lab_urgencia',
          keywords: ['laboratorio', 'analitica', 'hemograma', 'hemoglobina', 'urea', 'hematocrito', 'creatinina', 'analisis'],
          department: 'Laboratorio central',
          tipo: 'valores',
          titulo: 'Laboratorio de Urgencia Completo',
          reporte: 'Hemoglobina 7.8 g/dL, Hto 24%, Urea 68 mg/dL (relación BUN/Cr aumentada por sangrado intraluminal). Plaquetas y coagulación conservadas.',
          valores: {
            'Hemoglobina': '7.8 g/dL (Ref: 13.5-17.5 g/dL) [CRÍTICO]',
            'Hematocrito': '24.0% [BAJO]',
            'Leucocitos': '8,500 /mm³',
            'Plaquetas': '240,000 /mm³',
            'Tiempo Protrombina (TP)': '85% (INR 1.10)',
            'KPTT': '32 segundos',
            'Urea sérica': '68 mg/dL [ELEVADA POR SANGRADO DIGESTIVO]',
            'Creatinina': '1.0 mg/dL',
            'Glucemia': '104 mg/dL'
          },
          costo_puntos: 8,
          tiempo_espera_min: 20,
          es_pertinente: true
        },
        {
          id: 'tacto_rectal_orden',
          keywords: ['tacto rectal', 'tacto', 'melena', 'rectal', 'dedil', 'inspeccion rectal'],
          department: 'Enfermería de Urgencias',
          tipo: 'examen_fisico',
          titulo: 'Tacto Rectal de Urgencia',
          reporte: 'Se evidencia melena franca con restos negruzcos, alquitranados y fétidos en dedil de guante. Ampolla rectal sin masas palpables.',
          valores: {
            'Hallazgo rectal': 'Melena franca (pastosa, alquitranada y fétida)',
            'Esfínter anal': 'Tono conservado',
            'Lesiones palpables': 'Sin masas en el tercio distal'
          },
          costo_puntos: 0,
          tiempo_espera_min: 1,
          es_pertinente: true
        },
        {
          id: 'accesos_venosos_orden',
          keywords: ['via venosa', 'accesos venosos', 'via periferica', 'cateter', 'dos vias 14g', '16g', 'grueso calibre', 'abocath'],
          department: 'Enfermería de Urgencias',
          tipo: 'tratamiento',
          titulo: 'Canalización de 2 Vías Venosas Periféricas 14G-16G',
          reporte: 'Enfermería canaliza con éxito 2 vías venosas periféricas de grueso calibre (16G en ambos antebrazos) para infusión rápida.',
          costo_puntos: 0,
          tiempo_espera_min: 2,
          es_pertinente: true,
          actionId: 'large_bore_iv'
        },
        {
          id: 'cristaloides_orden',
          keywords: ['cristaloides', 'suero fisiologico', 'solucion fisiologica', 'fluidoterapia', 'ringer lactato', 'reanimacion volemica', 'expansion'],
          department: 'Enfermería de Urgencias',
          tipo: 'tratamiento',
          titulo: 'Fluidoterapia de Reanimación con Cristaloides (1000 ml NaCl 0.9%)',
          reporte: 'Se infunden 1000 ml de solución fisiológica rápida. La presión arterial sube a 105/68 mmHg y la taquicardia desciende a 94 lpm.',
          costo_puntos: 2,
          tiempo_espera_min: 5,
          es_pertinente: true,
          actionId: 'fluid_resuscitation'
        },
        {
          id: 'ibp_dosis_altas_orden',
          keywords: ['omeprazol', 'pantoprazol', 'ibp', 'esomeprazol ev', 'bomba de protones', 'dosis altas', '80 mg'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Inhibidor de Bomba de Protones (Omeprazol 80 mg Bolo EV + Perfusión)',
          reporte: 'Se administra bolo de 80 mg de Omeprazol EV seguido de infusión a 8 mg/h para elevar el pH intragástrico > 6 y estabilizar el coágulo.',
          costo_puntos: 3,
          tiempo_espera_min: 2,
          es_pertinente: true,
          actionId: 'high_dose_ppi'
        },
        {
          id: 'transfusion_orden',
          keywords: ['transfusion', 'globulos rojos', 'transfundir', 'concentrado de hematies', 'sangre', 'unidades de sangre'],
          department: 'Laboratorio central',
          tipo: 'tratamiento',
          titulo: 'Transfusión de Concentrado de Glóbulos Rojos (2 Unidades)',
          reporte: 'Banco de sangre procesa pruebas cruzadas y se transfunden 2 unidades de concentrado de hematíes isogrupo. Hb post-transfusión asciende a 9.2 g/dL.',
          costo_puntos: 12,
          tiempo_espera_min: 30,
          es_pertinente: true,
          actionId: 'blood_transfusion'
        },
        {
          id: 'suspender_aine_orden',
          keywords: ['suspender aine', 'suspender naproxeno', 'quitar naproxeno', 'suspender analgesicos', 'frenar aine'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Suspensión Inmediata y Definitiva de Naproxeno y AINEs',
          reporte: 'Se retira toda prescripción de antiinflamatorios no esteroideos para detener la inhibición de COX-1 y permitir la cicatrización mucosa.',
          costo_puntos: 0,
          tiempo_espera_min: 1,
          es_pertinente: true,
          actionId: 'stop_nsaids'
        },
        {
          id: 'sonda_balon_error_orden',
          keywords: ['sonda blakemore', 'sonda sengstaken', 'balon sengstaken', 'taponamiento esofagico'],
          department: 'Enfermería de Urgencias',
          tipo: 'rechazado',
          titulo: 'Colocación de Sonda de Sengstaken-Blakemore',
          reporte: '¡Alerta de Seguridad! Procedimiento contraindicado: El paciente no presenta signos de cirrosis ni hipertensión portal. La sonda balón en úlcera péptica produce riesgo de necrosis esofágica y perforación.',
          costo_puntos: 30,
          tiempo_espera_min: 10,
          es_pertinente: false,
          actionId: 'sengstaken_error'
        },
        {
          id: 'alta_ambulatoria_error_orden',
          keywords: ['alta medica', 'dar de alta', 'manejo ambulatorio', 'enviar a casa'],
          department: 'Enfermería de Urgencias',
          tipo: 'rechazado',
          titulo: 'Alta Médica con Manejo Ambulatorio',
          reporte: '¡Error Clínico Muy Grave! Paciente con hemorragia digestiva alta activa, taquicárdico, hipotenso y con Hb 7.8 g/dL. El alta causará shock hipovolémico letal en domicilio.',
          costo_puntos: 50,
          tiempo_espera_min: 5,
          es_pertinente: false,
          actionId: 'discharge_error'
        },
        {
          id: 'reiniciar_aine_error_orden',
          keywords: ['dar naproxeno', 'ibuprofeno', 'ketorolaco', 'diclofenac', 'reiniciar aine'],
          department: 'Farmacia Hospitalaria',
          tipo: 'tratamiento',
          titulo: 'Prescribir AINEs (Naproxeno / Ibuprofeno) para Dolor de Rodillas',
          reporte: '¡Iatrogenia Severa! Reiniciar AINEs en úlcera péptica sangrante inhibe la agregación plaquetaria y la síntesis de prostaglandinas, desencadenando resangrado masivo y shock refractario.',
          costo_puntos: 40,
          tiempo_espera_min: 2,
          es_pertinente: false,
          actionId: 'reinit_nsaid_error'
        }
      ]
    },
    targetDiagnosis: 'Hemorragia digestiva alta no variceal secundaria a úlcera péptica inducida por AINEs (Forrest IIa)',
    expectedActions: [
      {
        id: 'large_bore_iv',
        name: 'Canalización de dos accesos venosos periféricos de grueso calibre (14-16G)',
        category: 'monitoring',
        isCorrect: true,
        isMandatory: true,
        doseDescription: '2 vías venosas periféricas 14G o 16G en ambos antebrazos',
        rationale: 'Paso fundamental de reanimación según el protocolo de shock hipovolémico para permitir infusión volumétrica masiva.',
        vitalImpact: {}
      },
      {
        id: 'fluid_resuscitation',
        name: 'Reanimación volumétrica inmediata con cristaloides isotónicos (NaCl 0.9% / Ringer)',
        category: 'fluid',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Bolo de 1000 - 1500 ml de solución salina isotónica en 30 minutos',
        rationale: 'Restaura la volemia intravascular efectiva, mejora el gasto cardíaco y corrige la hipotensión ortostática.',
        vitalImpact: { bpSystolic: 105, bpDiastolic: 68, heartRate: 94 }
      },
      {
        id: 'blood_transfusion',
        name: 'Transfusión de concentrados de hematíes (umbral restrictivo en paciente con Hb 7.8 g/dL)',
        category: 'fluid',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Transfusión de 2 concentrados de glóbulos rojos desleucocitados',
        rationale: 'Objetivo de hemoglobina entre 7-9 g/dL para asegurar adecuada oxigenación tisular sin sobrecargar la presión portal/intragástrica.',
        vitalImpact: { bpSystolic: 115, bpDiastolic: 72, heartRate: 84 }
      },
      {
        id: 'high_dose_ppi',
        name: 'Inhibidor de Bomba de Protones a dosis altas por vía endovenosa (Omeprazol)',
        category: 'antiischemic',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Bolo de 80 mg EV seguido de perfusión a 8 mg/h o bolos de 40 mg cada 12 horas',
        rationale: 'Mantiene el pH intragástrico > 6.0, favoreciendo la agregación plaquetaria, inhibiendo la pepsina y estabilizando el coágulo sobre el vaso ulceroso.',
        vitalImpact: { painScore: 1 }
      },
      {
        id: 'stop_nsaids',
        name: 'Suspensión inmediata y definitiva de Naproxeno y todo AINE',
        category: 'antiplatelet',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'Retiro total de AINEs; rotar analgesia articular a paracetamol si requiere',
        rationale: 'Elimina el factor etiopatogénico primario de la úlcera y permite la reepitelización duodenal.',
        vitalImpact: {}
      },
      {
        id: 'order_endoscopy',
        name: 'Videoendoscopia digestiva alta (VEDA) precoz con hemostasia endoscópica dual',
        category: 'reperfusion',
        isCorrect: true,
        isMandatory: true,
        doseDescription: 'VEDA tras estabilización hemodinámica (inyección de adrenalina + hemoclips)',
        rationale: 'Diagnóstico y tratamiento definitivo de úlcera con vaso visible (Forrest IIa), reduciendo la tasa de resangrado del 50% al < 10%.',
        vitalImpact: { painScore: 1 }
      }
    ],
    contraindicatedActions: [
      {
        id: 'discharge_error',
        name: 'Dar de alta o plantear manejo ambulatorio al paciente',
        harmRationale: 'Error letal: Paciente con hemorragia activa, hipotensión ortostática y Hb 7.8 g/dL; el alta resulta en shock hipovolémico exanguinante.',
        vitalPenalty: { bpSystolic: 65, bpDiastolic: 40, heartRate: 135 }
      },
      {
        id: 'reinit_nsaid_error',
        name: 'Mantener o reiniciar Naproxeno u otros AINEs',
        harmRationale: 'Grave iatrogenia: Provoca resangrado masivo por alteración de la hemostasia plaquetaria y mayor daño de la barrera mucosa.',
        vitalPenalty: { bpSystolic: 75, bpDiastolic: 45, heartRate: 125, painScore: 6 }
      },
      {
        id: 'sengstaken_error',
        name: 'Colocación empírica de sonda balón de Sengstaken-Blakemore',
        harmRationale: 'Inapropiado y de alto riesgo: No hay sospecha de hipertensión portal; el balón produce riesgo de necrosis esofágica y perforación.',
        vitalPenalty: { bpSystolic: 80, heartRate: 120 }
      }
    ],
    debriefNotes: {
      clinicalPearl: 'En hemorragia digestiva alta no variceal con inestabilidad hemodinámica (shock clase II), la resucitación inicial rápida con cristaloides y la transfusión de glóbulos rojos (umbral de 7-8 g/dL) salvan vidas antes de ingresar a la sala de endoscopia. Las úlceras duodenales Forrest IIa (vaso visible no sangrante) tienen hasta un 50% de riesgo de resangrado si no se tratan con hemostasia endoscópica combinada (inyección + clips mecánicos).',
      guidelineReference: 'Guías ESGE (European Society of Gastrointestinal Endoscopy) y Consenso Internacional de Manejo de Hemorragia Digestiva Alta No Variceal.',
      keyPitfalls: [
        'Iniciar endoscopia antes de haber estabilizado la presión arterial y la frecuencia cardíaca con fluidoterapia adecuada.',
        'No investigar activamente el consumo crónico de AINEs de venta libre en pacientes ancianos con síntomas dispépticos o dolor osteoarticular.',
        'Confiar en una cifra de hemoglobina inicial normal o limítrofe en las primeras horas antes de completarse la hemodilución compensatoria.',
        'Omitir la terapia combinada (inyección sola sin método mecánico o térmico) en lesiones de alto riesgo Forrest IIa.'
      ]
    }
  }
];

