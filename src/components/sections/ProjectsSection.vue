<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import { projects } from '@/data/projects'

const featuredProject = computed(() => projects.find((p) => p.featured))
const otherProjects = computed(() => projects.filter((p) => !p.featured))

// Featured project visibility
const featuredVisible = ref(false)
const featuredRef = ref<HTMLElement | null>(null)

// Other project cards
const cardVisibility = ref<boolean[]>(otherProjects.value.map(() => false))
const cardHovered = ref<boolean[]>(otherProjects.value.map(() => false))
const cardRefs = ref<(HTMLElement | null)[]>([])

// Featured hover
const featuredHovered = ref(false)

let observers: IntersectionObserver[] = []

onMounted(() => {
  if (featuredRef.value) {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) featuredVisible.value = true },
      { threshold: 0.2 }
    )
    obs.observe(featuredRef.value)
    observers.push(obs)
  }

  cardRefs.value.forEach((el, index) => {
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { cardVisibility.value[index] = true }, index * 150)
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    observers.push(obs)
  })
})

onUnmounted(() => observers.forEach((o) => o.disconnect()))
</script>

<template>
  <section id="projects" class="py-24 md:py-32 relative">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/2 left-0 w-1/3 h-1/2 bg-primary/5 rounded-full blur-[200px]" />
    </div>

    <div class="max-w-[1200px] mx-auto px-6 relative">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
        <div>
          <span class="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Portfolio
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-foreground">Projets Sélectionnés</h2>
        </div>
        <p class="text-muted-foreground max-w-md mt-4 md:mt-0 md:text-right">
          Des applications conçues pour résoudre de vrais problèmes avec élégance et efficacité.
        </p>
      </div>

      <!-- Featured Project -->
      <div v-if="featuredProject" class="mb-8">
        <div
          ref="featuredRef"
          :class="[
            'relative group rounded-3xl overflow-hidden bg-card border border-border transition-all duration-700',
            featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
          ]"
          @mouseenter="featuredHovered = true"
          @mouseleave="featuredHovered = false"
        >
          <div class="grid lg:grid-cols-2 gap-0">
            <!-- Image side -->
            <div class="relative h-64 lg:h-auto overflow-hidden bg-gradient-to-br from-card to-background">
              <div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
              <div
                class="absolute inset-0 transition-transform duration-700 ease-out"
                :style="{ transform: featuredHovered ? 'scale(1.05)' : 'scale(1)' }"
              >
                <!-- Placeholder visual -->
                <div class="w-full h-full flex items-center justify-center">
                  <div class="relative">
                    <div class="w-48 h-32 rounded-lg bg-background border border-border shadow-2xl transform -rotate-6" />
                    <div class="absolute top-4 left-4 w-48 h-32 rounded-lg bg-card border border-border shadow-2xl transform rotate-3" />
                    <div class="absolute top-8 left-8 w-48 h-32 rounded-lg bg-primary/10 border border-primary/30 shadow-2xl" />
                  </div>
                </div>
              </div>
              <!-- Featured badge -->
              <div class="absolute top-6 left-6">
                <span class="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider">
                  Projet Vedette
                </span>
              </div>
            </div>

            <!-- Content side -->
            <div class="p-8 lg:p-12 flex flex-col justify-center">
              <div class="mb-4">
                <span v-if="featuredProject.metrics" class="text-sm text-primary font-medium">
                  {{ featuredProject.metrics }}
                </span>
              </div>
              <h3 class="text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {{ featuredProject.title }}
              </h3>
              <p class="text-muted-foreground text-lg leading-relaxed mb-6">
                {{ featuredProject.longDescription }}
              </p>
              <div class="flex flex-wrap gap-2 mb-8">
                <span
                  v-for="tech in featuredProject.stack"
                  :key="tech"
                  class="px-3 py-1.5 text-sm font-medium text-foreground bg-background border border-border rounded-full"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4">
                <AppButton href="#" variant="primary" class="group/btn">
                  Voir le projet
                  <ArrowUpRight class="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </AppButton>
                <AppButton href="#" variant="outline">
                  <Github class="mr-2 h-4 w-4" />
                  Code source
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Projects Grid -->
      <div class="grid md:grid-cols-3 gap-6">
        <article
          v-for="(project, index) in otherProjects"
          :key="project.title"
          :ref="(el) => { cardRefs[index] = el as HTMLElement | null }"
          :class="[
            'group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500',
            cardVisibility[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
          @mouseenter="cardHovered[index] = true"
          @mouseleave="cardHovered[index] = false"
        >
          <!-- Image placeholder -->
          <div class="relative h-48 overflow-hidden bg-gradient-to-br from-card to-background">
            <div class="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
            <div
              class="absolute inset-0 transition-transform duration-500"
              :style="{ transform: cardHovered[index] ? 'scale(1.1)' : 'scale(1)' }"
            >
              <div class="w-full h-full flex items-center justify-center">
                <div class="w-32 h-20 rounded-lg bg-primary/10 border border-primary/20 shadow-lg" />
              </div>
            </div>
            <!-- Quick actions on hover -->
            <div
              :class="[
                'absolute top-4 right-4 flex gap-2 z-20 transition-all duration-300',
                cardHovered[index] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
              ]"
            >
              <a
                :href="project.githubUrl"
                class="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-colors"
              >
                <Github class="h-4 w-4" />
              </a>
              <a
                :href="project.demoUrl"
                class="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-colors"
              >
                <ExternalLink class="h-4 w-4" />
              </a>
            </div>
          </div>

          <div class="p-6">
            <span v-if="project.metrics" class="text-xs text-primary font-medium mb-2 block">
              {{ project.metrics }}
            </span>
            <h3 class="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-muted-foreground text-sm mb-4 leading-relaxed">
              {{ project.longDescription }}
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tech in project.stack.slice(0, 4)"
                :key="tech"
                class="px-2 py-1 text-xs font-medium text-muted-foreground bg-background border border-border rounded"
              >
                {{ tech }}
              </span>
              <span v-if="project.stack.length > 4" class="px-2 py-1 text-xs text-muted-foreground">
                +{{ project.stack.length - 4 }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- View all CTA -->
      <div class="mt-12 text-center">
        <AppButton
          href="https://github.com/alexandremartin"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="lg"
          class="group"
        >
          Voir tous mes projets sur GitHub
          <ArrowUpRight class="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </AppButton>
      </div>
    </div>
  </section>
</template>
