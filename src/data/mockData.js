export const mockTexts = [
  {
    id: 1,
    title: "Code de la famille",
    type: "code",
    category: "Droit civil",
    date: "2023-01-15",
    status: "En vigueur",
    summary: "Régit les relations familiales, le mariage, le divorce et la filiation au Sénégal",
    content: `TITRE PREMIER - DU MARIAGE

CHAPITRE PREMIER - DES CONDITIONS DE FOND

Article 1 - Le mariage est l'union légitime de l'homme et de la femme basée sur un contrat conclu conformément aux conditions de fond et de forme déterminées par la présente loi.

Article 2 - Il ne peut y avoir mariage sans le consentement libre et définitif des deux époux.

Article 3 - L'âge minimum pour contracter mariage est fixé à dix-huit ans pour l'homme et la femme. Cependant, le président du tribunal départemental peut, pour des motifs graves, accorder des dispenses d'âge.`,
    views: 1250,
    language: "français",
    lastUpdated: "2023-01-15",
    author: "Assemblée Nationale du Sénégal",
    source: "Journal Officiel n° 6789",
    tags: ["famille", "mariage", "divorce", "filiation"]
  },
  {
    id: 2,
    title: "Loi sur la protection des données personnelles",
    type: "loi",
    category: "Droit numérique",
    date: "2023-05-20",
    status: "En vigueur",
    summary: "Loi relative à la protection des données à caractère personnel",
    content: `CHAPITRE PREMIER - DISPOSITIONS GÉNÉRALES

Article 1 - La présente loi a pour objet de protéger les données à caractère personnel ainsi que les droits et libertés fondamentaux des personnes physiques, notamment le droit à la vie privée, à l'égard du traitement des données à caractère personnel.

Article 2 - Au sens de la présente loi, on entend par :
- données à caractère personnel : toute information se rapportant à une personne physique identifiée ou identifiable ;
- traitement : toute opération ou ensemble d'opérations portant sur des données à caractère personnel.`,
    views: 890,
    language: "français",
    lastUpdated: "2023-05-20",
    author: "Assemblée Nationale du Sénégal",
    source: "Journal Officiel n° 6890",
    tags: ["données personnelles", "vie privée", "numérique", "RGPD"]
  },
  {
    id: 3,
    title: "Décret d'application du code du travail",
    type: "décret",
    category: "Droit du travail",
    date: "2023-03-10",
    status: "En vigueur",
    summary: "Décret précisant les modalités d'application du code du travail",
    content: `TITRE PREMIER - DU CONTRAT DE TRAVAIL

CHAPITRE PREMIER - DISPOSITIONS GÉNÉRALES

Article 1 - Le présent décret précise les modalités d'application de certaines dispositions du code du travail, notamment en matière de :
- conclusion et exécution du contrat de travail ;
- durée du travail et repos ;
- congés et permissions ;
- santé et sécurité au travail.

Article 2 - Tout contrat de travail doit faire l'objet d'un écrit lorsque sa durée est supérieure à un mois.`,
    views: 2100,
    language: "français",
    lastUpdated: "2023-03-10",
    author: "Président de la République",
    source: "Journal Officiel n° 6823",
    tags: ["travail", "contrat", "salaire", "congés"]
  }
];

export const categories = [
  "Droit civil",
  "Droit pénal", 
  "Droit du travail",
  "Droit commercial",
  "Droit administratif",
  "Droit numérique",
  "Droit foncier",
  "Droit fiscal",
  "Droit de l'environnement",
  "Droit de la santé"
];

export const textTypes = [
  { value: "code", label: "Code", icon: "BookOpen" },
  { value: "loi", label: "Loi", icon: "Gavel" },
  { value: "décret", label: "Décret", icon: "FileText" },
  { value: "arrêté", label: "Arrêté", icon: "File" },
  { value: "circulaire", label: "Circulaire", icon: "MessageCircle" },
  { value: "jurisprudence", label: "Jurisprudence", icon: "Scale" }
];

export const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'wo', name: 'Wolof', flag: '🇸🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export const glossaryTerms = [
  {
    term: "Jurisprudence",
    definition: "Ensemble des décisions rendues par les tribunaux et qui constituent une source d'interprétation du droit."
  },
  {
    term: "Décret",
    definition: "Acte réglementaire signé par le Président de la République ou le Premier ministre."
  },
  {
    term: "Arrêté",
    definition: "Décision administrative prise par un ministre ou une autorité administrative."
  }
];