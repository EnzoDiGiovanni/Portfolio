export interface Skill {
  name: string;
  icon: string; // Iconify icon id
}

export interface SkillCategory {
  title: string;
  label: string;
  accentClass: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Front-end",
    label: "UI & Frameworks",
    accentClass: "text-blue-400",
    skills: [
      { name: "Vue.js", icon: "logos:vue" },
      { name: "Svelte", icon: "logos:svelte" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    ],
  },
  {
    title: "Back-end",
    label: "Serveurs & BDD",
    accentClass: "text-green-400",
    skills: [
      { name: "Php", icon: "logos:php" },
      { name: "Laravel", icon: "logos:laravel" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "MySql", icon: "logos:mysql" },
    ],
  },
  {
    title: "DevOps & Cloud",
    label: "Infrastructure",
    accentClass: "text-orange-400",
    skills: [
      { name: "Git", icon: "logos:git-icon" },
      { name: "GitHub", icon: "logos:github-icon" },
      { name: "Docker", icon: "logos:docker-icon" },
    ],
  },
];
