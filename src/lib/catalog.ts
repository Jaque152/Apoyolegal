export type Service = {
  slug: string;
  name: string;
  price: number;
  category: CategorySlug;
  summary: string;
  detail: string;
  deliverables: string[];
  turnaround: string;
  unit?: string;
};

export type CategorySlug =
  | "cumplimiento"
  | "traduccion-legalizacion"
  | "seguimiento-tramites";

export type Category = {
  slug: CategorySlug;
  index: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
};

export const IVA_RATE = 0.16;

export const categories: Category[] = [
  {
    slug: "cumplimiento",
    index: "01",
    name: "Cumplimiento y documentación regulatoria",
    shortName: "Cumplimiento",
    tagline: "KYC, AML, onboarding y expedientes corporativos",
    description:
      "Preparamos, revisamos y ordenamos el expediente que bancos, adquirentes y plataformas financieras te van a pedir. Menos rechazos, menos rondas de observaciones, un proceso que avanza.",
    image: "https://ext.same-assets.com/2120516770/3575811939.jpeg",
  },
  {
    slug: "traduccion-legalizacion",
    index: "02",
    name: "Traducción y legalización de documentos",
    shortName: "Traducción y apostilla",
    tagline: "Traducción certificada, notarización y apostilla",
    description:
      "Gestionamos la ruta completa de un documento que debe surtir efectos fuera de su jurisdicción: traducción por perito, fe notarial y apostilla ante la autoridad correspondiente.",
    image: "https://ext.same-assets.com/2120516770/2407044670.jpeg",
  },
  {
    slug: "seguimiento-tramites",
    index: "03",
    name: "Seguimiento y control de trámites",
    shortName: "Gestión de trámites",
    tagline: "Ventanilla, citas, reportes y acompañamiento",
    description:
      "Somos tu enlace operativo frente a dependencias, notarías y contrapartes. Tú recibes reportes claros; nosotros hacemos las filas, las llamadas y el seguimiento.",
    image: "https://ext.same-assets.com/2120516770/3183934486.jpeg",
  },
];

export const services: Service[] = [
  // ---------- 01 Cumplimiento ----------
  {
    slug: "verificacion-de-identidad",
    name: "Verificación y autenticación de identidad",
    price: 800,
    category: "cumplimiento",
    unit: "por persona física o moral",
    summary:
      "Cotejo documental de identidad para personas físicas y morales, con constancia de verificación.",
    detail:
      "Revisamos identificaciones, comprobantes y actas contra fuentes oficiales para confirmar que la persona física o moral es quien dice ser. Entregamos una constancia de verificación que puedes anexar a tu expediente KYC.",
    deliverables: [
      "Cotejo de identificación oficial y comprobante de domicilio",
      "Validación de datos registrales de la persona moral",
      "Constancia de verificación en PDF",
    ],
    turnaround: "2 a 3 días hábiles",
  },
  {
    slug: "revision-documentos-kyc-aml",
    name: "Revisión de documentos para KYC / AML",
    price: 1500,
    category: "cumplimiento",
    summary:
      "Auditoría previa de tu expediente antes de enviarlo a la institución financiera.",
    detail:
      "Revisamos documento por documento contra los criterios que suelen aplicar bancos y plataformas: vigencias, congruencia de datos, firmas, legibilidad y formatos. Te devolvemos una lista de hallazgos priorizada por riesgo de rechazo.",
    deliverables: [
      "Revisión de hasta 20 documentos",
      "Matriz de hallazgos con nivel de riesgo",
      "Recomendaciones de corrección por documento",
    ],
    turnaround: "3 días hábiles",
  },
  {
    slug: "paquete-onboarding-financiero",
    name: "Organización de paquete documental para onboarding",
    price: 2100,
    category: "cumplimiento",
    summary:
      "Armado del expediente completo, indexado y listo para enviar a un onboarding financiero.",
    detail:
      "Integramos, nombramos y ordenamos todos los archivos según la estructura que pide la contraparte. Incluye índice, control de versiones y carpeta compartida lista para entrega.",
    deliverables: [
      "Expediente indexado y nombrado bajo estándar",
      "Índice de contenido y control de versiones",
      "Carpeta digital lista para envío",
    ],
    turnaround: "4 días hábiles",
  },
  {
    slug: "source-of-funds-wealth",
    name: "Asistencia para source of funds / source of wealth",
    price: 2500,
    category: "cumplimiento",
    summary:
      "Construcción de la narrativa y el soporte documental del origen de recursos.",
    detail:
      "Estructuramos la evidencia del origen de los recursos y del patrimonio: trazabilidad, respaldo contable y una carta explicativa coherente con los documentos que la acompañan.",
    deliverables: [
      "Carta explicativa de origen de recursos",
      "Mapa de trazabilidad de fondos",
      "Anexos documentales referenciados",
    ],
    turnaround: "5 días hábiles",
  },
  {
    slug: "checklist-regulatorio-plataformas",
    name: "Checklist de cumplimiento para nuevas plataformas",
    price: 3000,
    category: "cumplimiento",
    summary:
      "Diagnóstico de requisitos regulatorios y documentales para lanzar tu operación.",
    detail:
      "Levantamos el modelo de negocio y devolvemos el listado de obligaciones, documentos y controles que necesitas cubrir antes de abrir operaciones o integrar un proveedor de pagos.",
    deliverables: [
      "Sesión de levantamiento de 60 minutos",
      "Checklist regulatorio priorizado",
      "Ruta crítica con tiempos estimados",
    ],
    turnaround: "5 a 7 días hábiles",
  },
  {
    slug: "coordinacion-auditores-compliance",
    name: "Coordinación con auditores o firmas de compliance",
    price: 3500,
    category: "cumplimiento",
    summary:
      "Interlocución y atención de requerimientos con auditores externos.",
    detail:
      "Atendemos los requerimientos de información de tu auditor o firma de compliance externa: recopilamos, ordenamos y respondemos en tiempo, con bitácora de cada solicitud.",
    deliverables: [
      "Punto único de contacto con el auditor",
      "Bitácora de requerimientos y respuestas",
      "Entrega de evidencia en formato solicitado",
    ],
    turnaround: "Según calendario de auditoría",
  },
  {
    slug: "doble-paquete-onboarding",
    name: "Organización de dos paquetes de onboarding",
    price: 4000,
    category: "cumplimiento",
    summary:
      "Dos expedientes completos para procesos paralelos ante distintas instituciones.",
    detail:
      "Cuando abres dos frentes al mismo tiempo, cada institución pide su propio formato. Armamos ambos expedientes en paralelo y mantenemos la consistencia entre versiones.",
    deliverables: [
      "Dos expedientes indexados y completos",
      "Control de consistencia entre paquetes",
      "Índices independientes por institución",
    ],
    turnaround: "6 días hábiles",
  },
  {
    slug: "apertura-cuenta-corporativa",
    name: "Preparación documental para apertura de cuenta corporativa",
    price: 5000,
    category: "cumplimiento",
    summary:
      "Todo el paquete corporativo que la banca solicita para abrir cuenta empresarial.",
    detail:
      "Acta constitutiva, poderes, estructura accionaria, identificaciones de beneficiarios y comprobantes: reunimos, cotejamos y presentamos el expediente en el formato del banco.",
    deliverables: [
      "Expediente corporativo completo",
      "Cuadro de estructura accionaria y beneficiario controlador",
      "Acompañamiento en la primera ronda de observaciones",
    ],
    turnaround: "7 a 10 días hábiles",
  },
  {
    slug: "soporte-integraciones-de-pago",
    name: "Soporte documental para integraciones de pago",
    price: 6000,
    category: "cumplimiento",
    summary:
      "Documentación para aprobación con adquirentes, PSPs y pasarelas de pago.",
    detail:
      "Preparamos el paquete que revisan los equipos de riesgo de los proveedores de pago: modelo de negocio, flujo de fondos, políticas, contratos y evidencia de cumplimiento.",
    deliverables: [
      "Descripción de modelo de negocio y flujo de fondos",
      "Paquete de políticas y contratos requeridos",
      "Atención de observaciones del equipo de riesgo",
    ],
    turnaround: "8 días hábiles",
  },
  {
    slug: "politicas-internas-kyc-aml",
    name: "Creación o actualización de políticas internas KYC / AML",
    price: 8000,
    category: "cumplimiento",
    summary:
      "Manual de políticas y procedimientos redactado a la medida de tu operación.",
    detail:
      "Redactamos o actualizamos tu manual de prevención: criterios de aceptación de clientes, matriz de riesgo, monitoreo, reportes y régimen de resguardo documental.",
    deliverables: [
      "Manual de políticas y procedimientos",
      "Matriz de riesgo por tipo de cliente",
      "Formatos operativos y bitácoras",
    ],
    turnaround: "10 a 15 días hábiles",
  },
  {
    slug: "auditoria-interna-documental",
    name: "Auditoría interna de cumplimiento documental",
    price: 10000,
    category: "cumplimiento",
    summary:
      "Revisión integral de expedientes y controles con plan de remediación.",
    detail:
      "Auditamos una muestra representativa de tus expedientes y controles internos, identificamos brechas y entregamos un plan de remediación con responsables y fechas.",
    deliverables: [
      "Informe de auditoría con hallazgos",
      "Plan de remediación con prioridades",
      "Sesión de presentación de resultados",
    ],
    turnaround: "15 días hábiles",
  },

  // ---------- 02 Traducción y legalización ----------
  {
    slug: "traduccion-cedula-o-titulo",
    name: "Traducción certificada de cédula o título",
    price: 550,
    category: "traduccion-legalizacion",
    unit: "por documento",
    summary:
      "Traducción por perito traductor de títulos, cédulas y constancias académicas.",
    detail:
      "Traducción realizada por perito autorizado, con sello y firma, lista para presentarse ante autoridades y empleadores dentro y fuera de México.",
    deliverables: [
      "Traducción impresa con sello y firma de perito",
      "Versión digital en PDF",
    ],
    turnaround: "3 días hábiles",
  },
  {
    slug: "traduccion-certificada-por-pagina",
    name: "Traducción certificada por página",
    price: 800,
    category: "traduccion-legalizacion",
    unit: "por página",
    summary:
      "Traducción oficial por cuartilla para documentos de cualquier naturaleza.",
    detail:
      "Tarifa por página para actas, estados de cuenta, resoluciones o cualquier documento que requiera traducción con validez oficial. Respetamos formato, tablas y sellos del original.",
    deliverables: [
      "Traducción certificada por cuartilla",
      "Formato espejo del documento original",
      "Entrega física y digital",
    ],
    turnaround: "2 a 4 días hábiles",
  },
  {
    slug: "notarizacion-de-traduccion",
    name: "Notarización de traducción",
    price: 2100,
    category: "traduccion-legalizacion",
    summary:
      "Ratificación de firma del perito traductor ante notario público.",
    detail:
      "Coordinamos la comparecencia y la ratificación de firma ante notario para que la traducción tenga fe pública, requisito frecuente para apostillar o presentar en el extranjero.",
    deliverables: [
      "Ratificación de firma ante notario",
      "Testimonio o certificación notarial",
      "Gestión de cita y entrega",
    ],
    turnaround: "5 días hábiles",
  },
  {
    slug: "gestion-de-apostilla",
    name: "Gestión de apostilla oficial",
    price: 4220,
    category: "traduccion-legalizacion",
    unit: "CDMX y otros estados",
    summary:
      "Trámite completo de apostilla ante la autoridad estatal correspondiente.",
    detail:
      "Nos encargamos del trámite de apostilla de principio a fin: revisión de procedencia, pago de derechos, presentación en ventanilla y recolección del documento apostillado.",
    deliverables: [
      "Revisión de procedencia del documento",
      "Pago de derechos y presentación en ventanilla",
      "Documento apostillado entregado",
    ],
    turnaround: "7 a 12 días hábiles",
  },
  {
    slug: "traduccion-jurada-contratos",
    name: "Traducción jurada de contratos",
    price: 6500,
    category: "traduccion-legalizacion",
    summary:
      "Traducción de instrumentos contractuales con revisión de terminología jurídica.",
    detail:
      "Traducción de contratos, convenios y anexos con doble revisión: lingüística y jurídica, para conservar el sentido exacto de cláusulas, definiciones y obligaciones.",
    deliverables: [
      "Traducción certificada del contrato completo",
      "Glosario de términos clave",
      "Revisión jurídica de consistencia",
    ],
    turnaround: "8 días hábiles",
  },
  {
    slug: "traduccion-mas-apostilla-integral",
    name: "Gestión integral: traducción + apostilla",
    price: 8900,
    category: "traduccion-legalizacion",
    summary:
      "Servicio de extremo a extremo: traducción, notarización y apostilla en un solo paquete.",
    detail:
      "La ruta completa coordinada por nosotros. Tú entregas el documento original una sola vez y recibes la versión traducida, notarizada y apostillada, lista para usarse en el extranjero.",
    deliverables: [
      "Traducción certificada",
      "Ratificación notarial",
      "Apostilla y entrega final",
    ],
    turnaround: "12 a 18 días hábiles",
  },

  // ---------- 03 Seguimiento de trámites ----------
  {
    slug: "pagos-de-derechos",
    name: "Cobranza y verificación de pagos de derechos",
    price: 1000,
    category: "seguimiento-tramites",
    summary:
      "Cálculo, pago y comprobación de derechos ante dependencias.",
    detail:
      "Determinamos la línea de captura correcta, realizamos el pago y verificamos su aplicación, para que ningún trámite se detenga por un comprobante mal referenciado.",
    deliverables: [
      "Generación de línea de captura",
      "Pago y comprobante validado",
      "Verificación de aplicación ante la dependencia",
    ],
    turnaround: "2 días hábiles",
  },
  {
    slug: "seguimiento-diario-semana",
    name: "Seguimiento diario de estatus",
    price: 1200,
    category: "seguimiento-tramites",
    unit: "por semana",
    summary:
      "Consulta diaria del avance de tu trámite con aviso inmediato de cambios.",
    detail:
      "Todos los días hábiles revisamos el estatus de tu expediente y te avisamos el mismo día si hay movimiento, observación o requerimiento por atender.",
    deliverables: [
      "Consulta diaria en días hábiles",
      "Aviso inmediato de cambios",
      "Resumen de la semana",
    ],
    turnaround: "Servicio semanal",
  },
  {
    slug: "consulta-estatus-observaciones",
    name: "Consulta de estatus y atención de observaciones",
    price: 1200,
    category: "seguimiento-tramites",
    summary:
      "Diagnóstico de por qué se detuvo tu trámite y cómo desbloquearlo.",
    detail:
      "Cuando un expediente se queda parado, averiguamos la causa real ante la ventanilla y te entregamos la instrucción concreta para levantar la observación.",
    deliverables: [
      "Consulta directa con la dependencia",
      "Diagnóstico de la observación",
      "Plan de desbloqueo paso a paso",
    ],
    turnaround: "3 días hábiles",
  },
  {
    slug: "gestion-de-citas",
    name: "Gestión de citas y programación de trámites",
    price: 1500,
    category: "seguimiento-tramites",
    summary:
      "Obtención y administración de citas en portales gubernamentales.",
    detail:
      "Monitoreamos la disponibilidad, agendamos la cita en el sitio y horario que te conviene y te enviamos el acuse con los requisitos que debes llevar.",
    deliverables: [
      "Cita confirmada con acuse",
      "Listado de requisitos para la cita",
      "Reprogramación incluida si se libera un espacio mejor",
    ],
    turnaround: "Según disponibilidad de la dependencia",
  },
  {
    slug: "reporte-semanal-avance",
    name: "Reporte semanal de avance",
    price: 1800,
    category: "seguimiento-tramites",
    summary: "Documento ejecutivo con el estado de cada trámite abierto.",
    detail:
      "Un PDF semanal con semáforo por trámite: qué avanzó, qué está detenido, qué depende de ti y cuál es el siguiente paso con fecha estimada.",
    deliverables: [
      "Reporte ejecutivo en PDF",
      "Semáforo de avance por trámite",
      "Siguientes pasos y responsables",
    ],
    turnaround: "Entrega cada viernes",
  },
  {
    slug: "alertas-y-notificaciones",
    name: "Alertas y notificaciones de cambios",
    price: 1800,
    category: "seguimiento-tramites",
    summary:
      "Avisos automáticos por correo o mensajería ante cualquier movimiento.",
    detail:
      "Configuramos el monitoreo de tus expedientes y disparamos una alerta en el momento en que cambia el estatus, se emite una resolución o aparece un requerimiento.",
    deliverables: [
      "Monitoreo configurado por expediente",
      "Alertas por correo y mensajería",
      "Historial de notificaciones",
    ],
    turnaround: "Activación en 24 horas",
  },
  {
    slug: "acompanamiento-presencial",
    name: "Acompañamiento presencial a oficinas de gobierno",
    price: 2000,
    category: "seguimiento-tramites",
    unit: "por visita",
    summary:
      "Un gestor te acompaña o te representa en ventanilla en la CDMX y zona metropolitana.",
    detail:
      "Vamos contigo o en tu representación: entregamos, recogemos, aclaramos y documentamos lo ocurrido en ventanilla con acuse y evidencia fotográfica.",
    deliverables: [
      "Visita presencial con gestor asignado",
      "Acuse de recepción o entrega",
      "Reporte de la visita el mismo día",
    ],
    turnaround: "Agenda con 48 horas de anticipación",
  },
  {
    slug: "coordinacion-notarios-terceros",
    name: "Coordinación con notarios y terceras partes",
    price: 2000,
    category: "seguimiento-tramites",
    summary:
      "Logística de firmas, entregas y comparecencias entre varias partes.",
    detail:
      "Coordinamos agendas, sedes y documentación entre notaría, firmantes y contrapartes para que la firma ocurra una sola vez y salga bien.",
    deliverables: [
      "Coordinación de agenda entre las partes",
      "Verificación previa de documentos de firma",
      "Confirmación de entrega de instrumentos",
    ],
    turnaround: "5 días hábiles",
  },
  {
    slug: "comunicacion-con-dependencias",
    name: "Comunicación con dependencias públicas",
    price: 2500,
    category: "seguimiento-tramites",
    unit: "SEGOB, SRE, SAT y otras",
    summary:
      "Redacción y presentación de escritos, promociones y respuestas oficiales.",
    detail:
      "Redactamos, presentamos y damos seguimiento a escritos ante la autoridad, con control de plazos y resguardo de todos los acuses.",
    deliverables: [
      "Redacción del escrito o promoción",
      "Presentación con acuse sellado",
      "Seguimiento hasta la respuesta",
    ],
    turnaround: "Según plazos de la autoridad",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicesByCategory(slug: CategorySlug) {
  return services.filter((s) => s.category === slug);
}

export function formatMXN(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
