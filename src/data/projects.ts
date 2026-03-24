export interface Project {
  title: string
  description: string
  longDescription: string
  stack: string[]
  demoUrl: string
  githubUrl: string
  featured?: boolean
  metrics?: string
}

export const projects: Project[] = [
  {
    title: 'TaskFlow',
    description: 'Gestion de projets en temps réel',
    longDescription:
      "Application complète de gestion de projets avec collaboration d'équipe en temps réel. Architecture microservices et WebSocket pour des mises à jour instantanées. Dashboard analytique et système de notifications intelligent.",
    stack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Docker', 'Redis'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    metrics: '10k+ utilisateurs actifs',
  },
  {
    title: 'E-Commerce Platform',
    description: 'API REST haute performance',
    longDescription:
      'API complète pour plateforme e-commerce avec gestion des stocks en temps réel, intégration Stripe, et système de recommandations ML.',
    stack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Stripe'],
    demoUrl: '#',
    githubUrl: '#',
    metrics: '500k requêtes/jour',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Visualisation de données interactive',
    longDescription:
      'Tableau de bord avec graphiques dynamiques D3.js, exports automatisés et alertes personnalisables.',
    stack: ['Next.js', 'TypeScript', 'D3.js', 'Tailwind'],
    demoUrl: '#',
    githubUrl: '#',
    metrics: '99.9% uptime',
  },
  {
    title: 'Auth Service',
    description: 'Authentification entreprise',
    longDescription:
      "Service OAuth2 avec SSO, gestion de sessions, audit logs et conformité RGPD pour applications entreprise.",
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'JWT'],
    demoUrl: '#',
    githubUrl: '#',
    metrics: '2M+ auth/mois',
  },
]
