import { ClinicalCase, VitalSigns, ClinicalStage } from '../types/clinical';

export interface ProcessResult {
  reply: string;
  isPhysicalExam: boolean;
  isLabResult: boolean;
  isTreatment: boolean;
  vitalUpdates?: Partial<VitalSigns>;
  stageUpdate?: ClinicalStage;
  actionDetected?: string;
  evaluationFeedback?: {
    isPositive: boolean;
    title: string;
    description: string;
  };
}

export function processStudentInteraction(
  input: string,
  clinicalCase: ClinicalCase,
  currentVitals: VitalSigns,
  currentStage: ClinicalStage,
  administeredActions: string[]
): ProcessResult {
  const query = input.toLowerCase().trim();

  // Normalize query removing accents for keyword matching
  const normalized = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // ==========================================
  // ETAPA 0: PANTALLA DE BIENVENIDA (Inicio / Comenzar / Reiniciar)
  // ==========================================
  const isWelcome = /^(inicio|comenzar|reiniciar|empezar|etapa 0|bienvenida)$/i.test(normalized);
  if (isWelcome) {
    return {
      reply: `¡Bienvenidos a Hipócrates, el mejor simulador de casos clínicos! 🩺🤖\n\nPor favor, selecciona el módulo o especialidad que deseas practicar hoy:\n\n1️⃣ 🫁 **Respiratorio**\n2️⃣ 🫀 **Cardio**\n3️⃣ 🧠 **Neuro**\n4️⃣ 🫄 **Digestivo**\n5️⃣ 🎲 **Hipócrates elige el módulo** (Caso aleatorio sorpresa)\n\n*Escribe el número o el nombre del módulo para comenzar el caso.*`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false,
    };
  }

  // ==========================================
  // ETAPA 1: SELECCIÓN DE MÓDULO Y CARGA DEL CASO
  // ==========================================
  const isModuleSelection =
    /^(1|2|3|4|5|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|respiratorio|cardio|neuro|digestivo|hipocrates elige|aleatorio|sorpresa)$/i.test(normalized) ||
    /^modulo (respiratorio|cardio|neuro|digestivo|1|2|3|4|5)$/i.test(normalized);

  if (isModuleSelection) {
    if (/1|respiratorio/i.test(normalized)) {
      return {
        reply: `*(Ficha cargada: Módulo Respiratorio · Caso 01 - NAC Lobar Derecha. Paciente Femenino, 34 años, Robot Rosa).* \n\nAy doctor... (respiro agitada y con mucha dificultad, tosiendo con un pañuelo manchado de esputo herrumbroso)... me arde y me clava una puntada terrible en el costado derecho cada vez que tomo aire... y tengo una fiebre que me hace temblar toda... por favor, ayúdeme...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false,
      };
    } else if (/2|cardio/i.test(normalized)) {
      return {
        reply: `*(Ficha cargada: Módulo Cardio · Caso 01 - IAMCEST Anteroseptal. Paciente Masculino, 58 años, Robot Azul).* \n\nUfff... doctor... (me llevo la mano al centro del pecho con dolor opresivo)... me aprieta horrible desde hace dos horas... siento como si una losa enorme me estuviera aplastando... me entra un sudor muy frío y muchas náuseas... por favor, ayúdeme...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false,
      };
    } else if (/3|neuro/i.test(normalized)) {
      return {
        reply: `*(Ficha cargada: Módulo Neuro · Caso 01 - ACV Isquémico Agudo. Paciente Femenino, 67 años, Robot Rosa).* \n\n...Aaah... d-doc... (intento hablar con angustia pero no me salen las palabras con claridad, desvío la comisura de la boca hacia la izquierda e intento levantar el brazo derecho pero cae inerte)... ...m-me... aaah... (te miro con desesperación buscando ayuda)...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false,
      };
    } else if (/4|digestivo/i.test(normalized)) {
      return {
        reply: `*(Ficha cargada: Módulo Digestivo · Caso 01 - Adenocarcinoma / Esófago de Barrett. Paciente Masculino, 64 años, Robot Amarillo).* \n\nUfff... doctor/a... (me llevo la mano a la boca del estómago con molestia sorda y pesadez)... vengo porque desde hace tres meses tengo un dolor sordo y pesado aquí en el estómago que empeora mucho cada vez que como... además me lleno apenas con dos bocados y ya he perdido 8 kilos... me noto muy cansado y débil... por favor, ayúdeme...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false,
      };
    } else {
      return {
        reply: `*(Hipócrates selecciona un caso al azar de la guardia).* \n\n¡Caso cargado! Inicia la consulta médica con el paciente.`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false,
      };
    }
  }

  // ==========================================
  // 1. PHYSICAL EXAM REQUESTS (Regla 4: 3ª persona entre asteriscos)
  // ==========================================
  const isAuscultationCardiac = /auscult|estetoscopio|corazon|ruidos|cardiaco|soplos|foco/i.test(normalized);
  const isAuscultationPulm = /pulmon|respirat|campos|murmullo|crepitan|sibilan|respirar/i.test(normalized);
  const isSkinExam = /piel|diaforesis|sudor|fria|palidez|coloracion|turgencia|pliegue/i.test(normalized);
  const isAbdomenExam = /abdomen|palpo|palpar|barriga|vientre|peritoneal/i.test(normalized);
  const isVascularExam = /pulso|pedio|radial|femoral|relleno capilar|yugular|cuello/i.test(normalized);
  const isNeuroExam = /glasgow|neurolog|pupila|reflejo|orienta/i.test(normalized);
  const isGeneralExam = /inspeccion|general|te examino|exploracion fisica|reviso/i.test(normalized);
  const isBpExam = /tomo la presion|mido la presion|tomo la tension|esfigmo|manguito/i.test(normalized);

  if (isBpExam) {
    return {
      reply: `*Toma manual de presión arterial:* El manómetro registra **${currentVitals.bpSystolic}/${currentVitals.bpDiastolic} mmHg** en el brazo derecho y ${currentVitals.bpSystolic - 1}/${currentVitals.bpDiastolic - 1} mmHg en el brazo izquierdo. Frecuencia de pulso: ${currentVitals.heartRate} lpm.`,
      isPhysicalExam: true,
      isLabResult: false,
      isTreatment: false
    };
  }

  if (isAuscultationCardiac && !isAuscultationPulm) {
    return {
      reply: clinicalCase.physicalExam.cardiac,
      isPhysicalExam: true,
      isLabResult: false,
      isTreatment: false
    };
  }

  if (isAuscultationPulm && !isAuscultationCardiac) {
    return {
      reply: clinicalCase.physicalExam.pulmonary,
      isPhysicalExam: true,
      isLabResult: false,
      isTreatment: false
    };
  }

  if (isAuscultationCardiac && isAuscultationPulm) {
    return {
      reply: `${clinicalCase.physicalExam.cardiac}\n\n${clinicalCase.physicalExam.pulmonary}`,
      isPhysicalExam: true,
      isLabResult: false,
      isTreatment: false
    };
  }

  if (isSkinExam) {
    return {
      reply: clinicalCase.physicalExam.skin,
      isPhysicalExam: true,
      isLabResult: false,
      isTreatment: false
    };
  }

  if (isAbdomenExam) {
    return {
      reply: clinicalCase.physicalExam.abdomen,
      isPhysicalExam: true,
      isLabResult: false,
      isTreatment: false
    };
  }

  if (isVascularExam) {
    return {
      reply: `${clinicalCase.physicalExam.extremities}\n\n${clinicalCase.physicalExam.neckVessels}`,
      isPhysicalExam: true,
      isLabResult: false,
      isTreatment: false
    };
  }

  if (isNeuroExam) {
    return {
      reply: clinicalCase.physicalExam.neurological,
      isPhysicalExam: true,
      isLabResult: false,
      isTreatment: false
    };
  }

  if (isGeneralExam) {
    return {
      reply: `${clinicalCase.physicalExam.general}\n\n${clinicalCase.physicalExam.cardiac}\n\n${clinicalCase.physicalExam.pulmonary}\n\n${clinicalCase.physicalExam.skin}`,
      isPhysicalExam: true,
      isLabResult: false,
      isTreatment: false
    };
  }

  // ==========================================
  // 0. MODO 2: CREADOR Y ORGANIZADOR DE CASOS (Detección en Chat)
  // ==========================================
  const isMode2 =
    /crear caso|subir caso|nuevo caso|generar caso|organizar caso|armar caso/i.test(normalized) ||
    ((normalized.includes('motivo de consulta') || normalized.includes('antecedentes') || normalized.includes('diagnostico')) &&
      normalized.length > 70);

  if (isMode2) {
    const dummyCustomCase = {
      id: `caso_custom_${Date.now().toString().slice(-4)}`,
      code: 'Caso Personalizado',
      patientName: 'Hipócrates',
      title: 'Caso Clínico Estructurado',
      gender: normalized.includes('femenin') || normalized.includes('mujer') ? 'femenino' : 'masculino',
      age: 60,
      colorTheme: normalized.includes('amarill') || normalized.includes('icter') ? 'yellow' : 'blue',
      chiefComplaint: 'Sintomatología clínica en estudio según notas proporcionadas.',
      history: {
        hypertension: 'Antecedente hipertensivo especificado.',
        smoking: 'Tabaquismo a precisar.',
        allergies: 'No alergias conocidas.',
        medications: 'Fármacos referidos.',
        pastSurgeries: 'Sin cirugías previas.',
        familyHistory: 'Antecedentes familiares de interés.',
        otherAntecedents: 'Enfermedades crónicas asociadas.'
      },
      currentSymptoms: {
        painLocation: 'Área según cuadro clínico.',
        painQuality: 'Dolor o molestia referida.',
        painIrradiation: 'Sin irradiación lejana.',
        painIntensity: 5,
        associatedSymptoms: ['Malestar general', 'Astenia'],
        onset: 'Evolución según notas.',
        dyspneaLevel: 'none'
      },
      initialVitals: {
        bpSystolic: 120,
        bpDiastolic: 80,
        heartRate: 78,
        respRate: 16,
        oxygenSat: 98,
        temperature: 36.8,
        painScore: 5
      },
      physicalExam: {
        general: '*Paciente consciente y orientado.*',
        cardiac: '*Ruidos cardíacos normofonéticos.*',
        pulmonary: '*Murmullo vesicular conservado.*',
        skin: '*Normocoloreada y normohidratada.*',
        abdomen: '*Abdomen blando sin signos peritoneales.*',
        extremities: '*Extremidades sin edemas.*',
        neckVessels: '*Sin ingurgitación yugular.*',
        neurological: '*Glasgow 15/15 sin focalidad.*'
      },
      complementaryStudies: {
        ecg: { rhythm: 'Sinusal regular', summary: 'Normal', stElevationLeads: [], stElevationMm: 0, detailedDescription: 'Trazado estándar sin alteraciones agudas.' },
        troponins: '*Troponinas normales.*',
        cpkCkmb: '*CPK normal.*',
        hemogram: '*Hemograma completo en rango.*',
        biochemistry: '*Bioquímica estándar normal.*',
        coagulation: '*Tiempos normales.*',
        chestXray: '*Rx tórax normal.*',
        arterialBloodGas: '*Gasometría normal.*',
        otherDefault: '*Estudios procesados sin anomalías.*'
      },
      ordenes_disponibles: {
        estudios: [
          {
            id: 'analitica_urgente',
            keywords: ['analitica', 'hemograma', 'bioquimica'],
            department: 'Laboratorio central',
            tipo: 'valores',
            titulo: 'Analítica Sanguínea Urgente',
            reporte: 'Parámetros procesados.',
            costo_puntos: 8,
            tiempo_espera_min: 20,
            es_pertinente: true
          }
        ]
      },
      targetDiagnosis: 'Diagnóstico en estudio según notas clínicas',
      expectedActions: [
        {
          id: 'monitorizar',
          name: 'Monitorización de constantes vitales',
          category: 'monitoring',
          isCorrect: true,
          isMandatory: true,
          rationale: 'Estabilización básica del paciente en guardia.',
          vitalImpact: {}
        }
      ],
      contraindicatedActions: [
        {
          id: 'alta_precoz',
          name: 'Alta hospitalaria no justificada',
          harmRationale: 'Riesgo de descompensación no monitorizada.',
          vitalPenalty: { heartRate: 120 }
        }
      ],
      debriefNotes: {
        clinicalPearl: 'Sistematizar la recogida de datos y pruebas dirigidas.',
        guidelineReference: 'Guías Clínicas de Medicina Interna.',
        keyPitfalls: ['Retrasar el estudio de síntomas de alarma.']
      }
    };

    return {
      reply: `¡Entendido! Me transformo en el **Asistente de Estructuración de Datos Médicos** de Hipócrates.\n\nHe analizado la información y estructurado el caso clínico en formato JSON compatible con la plataforma (listo para copiar e integrar en \`src/data/cases.ts\` de GitHub o cargar en el simulador):\n\n\`\`\`json\n${JSON.stringify(dummyCustomCase, null, 2)}\n\`\`\`\n\n*Consejo: Puedes presionar el botón "Creador de Casos" en la barra superior para editarlo y cargarlo en vivo al simulador.*`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // ==========================================
  // 2. COMPLEMENTARY STUDIES & LABS IN CHAT (Regla 3: Secretismo Clínico)
  // "Si el médico te pide una radiografía, examen de sangre o ECG en el chat,
  // responde amablemente: 'Doctor/a, de eso se encarga el equipo de enfermería o laboratorio en la terminal de órdenes.'"
  // ==========================================
  const isComplementaryOrderInChat =
    /ecg|electrocardiograma|electro|trazado|troponina|enzima|marcador cardiaco|necrosis|cpk|ck-mb|ckmb|hemograma|hematometria|plaquetas|leucocitos|hemoglobina|serie roja|bioquimica|glucosa|glucemia|urea|creatinina|filtrado|perfil renal|coagulacion|inr|dimero d|ttpa|fibrinogeno|radiografia|rayos x|placa de torax|rx|tele de torax|gasometria|gases arteriales|pao2|paco2|lactato|ph|ecografia|tac|scanner|resonancia|angiotac|urocultivo|analitica|endoscopia|veda|gastroscopia|biopsia/i.test(
      normalized
    );

  if (isComplementaryOrderInChat) {
    return {
      reply: 'Doctor/a, de eso se encarga el equipo de laboratorio/imágenes en la terminal de órdenes.',
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false,
    };
  }

  // ==========================================
  // 3. TREATMENT AND CLINICAL ACTIONS (Regla 5)
  // ==========================================
  // Check for contraindicated actions first
  const isAine = /ibuprofeno|ketorolaco|diclofenaco|naproxeno|aines|meloxicam/i.test(normalized);
  const isDischarge = /alta medica|dar de alta|mandar a casa|reposo en casa|no tiene nada/i.test(normalized);

  if (isAine) {
    const penalty = clinicalCase.contraindicatedActions.find(c => c.id === 'give_nsaids')?.vitalPenalty || { heartRate: 118, painScore: 9 };
    return {
      reply: `*(Alarma de monitor)* ...¡¡Aaaagh!! Doctor... el pecho me quema y me aprieta aún más... ¡siento que voy a estallar! *(RoboDoc parpadea en rojo de advertencia crítica; la administración de AINEs en IAMCEST empeora la isquemia miocárdica y eleva el riesgo de rotura de pared libre)*.`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: true,
      stageUpdate: 'worsened',
      vitalUpdates: {
        bpSystolic: (currentVitals.bpSystolic || 155) + 12,
        heartRate: Math.min(140, (currentVitals.heartRate || 102) + 14),
        painScore: 9
      },
      evaluationFeedback: {
        isPositive: false,
        title: '¡Contraindicación Absoluta!',
        description: 'Los AINEs están estrictamente contraindicados en el IAMCEST: inhiben la cicatrización miocárdica, generan trombosis y aumentan la mortalidad.'
      }
    };
  }

  if (isDischarge) {
    return {
      reply: `*(RoboDoc pierde el conocimiento momentáneamente, caída súbita de presión arterial y taquicardia ventricular en monitor)* ...¡¡Doctor, no me puedo levantar... la vista se me nubla...!! *(Grave negligencia médica: jamás dar de alta a un paciente con dolor coronario agudo y elevación del ST)*.`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: true,
      stageUpdate: 'critical',
      vitalUpdates: {
        bpSystolic: 85,
        bpDiastolic: 50,
        heartRate: 135,
        painScore: 10
      },
      evaluationFeedback: {
        isPositive: false,
        title: '¡Error Fatal de Conducción!',
        description: 'El paciente sufre un IAMCEST anteroseptal activo. El alta conlleva una mortalidad inmediata superior al 50% por shock cardiogénico o arritmia ventricular fatal.'
      }
    };
  }

  // Check correct actions
  const isAspirin = /aspirina|aas|acido acetilsalicilico/i.test(normalized);
  const isSecondAntiplatelet = /ticagrelor|clopidogrel|prasugrel|doble antiagregacion/i.test(normalized);
  const isNitrate = /nitroglicerina|nitratos|solinitrina|parche de nitro/i.test(normalized);
  const isMorphine = /morfina|fentanilo|opiaceo|cloruro morfico/i.test(normalized);
  const isHeparin = /heparina|enoxaparina|clexane|anticoagulacion/i.test(normalized);
  const isReperfusion = /codigo infarto|angioplastia|cateterismo|hemodinamica|stent|reperfusion|fibrinolisis|trombolisis/i.test(normalized);
  const isOxygen = /oxigeno|mascarilla|gafas nasales|o2/i.test(normalized);

  if (isReperfusion) {
    const isBlue = clinicalCase.colorTheme === 'blue';
    return {
      reply: `*(Alerta de Hemodinámica activada: Se traslada de urgencia al laboratorio de cateterismo cardíaco. Tiempo puerta-balón estimado: 45 min).* Uff doctor... ¡muchas gracias! Siento que todo el equipo se está movilizando... la opresión en el pecho va aliviándose y ya no siento esa sensación de muerte... *(Las luces de RoboDoc pasan de ámbar a un ${isBlue ? 'azul sereno y estable' : 'rosa armónico y estable'})*.`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: true,
      stageUpdate: 'resolved',
      actionDetected: 'urgent_reperfusion',
      vitalUpdates: {
        bpSystolic: 125,
        bpDiastolic: 80,
        heartRate: 76,
        respRate: 16,
        oxygenSat: 96,
        painScore: 1
      },
      evaluationFeedback: {
        isPositive: true,
        title: '¡Código Infarto Activado con Éxito!',
        description: 'La angioplastia primaria inmediata (< 90-120 min) restaura el flujo coronario en la arteria descendente anterior y salva la vida del paciente.'
      }
    };
  }

  if (isNitrate) {
    return {
      reply: `*(Se administra Nitroglicerina sublingual).* ...Ahhh... (suspira despacio)... noto como un alivio paulatino... la losa que me apretaba el pecho ya no pesa tanto, ahora es más tolerable...`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: true,
      stageUpdate: 'improving',
      actionDetected: 'nitrates_sublingual',
      vitalUpdates: {
        bpSystolic: 132,
        bpDiastolic: 82,
        painScore: Math.max(3, currentVitals.painScore - 3)
      }
    };
  }

  if (isMorphine) {
    return {
      reply: `*(Se administra Cloruro Mórfico 3 mg iv lentos).* ...Ufff... qué descanso, doctor... el dolor baja bastante... me siento mucho más calmado...`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: true,
      stageUpdate: 'improving',
      actionDetected: 'morphine_analgesia',
      vitalUpdates: {
        painScore: Math.max(2, currentVitals.painScore - 4),
        heartRate: Math.max(78, currentVitals.heartRate - 12),
        respRate: 18
      }
    };
  }

  if (isAspirin && isSecondAntiplatelet) {
    return {
      reply: `*(Se administra Ácido Acetilsalicílico 300 mg masticada + Ticagrelor 180 mg carga oral).* He tomado las pastillas, doctor... me saben amargas, pero las tragué... continúo con dolor pero espero que me ayuden...`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: true,
      stageUpdate: 'improving',
      actionDetected: 'aspirin_loading',
      vitalUpdates: {
        painScore: Math.max(5, currentVitals.painScore - 2)
      },
      evaluationFeedback: {
        isPositive: true,
        title: 'Doble Antiagregación Plaquetaria Adecuada (DAPT)',
        description: 'Aspirina + Ticagrelor constituyen la indicación clase I de las guías europeas y americanas.'
      }
    };
  }

  if (isAspirin) {
    return {
      reply: `*(Se administra Ácido Acetilsalicílico 300 mg vo masticada).* Ya la mastiqué y tragué, doctor... sigo con el apretón en el pecho pero haré lo que me diga...`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: true,
      stageUpdate: currentStage === 'initial' ? 'improving' : currentStage,
      actionDetected: 'aspirin_loading',
      vitalUpdates: {
        painScore: Math.max(6, currentVitals.painScore - 1)
      }
    };
  }

  if (isSecondAntiplatelet) {
    return {
      reply: `*(Se administra carga oral de segundo antiagregante plaquetario).* Pastillas recibidas, doctor.`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: true,
      actionDetected: 'second_antiplatelet'
    };
  }

  if (isHeparin) {
    return {
      reply: `*(Se administra anticoagulación parenteral).* Vía venosa canalizada con heparina administrada.`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: true,
      actionDetected: 'heparin_anticoag'
    };
  }

  if (isOxygen) {
    if (currentVitals.oxygenSat >= 90) {
      return {
        reply: `*(Se coloca cánula nasal con O2 a 2 L/min).* Respiro un poco más fresco doctor... aunque la opresión en el pecho sigue igual... *(Nota clínica docente: Al estar la SatO2 en 94%, el oxígeno no es estrictamente necesario y debe usarse solo si Sat < 90% para prevenir vasoconstricción coronaria)*.`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: true,
        vitalUpdates: {
          oxygenSat: 96
        }
      };
    } else {
      return {
        reply: `*(Se inicia oxigenoterapia urgente).* ...Gracias doctor... sentía que me ahogaba... ahora me llega más aire...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: true,
        vitalUpdates: {
          oxygenSat: 95,
          respRate: 20
        }
      };
    }
  }

  // ==========================================
  // 4. ANAMNESIS / INTERVIEW QUESTIONS (Reglas 1, 2, 3)
  // ==========================================
  // Rule 3: Clinical Secrecy - NEVER reveal diagnosis voluntarily!
  if (/diagnostico|que tiene|que le pasa|enfermedad|cancer|tumor|infarto/i.test(normalized) && /usted|usted cree|diga|piensa/i.test(normalized)) {
    return {
      reply: `No lo sé doctor/a... yo solo soy el paciente... Tengo miedo porque noto que he bajado mucho de peso y el malestar no se me quita... ¿Usted qué sospecha? ¿Qué me van a hacer en el hospital?`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // Melena / Stool / Bowel movements (Specific to Caso 004)
  if (/melena|heces|caca|alquitran|negra|fecal|bano|defec|evacua|deposicion|sangrado/i.test(normalized)) {
    if (clinicalCase.id === 'caso_004') {
      return {
        reply: `Fui dos veces al baño en estas últimas 24 horas, doctor... y salió todo negro, negro brillante como si fuera alquitrán o betún de zapatos, y con un olor pastoso y nauseabundo insoportable... me asustó muchísimo... nunca me había pasado algo así...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false
      };
    }
  }

  // Dizziness / Orthostatism / Weakness / Cold sensation (Caso 004)
  if (/mareo|pararse|incorporar|debil|frio|boca seca|sed|desmayo|lipotimia/i.test(normalized)) {
    if (clinicalCase.id === 'caso_004') {
      return {
        reply: `Tengo la boca sequísima y una sed tremenda, doctor... y cada vez que intento levantarme o sentarme se me oscurece todo, me dan vueltas las cosas y siento que me voy a desplomar... además tengo las manos y los pies helados...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false
      };
    }
  }

  // Weight loss / Satiety questions (Specific to Caso 001)
  if (/peso|adelgaz|kilos|kg|saciedad|llena|apetito|hambre|comida/i.test(normalized)) {
    if (clinicalCase.id === 'caso_001') {
      return {
        reply: `Sí doctor... he perdido 8 kilos en apenas tres meses sin proponérmelo... además me lleno enseguida con dos bocados que pruebe (saciedad precoz) y luego me queda un dolor y pesadez tremenda en la boca del estómago...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false
      };
    }
    if (clinicalCase.id === 'caso_004') {
      return {
        reply: `No he perdido peso que yo sepa, doctor... pero hace unas semanas sentía un dolor tipo ardor en la boca del estómago que me despertaba a la noche y se me calmaba un poco cuando comía algo... pero ahora casi no tengo apetito por las náuseas y el mareo...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false
      };
    }
  }

  // Chief complaint / Pain characteristics (Alicia del dolor)
  if (/duele|dolor|siente|pesadez|ardor|quemazon|estomago|epigastrio|pecho|opresion|sensacion|molestia/i.test(normalized) && !/irradia|hacia donde|espalda|brazo|cuello/i.test(normalized)) {
    if (clinicalCase.id === 'caso_001') {
      return {
        reply: `Doctor... tengo un dolor sordo y continuo en la boca del estómago (en el epigastrio)... es como una pesadez y ardor que empeora marcadamente cada vez que intento comer algo... y con pocos bocados ya me siento lleno y con náuseas...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false
      };
    } else if (clinicalCase.colorTheme === 'blue') {
      return {
        reply: `Uff... me aprieta el centro del pecho como si un elefante se me hubiera sentado encima... es una presión constante y pesada... me cuesta respirar hondo porque me ahoga más...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false
      };
    } else {
      return {
        reply: `Ay doctor... siento un dolor punzante terrible cada vez que tomo aire... no puedo respirar hondo porque parece que me clavaran una aguja...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false
      };
    }
  }

  // Irradiation
  if (/irradia|hacia donde|corre|mueve|brazo|mandibula|cuello|espalda|hombro/i.test(normalized)) {
    if (clinicalCase.id === 'caso_001') {
      return {
        reply: `No se me va hacia la espalda, doctor... más bien noto como un ardor que me sube hacia el pecho por detrás del esternón, pero el dolor sordo y pesado está fijo en la boca del estómago...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false
      };
    }
    return {
      reply: `Sí doctor... la opresión me sube por el cuello hasta la mandíbula y noto que me baja por todo el brazo izquierdo... lo siento entumecido y pesado...`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // Time / Onset / Duration
  if (/cuando|tiempo|horas|duracion|empezo|inicio|momento|meses|semanas/i.test(normalized)) {
    if (clinicalCase.id === 'caso_001') {
      return {
        reply: `Empezó hace unos 3 meses poco a poco... al principio creí que era una gastritis común, pero en las últimas 3 semanas el dolor después de comer se ha hecho casi insoportable y no retengo casi nada de comida...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false
      };
    }
    return {
      reply: `Empezó hace unas dos horas... estaba sentado mirando la televisión en el salón, totalmente en reposo, y de repente me vino este apretón tremendo. No se me ha pasado en ningún momento.`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // Associated symptoms (nausea, sweat, dyspnea, vomiting, fatigue)
  if (/nauseas|vomit|sudor|diaforesis|mareo|aire|falta el aire|disnea|fatiga|astenia|cansancio/i.test(normalized)) {
    if (clinicalCase.id === 'caso_001') {
      return {
        reply: `Sí doctor... tengo muchas náuseas después de comer aunque casi no llego a vomitar... y noto una astenia y un cansancio muy marcado, me canso solo al caminar unos metros... y me veo la piel pálida y amarillenta...`,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false
      };
    }
    return {
      reply: `Sí... estoy empapado en sudor frío... tengo el estómago con muchas náuseas y revuelto, y noto que me falta el aire... me entra una angustia tremenda...`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // Hypertension / Past history
  if (/presion|hipertens|tension|antecedentes|enfermedad|cronica|medico|gastritis|reflujo|diabetes/i.test(normalized)) {
    return {
      reply: clinicalCase.history.hypertension + ' ' + (clinicalCase.history.otherAntecedents || ''),
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // Smoking / Habits
  if (/fuma|tabaco|cigarr|alcohol|drogas|habito/i.test(normalized)) {
    return {
      reply: clinicalCase.history.smoking,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // Allergies
  if (/alergia|alergico|reaccion|intoleran/i.test(normalized)) {
    return {
      reply: clinicalCase.history.allergies,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // Medications
  if (/medicamento|farmaco|pastilla|tratamiento|toma|enalapril|droga/i.test(normalized)) {
    return {
      reply: clinicalCase.history.medications,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // Family history / Surgeries
  if (/familia|padres|hermanos|operaciones|cirugia/i.test(normalized)) {
    return {
      reply: `${clinicalCase.history.familyHistory} ${clinicalCase.history.pastSurgeries}`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // General greeting
  if (/hola|buenos dias|buenas tardes|que tal|como esta|saludos/i.test(normalized)) {
    const isMale = clinicalCase.gender === 'masculino';
    return {
      reply: isMale
        ? `Hola doctor... ayy... perdóneme pero me encuentro fatal... me duele muchísimo el pecho desde hace dos horas y me asusta no poder respirar bien...`
        : `Hola doctor... uff... casi no puedo hablar... me falta mucho el aire y me da una punzada muy fuerte en el pecho...`,
      isPhysicalExam: false,
      isLabResult: false,
      isTreatment: false
    };
  }

  // Default fallback honoring symptoms & 1st person
  const isMale = clinicalCase.gender === 'masculino';
  return {
    reply: isMale
      ? `Ufff... doctor... (se queja llevándose la mano al pecho)... no entiendo bien la pregunta por el dolor... siento mucha opresión aquí en el centro del pecho... ¿puede revisarme o darme algo para este dolor?`
      : `Ay doctor... me cuesta concentrarme con este ahogo y dolor en el pecho... ¿qué necesita saber exactamente?`,
    isPhysicalExam: false,
    isLabResult: false,
    isTreatment: false
  };
}
