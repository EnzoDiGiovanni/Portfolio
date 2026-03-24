export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
  color: string
  borderColor: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Front-end',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'group-hover:border-blue-500/50',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 92 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Vue.js', level: 75 },
    ],
  },
  {
    title: 'Back-end',
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'group-hover:border-green-500/50',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 80 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'GraphQL', level: 78 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    color: 'from-orange-500/20 to-amber-500/20',
    borderColor: 'group-hover:border-orange-500/50',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'CI/CD', level: 88 },
      { name: 'Git', level: 95 },
      { name: 'Linux', level: 82 },
    ],
  },
]
