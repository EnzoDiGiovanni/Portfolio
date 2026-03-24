<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Code2, Palette, Zap, RefreshCw } from 'lucide-vue-next'

const strengths = [
  {
    icon: Code2,
    title: 'Architecture Back-end',
    description: 'APIs robustes, microservices, bases de données optimisées',
  },
  {
    icon: Palette,
    title: 'Sensibilité UI/UX',
    description: 'Interfaces intuitives, accessibles et esthétiques',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: "Applications rapides, optimisées pour l'échelle",
  },
  {
    icon: RefreshCw,
    title: 'Code Maintenable',
    description: 'Clean code, tests, documentation',
  },
]

const favTechs = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS']

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
const cardVisibility = ref<boolean[]>(strengths.map(() => false))
const cardRefs = ref<(HTMLElement | null)[]>([])

let sectionObserver: IntersectionObserver | null = null
let cardObservers: IntersectionObserver[] = []

onMounted(() => {
  sectionObserver = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) isVisible.value = true },
    { threshold: 0.2 }
  )
  if (sectionRef.value) sectionObserver.observe(sectionRef.value)

  cardRefs.value.forEach((el, index) => {
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { cardVisibility.value[index] = true }, index * 100)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    cardObservers.push(obs)
  })
})

onUnmounted(() => {
  sectionObserver?.disconnect()
  cardObservers.forEach((o) => o.disconnect())
})
</script>

<template>
  <section id="about" ref="sectionRef" class="py-24 md:py-32 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[200px]" />

    <div class="max-w-[1200px] mx-auto px-6 relative">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left side - Text -->
        <div
          :class="[
            'transition-all duration-1000',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10',
          ]"
        >
          <span class="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-4">
            À propos
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
            Construire le web de
            <span class="text-primary"> demain</span>,
            aujourd'hui.
          </h2>

          <div class="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              <span class="text-foreground font-semibold">Développeur full-stack</span> avec plus de 5 ans d'expérience,
              je me spécialise dans la création d'applications web qui font la différence.
            </p>
            <p>
              Mon approche combine <span class="text-foreground">rigueur technique</span> et
              <span class="text-foreground"> sensibilité au design</span> pour livrer des produits
              qui répondent aux besoins réels des utilisateurs.
            </p>
            <p>
              Chaque ligne de code est une opportunité de résoudre des problèmes
              concrets avec élégance et efficacité.
            </p>
          </div>

          <!-- Tech tags -->
          <div class="mt-10 pt-8 border-t border-border">
            <p class="text-sm text-muted-foreground mb-4">Technologies favorites</p>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="tech in favTechs"
                :key="tech"
                class="px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-full hover:border-primary hover:text-primary transition-colors duration-200"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right side - Cards -->
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="(strength, index) in strengths"
            :key="strength.title"
            :ref="(el) => { cardRefs[index] = el as HTMLElement | null }"
            :class="[
              'group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-500',
              cardVisibility[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            ]"
          >
            <!-- Glow effect on hover -->
            <div class="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div class="relative">
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <component :is="strength.icon" class="w-6 h-6 text-primary" />
              </div>
              <h3 class="text-lg font-semibold text-foreground mb-2">{{ strength.title }}</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">{{ strength.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
