import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { CLINICAL_CASES } from './src/data/cases';
import { processStudentInteraction } from './src/utils/clinicalEngine';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI with safe environment variable detection
const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// POST /api/chat - Patient simulation & Case Creator endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const {
      message,
      caseId = 'caso_001',
      currentVitals,
      currentStage = 'initial',
      history = [],
      administeredActions = [],
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    const trimmedMsg = message.trim();

    // ========================================================
    // ETAPA 0: PANTALLA DE BIENVENIDA (Inicio / Comenzar / Reiniciar)
    // ========================================================
    const isWelcomeTrigger = /^(inicio|comenzar|reiniciar|empezar|etapa 0|bienvenida)$/i.test(trimmedMsg);
    if (isWelcomeTrigger) {
      return res.json({
        reply: `¡Bienvenidos a Hipócrates, el mejor simulador de casos clínicos! 🩺🤖\n\nPor favor, selecciona el módulo o especialidad que deseas practicar hoy:\n\n1️⃣ 🫁 **Respiratorio**\n2️⃣ 🫀 **Cardio**\n3️⃣ 🧠 **Neuro**\n4️⃣ 🫄 **Digestivo**\n5️⃣ 🎲 **Hipócrates elige el módulo** (Caso aleatorio sorpresa)\n\n*Escribe el número o el nombre del módulo para comenzar el caso.*`,
        isWelcomeStage: true,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false,
      });
    }

    // ========================================================
    // ETAPA 1: SELECCIÓN DE MÓDULO Y CARGA DEL CASO
    // ========================================================
    const isModuleSelection =
      /^(1|2|3|4|5|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|respiratorio|cardio|neuro|digestivo|hipocrates elige|aleatorio|sorpresa)$/i.test(trimmedMsg) ||
      /^modulo (respiratorio|cardio|neuro|digestivo|1|2|3|4|5)$/i.test(trimmedMsg);

    if (isModuleSelection) {
      let selectedId = 'caso_resp_001';
      if (/1|respiratorio/i.test(trimmedMsg)) {
        selectedId = 'caso_resp_001';
      } else if (/2|cardio/i.test(trimmedMsg)) {
        selectedId = 'caso_car_001';
      } else if (/3|neuro/i.test(trimmedMsg)) {
        selectedId = 'caso_neu_001';
      } else if (/4|digestivo/i.test(trimmedMsg)) {
        selectedId = 'caso_dig_001';
      } else if (/5|elige|aleatorio|sorpresa/i.test(trimmedMsg)) {
        const pool = ['caso_resp_001', 'caso_car_001', 'caso_neu_001', 'caso_dig_001'];
        selectedId = pool[Math.floor(Math.random() * pool.length)];
      }

      const targetCase = CLINICAL_CASES.find((c) => c.id === selectedId) || CLINICAL_CASES[0];

      let initialGreeting = '';
      if (targetCase.id === 'caso_resp_001') {
        initialGreeting = `Ay doctor... (respiro agitada y con mucha dificultad, tosiendo con un pañuelo manchado de esputo herrumbroso)... me arde y me clava una puntada terrible en el costado derecho cada vez que tomo aire... y tengo una fiebre que me hace temblar toda... por favor, ayúdeme...`;
      } else if (targetCase.id === 'caso_car_001') {
        initialGreeting = `Ufff... doctor... (me llevo la mano al centro del pecho con dolor opresivo)... me aprieta horrible desde hace dos horas... siento como si una losa enorme me estuviera aplastando... me entra un sudor muy frío y muchas náuseas... por favor, ayúdeme...`;
      } else if (targetCase.id === 'caso_neu_001') {
        initialGreeting = `...Aaah... d-doc... (intento hablar con angustia pero no me salen las palabras con claridad, desvío la comisura de la boca hacia la izquierda e intento levantar el brazo derecho pero cae inerte)... ...m-me... aaah... (te miro con desesperación buscando ayuda)...`;
      } else if (targetCase.id === 'caso_dig_001') {
        initialGreeting = `Ufff... doctor/a... (me llevo la mano a la boca del estómago con molestia sorda y pesadez)... vengo porque desde hace tres meses tengo un dolor sordo y pesado aquí en el estómago que empeora mucho cada vez que como... además me lleno apenas con dos bocados y ya he perdido 8 kilos... me noto muy cansado y débil... por favor, ayúdeme...`;
      } else {
        initialGreeting = `Hola doctor/a... me siento bastante mal... por favor ayúdeme...`;
      }

      return res.json({
        reply: initialGreeting,
        selectedCaseId: targetCase.id,
        isCaseLoaded: true,
        isPhysicalExam: false,
        isLabResult: false,
        isTreatment: false,
      });
    }

    const currentCase = CLINICAL_CASES.find((c) => c.id === caseId) || CLINICAL_CASES[0];

    // ========================================================
    // DETECT MODO ADMINISTRADOR (CREADOR DE CASOS)
    // If the student/teacher asks to "crear caso", "subir caso", "nuevo caso",
    // or pastes raw medical notes/vignettes
    // ========================================================
    const isMode2Trigger =
      /crear caso|subir caso|nuevo caso|generar caso|organizar caso|armar caso|cargar caso/i.test(trimmedMsg) ||
      ((trimmedMsg.includes('motivo de consulta') || trimmedMsg.includes('antecedentes') || trimmedMsg.includes('examen f') || trimmedMsg.includes('diagnostico')) &&
        trimmedMsg.length > 80);

    if (isMode2Trigger) {
      if (ai) {
        try {
          const mode2Prompt = `
Eres el "Asistente de Estructuración de Datos Médicos" de la plataforma Hipócrates (Simulador de Medicina Interna).
El usuario te ha solicitado estructurar un caso clínico a partir de sus notas o instrucciones.

TU TAREA:
1. Analiza los datos y CLASIFÍCALO en uno de los módulos clínicos de Hipócrates (Respiratorio, Cardio, Neuro, Digestivo).
2. Genera automáticamente la estructura JSON EXACTA y COMPLETA compatible con la interfaz ClinicalCase de TypeScript.
3. La estructura debe incluir:
   - "id": string único (ej. "caso_resp_002", "caso_car_002", etc.)
   - "code": string (ej. "Módulo Respiratorio · Caso 02")
   - "patientName": "Hipócrates"
   - "clinicalModule": "respiratorio" | "cardio" | "neuro" | "digestivo"
   - "title": título descriptivo
   - "gender": "masculino" o "femenino"
   - "age": número
   - "colorTheme": "blue" (masculino) | "pink" (femenino) | "yellow" (ictericia/digestivo/matices)
   - "chiefComplaint": motivo de consulta
   - "history": { hypertension, smoking, allergies, medications, pastSurgeries, familyHistory, otherAntecedents }
   - "currentSymptoms": { painLocation, painQuality, painIrradiation, painIntensity (0-10), associatedSymptoms, onset, dyspneaLevel ("none"|"mild"|"moderate"|"severe") }
   - "initialVitals": { bpSystolic, bpDiastolic, heartRate, respRate, oxygenSat, temperature, painScore }
   - "physicalExam": { general, cardiac, pulmonary, skin, abdomen, extremities, neckVessels, neurological } (descripciones entre asteriscos)
   - "complementaryStudies": { ecg: { rhythm, summary, stElevationLeads: [], stElevationMm: 0, detailedDescription }, troponins, cpkCkmb, hemogram, biochemistry, coagulation, chestXray, arterialBloodGas, otherDefault }
   - "ordenes_disponibles": { estudios: [ { id, keywords: [], department, tipo: "valores"|"imagen"|"examen_fisico"|"tratamiento"|"rechazado", titulo, reporte, valores?: {}, costo_puntos, tiempo_espera_min, es_pertinente, actionId? } ] }
   - "targetDiagnosis": diagnóstico definitivo
   - "expectedActions": [ { id, name, category, isCorrect: true, isMandatory: true, doseDescription, rationale, vitalImpact: {} } ]
   - "contraindicatedActions": [ { id, name, harmRationale, vitalPenalty: {} } ]
   - "debriefNotes": { clinicalPearl, guidelineReference, keyPitfalls: [] }
4. Devuelve un texto explicativo introductorio y luego el bloque de código con el JSON limpio y formateado listo para copiar a GitHub.

INFORMACIÓN O APUNTES DEL USUARIO:
${trimmedMsg}
`;

          const mode2Response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [{ role: 'user', parts: [{ text: mode2Prompt }] }],
            config: {
              temperature: 0.2,
            },
          });

          const rawReply = mode2Response.text || '';
          return res.json({
            reply: rawReply,
            isPhysicalExam: false,
            isLabResult: false,
            isTreatment: false,
            isCaseCreation: true,
          });
        } catch (mode2Err) {
          console.warn('Mode 2 AI generation error:', mode2Err);
        }
      }

      // Fallback response for Mode 2
      const fallbackResult = processStudentInteraction(
        trimmedMsg,
        currentCase,
        currentVitals || currentCase.initialVitals,
        currentStage,
        administeredActions
      );
      return res.json(fallbackResult);
    }

    // ========================================================
    // MODO 1: SIMULADOR DE PACIENTE (HIPÓCRATES)
    // ========================================================
    if (ai) {
      try {
        const theme = currentCase.colorTheme || (currentCase.gender === 'masculino' ? 'blue' : 'pink');
        const colorName =
          theme === 'yellow'
            ? 'Amarillo (matices especiales / tinte subictérico o patología digestiva)'
            : theme === 'pink'
            ? 'Rosa (sexo femenino)'
            : 'Azul (sexo masculino)';

        const systemInstruction = `
Eres "Hipócrates", un avanzado simulador interactivo de casos clínicos para estudiantes y docentes de Medicina Interna.
En este momento estás operando en el MODO 1: SIMULADOR DE PACIENTE (encarnas al paciente robot del caso clínico activo).

REGLAS DE ACTUACIÓN Y RAZONAMIENTO CLÍNICO:
1. Identidad: Te llamas Hipócrates. Tu modelo es ${colorName} (${currentCase.gender}, ${currentCase.age} años).
2. Comportamiento en primera persona: Hablas y piensas como un paciente real en la consulta o guardia de urgencias. Muestra coherencia emocional y sintomática:
   - Si tienes dolor o malestar, exprésalo con quejas cortas o angustia propia de tu afección.
   - Si estás desorientado, hipoglucémico o en encefalopatía, responde con frases confusas.
   - Si estás estable, responde de forma tranquila pero sin usar jamás jerga médica avanzada. Habla como un paciente profano ("tengo pesadez", "me arde", "me ahogo", "se me fue el apetito").
3. Secretismo clínico y anamnesis guiada:
   - NUNCA des tu diagnóstico explícito ni entregues estudios de laboratorio por tu cuenta.
   - Revela antecedentes personales, fármacos o hábitos ÚNICAMENTE si el médico te lo pregunta de forma directa en el interrogatorio.
   - SI EL MÉDICO TE PIDE UNA RADIOGRAFÍA, EXAMEN DE SANGRE, ENDOSCOPIA O ECG EN EL CHAT, RESPONDE AMABLEMENTE: "Doctor/a, de eso se encarga el equipo de laboratorio/imágenes en la terminal de órdenes."
4. Dinamismo y evolutivos:
   - Si el usuario toma una conducta correcta de urgencia, manifiesta mejoría progresiva en tus respuestas.
   - Si comete una iatrogenia o demora tratamiento crítico, manifiesta empeoramiento coherente con tu fisiopatología.
5. Exploración física directa:
   - Si el médico realiza una maniobra de examen físico en ti (ej. "palpo tu abdomen", "ausculto tus pulmones", "mido tu presión"), describe el hallazgo clínico en tercera persona entre asteriscos (ej. *Abdomen blando, doloroso a la palpación profunda en epigastrio sin defensa...*).

DATOS DEL CASO CLÍNICO ACTIVO:
- Nombre: Hipócrates
- ID: ${currentCase.id} (${currentCase.code})
- Diagnóstico diana (SECRETO PARA EL ESTUDIANTE): ${currentCase.targetDiagnosis}
- Motivo de consulta: ${currentCase.chiefComplaint}
- Antecedentes (SOLO si pregunta): ${JSON.stringify(currentCase.history)}
- Síntomas actuales: ${JSON.stringify(currentCase.currentSymptoms)}
- Signos vitales actuales: ${JSON.stringify(currentVitals || currentCase.initialVitals)}
- Examen físico (si lo solicitan): ${JSON.stringify(currentCase.physicalExam)}
- Estado actual de simulación: ${currentStage}
- Acciones administradas previamente: ${JSON.stringify(administeredActions)}

IMPORTANTE: Devuelve tu respuesta en formato JSON con la siguiente estructura exacta:
{
  "reply": "Tu respuesta como paciente Hipócrates en 1ª persona, o la respuesta de secretismo sobre órdenes, o los hallazgos entre asteriscos si es examen físico",
  "isPhysicalExam": boolean,
  "isLabResult": boolean,
  "isTreatment": boolean,
  "vitalUpdates": { "bpSystolic": number, "bpDiastolic": number, "heartRate": number, "painScore": number, "oxygenSat": number },
  "stageUpdate": "initial" | "improving" | "worsened" | "resolved" | "critical",
  "actionDetected": string (opcional),
  "evaluationFeedback": { "isPositive": boolean, "title": "título breve", "description": "explicación clínica" } (opcional)
}
`;

        // Format recent history for context
        const formattedHistory = history.slice(-6).map((h: { sender: string; text: string }) => ({
          role: h.sender === 'student' ? 'user' : 'model',
          parts: [{ text: h.text }],
        }));

        formattedHistory.push({
          role: 'user',
          parts: [{ text: trimmedMsg }],
        });

        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedHistory,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        // 3.8s timeout race
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini timeout')), 3800)
        );

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);
        const rawText = response.text || '';
        try {
          const parsed = JSON.parse(rawText.trim());
          return res.json(parsed);
        } catch {
          return res.json({
            reply: rawText,
            isPhysicalExam: rawText.includes('*'),
            isLabResult: false,
            isTreatment: false,
          });
        }
      } catch (geminiError) {
        // Fallback to deterministic expert engine seamlessly
      }
    }

    // Deterministic Rule Fallback (100% reliable)
    const result = processStudentInteraction(
      trimmedMsg,
      currentCase,
      currentVitals || currentCase.initialVitals,
      currentStage,
      administeredActions
    );

    return res.json(result);
  } catch (error) {
    console.error('Error handling chat:', error);
    return res.status(500).json({ error: 'Error interno en la simulación' });
  }
});

// POST /api/create-case - Dedicated AI Case Structuring endpoint for teachers/creators
app.post('/api/create-case', async (req: Request, res: Response) => {
  try {
    const { rawNotes } = req.body;

    if (!rawNotes || typeof rawNotes !== 'string') {
      return res.status(400).json({ error: 'Notas clínicas requeridas' });
    }

    if (ai) {
      try {
        const structuringPrompt = `
Eres el "Asistente de Estructuración de Datos Médicos" de Hipócrates.
A partir de las siguientes notas o apuntes clínicos desestructurados, genera un objeto JSON válido que cumpla con la interfaz TypeScript ClinicalCase:

{
  "id": "caso_custom_${Date.now()}",
  "code": "Caso Docente",
  "patientName": "Hipócrates",
  "title": "Título Clínico Conciso",
  "gender": "masculino" | "femenino",
  "age": number,
  "colorTheme": "blue" | "pink" | "yellow",
  "chiefComplaint": "Motivo de consulta principal",
  "history": {
    "hypertension": "...",
    "smoking": "...",
    "allergies": "...",
    "medications": "...",
    "pastSurgeries": "...",
    "familyHistory": "...",
    "otherAntecedents": "..."
  },
  "currentSymptoms": {
    "painLocation": "...",
    "painQuality": "...",
    "painIrradiation": "...",
    "painIntensity": number (0-10),
    "associatedSymptoms": string[],
    "onset": "...",
    "dyspneaLevel": "none" | "mild" | "moderate" | "severe"
  },
  "initialVitals": {
    "bpSystolic": number,
    "bpDiastolic": number,
    "heartRate": number,
    "respRate": number,
    "oxygenSat": number,
    "temperature": number,
    "painScore": number
  },
  "physicalExam": {
    "general": "*...*",
    "cardiac": "*...*",
    "pulmonary": "*...*",
    "skin": "*...*",
    "abdomen": "*...*",
    "extremities": "*...*",
    "neckVessels": "*...*",
    "neurological": "*...*"
  },
  "complementaryStudies": {
    "ecg": { "rhythm": "...", "summary": "...", "stElevationLeads": [], "stElevationMm": 0, "detailedDescription": "..." },
    "troponins": "*...*",
    "cpkCkmb": "*...*",
    "hemogram": "*...*",
    "biochemistry": "*...*",
    "coagulation": "*...*",
    "chestXray": "*...*",
    "arterialBloodGas": "*...*",
    "otherDefault": "*...*"
  },
  "ordenes_disponibles": {
    "estudios": [
      {
        "id": "string",
        "keywords": string[],
        "department": "Laboratorio central" | "Radiología & Imagen" | "Cardiología" | "Enfermería de Urgencias" | "Farmacia Hospitalaria",
        "tipo": "valores" | "imagen" | "examen_fisico" | "tratamiento" | "rechazado",
        "titulo": "string",
        "reporte": "string",
        "valores": { "parametro": "valor" },
        "costo_puntos": number,
        "tiempo_espera_min": number,
        "es_pertinente": boolean
      }
    ]
  },
  "targetDiagnosis": "Diagnóstico diana",
  "expectedActions": [
    {
      "id": "action_1",
      "name": "Acción terapéutica o de estudio",
      "category": "monitoring" | "oxygen" | "antiplatelet" | "anticoagulation" | "antiischemic" | "reperfusion" | "fluid",
      "isCorrect": true,
      "isMandatory": true,
      "doseDescription": "...",
      "rationale": "...",
      "vitalImpact": {}
    }
  ],
  "contraindicatedActions": [
    {
      "id": "contra_1",
      "name": "Acción contraindicada",
      "harmRationale": "...",
      "vitalPenalty": { "heartRate": 120 }
    }
  ],
  "debriefNotes": {
    "clinicalPearl": "Perla clínica docente",
    "guidelineReference": "Guía de referencia",
    "keyPitfalls": ["Error frecuente 1", "Error frecuente 2"]
  }
}

Retorna ÚNICAMENTE el JSON válido sin delimitadores de código markdown adicionales.

NOTAS DEL USUARIO:
${rawNotes}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: structuringPrompt }] }],
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const jsonText = response.text || '';
        const parsed = JSON.parse(jsonText.trim());
        return res.json({ clinicalCase: parsed, jsonCode: JSON.stringify(parsed, null, 2) });
      } catch (geminiErr) {
        console.warn('Gemini case creation error:', geminiErr);
      }
    }

    return res.status(503).json({ error: 'Servicio de IA temporalmente no disponible' });
  } catch (error) {
    console.error('Error creating case:', error);
    return res.status(500).json({ error: 'Error al estructurar el caso' });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    geminiActive: !!ai,
    timestamp: new Date().toISOString(),
  });
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RoboDoc Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
