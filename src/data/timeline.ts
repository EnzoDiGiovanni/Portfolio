export interface TimelineItem {
  type: "work" | "education";
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
}

export const timeline: TimelineItem[] = [
  {
    type: "work",
    title: "Développeur Full-Stack",
    organization: "Novius",
    location: "Lyon, France",
    period: "2025 - Présent",
    description: "Développeur Full Stack en alternance",
    achievements: [
      "Résolution de bug",
      "Ajout de nouvelles features",
      "Intervention sur des projets existants en fonction de la demande des chefs de projets",
    ],
  },
  {
    type: "work",
    title: "Développeur Full Stack",
    organization: "JR Web Concept",
    location: "Lyon, France",
    period: "Mai - Juin 2025",
    description: "Création d'application web complète en Laravel + VueJs",
    achievements: [
      "Mise en ligne du projet Speed Dating",
      "Autonomie complète sur la gestion de mes tâches",
    ],
  },
  {
    type: "education",
    title: "Bachelor Cycle web & Multimédia",
    organization: "MyDigitalSchool",
    location: "Lyon, France",
    period: "2023 - présent",
    description: "Spécialisation en développement web.",
    achievements: [
      "Apprentissage de l'algorithme et des concepts avancés",
      "Projet concret principalement en Laravel",
    ],
  },
];
