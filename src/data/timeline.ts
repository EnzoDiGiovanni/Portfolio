export interface TimelineItem {
  type: 'work' | 'education'
  title: string
  organization: string
  location: string
  period: string
  description: string
  achievements?: string[]
}

export const timeline: TimelineItem[] = [
  {
    type: 'work',
    title: 'Développeur Full-Stack Senior',
    organization: 'TechCorp',
    location: 'Paris, France',
    period: '2022 - Présent',
    description: "Lead technique sur des projets e-commerce à fort trafic.",
    achievements: [
      'Architecture microservices gérant 1M+ requêtes/jour',
      'Réduction de 40% du temps de chargement',
      "Management d'une équipe de 4 développeurs",
    ],
  },
  {
    type: 'work',
    title: 'Développeur Full-Stack',
    organization: 'StartupLab',
    location: 'Lyon, France',
    period: '2020 - 2022',
    description: 'Développement d\'applications SaaS B2B.',
    achievements: [
      'Conception et déploiement de 3 produits SaaS',
      'Implémentation de pipelines CI/CD',
      'Migration vers architecture cloud AWS',
    ],
  },
  {
    type: 'work',
    title: 'Développeur Front-end',
    organization: 'AgenceWeb',
    location: 'Marseille, France',
    period: '2018 - 2020',
    description: 'Création d\'interfaces pour clients grands comptes.',
    achievements: [
      'Migration React pour 5+ clients',
      'Mise en place de design systems',
      'Optimisation des performances web',
    ],
  },
  {
    type: 'education',
    title: 'Master Informatique',
    organization: 'Université Paris-Saclay',
    location: 'Paris, France',
    period: '2016 - 2018',
    description: 'Spécialisation en génie logiciel et systèmes distribués.',
    achievements: [
      'Mention Très Bien',
      "Projet de fin d'études sur le ML distribué",
      'Stage de recherche en optimisation',
    ],
  },
]
