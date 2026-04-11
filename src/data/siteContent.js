export const siteContent = {
  brand: {
    name: 'Centro de Patología del Sur',
    tagline: 'Diagnóstico e Investigación',
    logoAlt: 'Logo Centro de Patología del Sur',
  },

  navigation: {
    whatsappUrl: 'https://wa.link/qwelfv',
    items: [
      { id: 'inicio', label: 'Inicio', href: '#inicio' },
      { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
      { id: 'servicios', label: 'Servicios', href: '#servicios' },
      { id: 'puntos-de-recojo', label: 'Puntos de recojo', href: '#puntos-de-recojo' },
      { id: 'resultados', label: 'Resultados', href: '#resultados' },
      { id: 'contacto', label: 'Contacto', href: '#contacto' },
    ],
  },

  hero: {
    eyebrow: 'Diagnóstico anatomopatológico especializado',
    title: 'Precisión diagnóstica con respaldo profesional y atención especializada',
    subtitle:
      'Brindamos análisis de biopsias, citologías y estudios complementarios para médicos, clínicas, centros de salud y pacientes que requieren resultados confiables y oportunos.',
    support:
      'Centro de Patología del Sur combina experiencia profesional, rigor técnico y comunicación directa para contribuir a mejores decisiones clínicas.',
    highlights: [
      'Resultados confiables',
      'Atención especializada',
      'Coordinación de muestras',
    ],
    floatingPanels: [
      { label: 'Precisión técnica', sub: 'Protocolos rigurosos' },
      { label: 'Confianza clínica', sub: 'Informes útiles' },
      { label: 'Resultados oportunos', sub: 'Coordinación ágil' },
    ],
    ctaPrimary: { label: 'Contactar por WhatsApp', href: 'https://wa.link/qwelfv' },
    ctaSecondary: { label: 'Consultar resultados', href: '#resultados' },
    mainImageAlt:
      'Centro de Patología del Sur — diagnóstico e investigación anatomopatológica',
  },

  trustItems: [
    { label: 'Diagnóstico especializado' },
    { label: 'Enfoque clínico' },
    { label: 'Atención oportuna' },
    { label: 'Coordinación logística' },
  ],

  about: {
    badge: 'Institución',
    title: 'Quiénes somos',
    primary:
      'Somos un centro especializado en diagnóstico e investigación anatomopatológica, enfocado en ofrecer informes precisos, oportunos y clínicamente útiles para médicos, clínicas y centros de salud.',
    secondary:
      'Combinamos experiencia profesional, precisión técnica y comunicación directa con el médico tratante para contribuir a una mejor toma de decisiones clínicas.',
    panels: [
      {
        icon: 'microscope',
        title: 'Especialización',
        text: 'Anatomía patológica con criterio clínico.',
      },
      {
        icon: 'shield',
        title: 'Rigor',
        text: 'Procesos técnicos y trazabilidad del estudio.',
      },
      {
        icon: 'message',
        title: 'Comunicación',
        text: 'Canal directo con el médico tratante.',
      },
    ],
  },

  doctor: {
    badge: 'Credenciales',
    title: 'Dirección médica responsable',
    name: 'Jenny Gabriela Fernandez Sivincha',
    cmp: '089544',
    rne: '053649',
    status: 'Hábil',
    description:
      'Responsabilidad profesional y criterio clínico al servicio de cada diagnóstico.',
  },

  services: {
    badge: 'Portafolio',
    title: 'Servicios especializados',
    subtitle:
      'Soluciones diagnósticas y apoyo técnico para médicos, clínicas y centros de salud.',
    items: [
      {
        icon: 'microscope',
        title: 'Diagnóstico histopatológico',
        description:
          'Análisis de biopsias y piezas quirúrgicas con informes especializados.',
      },
      {
        icon: 'flask',
        title: 'Citopatología',
        description:
          'Evaluación de Papanicolaou y otras citologías con interpretación precisa.',
      },
      {
        icon: 'layers',
        title: 'Procesamiento de muestras para terceros',
        description: 'Preparación técnica integral de muestras y láminas.',
      },
      {
        icon: 'testTube',
        title: 'Estudios complementarios',
        description: 'Histoquímica, inmunohistoquímica y apoyo molecular.',
      },
      {
        icon: 'fileSearch',
        title: 'Segunda opinión diagnóstica',
        description: 'Revisión de láminas y bloques para casos complejos.',
      },
      {
        icon: 'truck',
        title: 'Recolección y coordinación de muestras',
        description:
          'Apoyo logístico para facilitar el envío desde consultorios y clínicas.',
      },
    ],
  },

  benefits: {
    badge: 'Ventajas',
    title: 'Por qué confiar en nosotros',
    items: [
      'Diagnósticos precisos y confiables',
      'Resultados oportunos',
      'Comunicación directa con el especialista',
      'Atención profesional y especializada',
      'Proceso ágil para coordinación de muestras',
      'Confidencialidad y responsabilidad médica',
    ],
  },

  pickupPoints: {
    badge: 'Logística',
    title: 'Puntos de recojo y coordinación',
    subtitle:
      'Facilitamos la recepción y coordinación de muestras desde distintos puntos estratégicos en Arequipa.',
    whatsappUrl: 'https://wa.link/qwelfv',
    points: [
      {
        title: 'Punto de recojo 1',
        address: 'Av. Arequipa 1116',
        district: 'Alto Selva Alegre',
        mapUrl:
          'https://www.google.com/maps/search/?api=1&query=Av.+Arequipa+1116+Alto+Selva+Alegre+Arequipa',
      },
      {
        title: 'Punto de recojo 2',
        address: 'Urbanización Los Rosales Mz A Lt 4',
        district: 'Cercado',
        mapUrl:
          'https://www.google.com/maps/search/?api=1&query=Urbanizacion+Los+Rosales+Mz+A+Lt+4+Cercado+Arequipa',
      },
      {
        title: 'Punto de recojo 3',
        address: 'Av. Ejército 101',
        district: 'Arequipa',
        mapUrl:
          'https://www.google.com/maps/search/?api=1&query=Av.+Ejercito+101+Arequipa',
      },
    ],
  },

  results: {
    badge: 'Portal seguro',
    title: 'Consulta tus resultados',
    subtitle:
      'Ingresa tu DNI, código de análisis y validación de seguridad para acceder a tus resultados.',
    securityNote:
      'Tus datos se procesan de manera segura para proteger tu información.',
    captchaLabel: 'Verificación de seguridad',
    captchaPlaceholder: 'Área reservada para reCAPTCHA o Turnstile',
    submitLabel: 'Consultar resultados',
    sidebar: [
      { title: 'Acceso seguro', text: 'Canal institucional para consulta de informes.' },
      { title: 'Validación de identidad', text: 'Comprobación de datos antes del acceso.' },
      { title: 'Consulta rápida', text: 'Interfaz clara para revisar su estado.' },
    ],
    fields: {
      dni: { label: 'DNI', placeholder: 'Ej. 12345678' },
      code: { label: 'Código de análisis', placeholder: 'Ingrese el código indicado en su orden' },
    },
  },

  contact: {
    badge: 'Atención',
    title: 'Coordina tu atención o envío de muestras',
    text: 'Contáctanos por WhatsApp para resolver consultas, coordinar recolección de muestras o solicitar información sobre nuestros servicios.',
    ctaPrimary: { label: 'Contactar por WhatsApp', href: 'https://wa.link/qwelfv' },
    ctaSecondary: { label: 'Ir a consulta de resultados', href: '#resultados' },
  },

  footer: {
    brandLine: 'Centro de Patología del Sur',
    tagline: 'Diagnóstico e Investigación',
    doctorName: 'Jenny Gabriela Fernandez Sivincha',
    cmp: '089544',
    rne: '053649',
    whatsappUrl: 'https://wa.link/qwelfv',
    rights: '© {year} Centro de Patología del Sur. Todos los derechos reservados.',
  },
}
