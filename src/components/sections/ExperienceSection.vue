<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Briefcase, GraduationCap, MapPin } from 'lucide-vue-next'
import { timeline } from '@/data/timeline'

const cardVisibility = ref<boolean[]>(timeline.map(() => false))
const cardRefs = ref<(HTMLElement | null)[]>([])
let observers: IntersectionObserver[] = []

onMounted(() => {
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
    observers.push(obs)
  })
})

onUnmounted(() => observers.forEach((o) => o.disconnect()))
</script>

<template>
  <section id="experience" class="py-24 md:py-32 bg-card/50 relative overflow-hidden">
    <!-- Decorative vertical line -->
    <div class="hidden md:block absolute left-1/2 top-48 bottom-24 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

    <div class="max-w-[1200px] mx-auto px-6 relative">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-4">
          Parcours
        </span>
        <h2 class="text-4xl md:text-5xl font-bold text-foreground mb-6">Expérience & Formation</h2>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
          Un parcours marqué par des projets ambitieux et une évolution constante.
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Top dot -->
        <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50" />

        <div class="space-y-8 md:space-y-12">
          <div
            v-for="(item, index) in timeline"
            :key="`${item.title}-${item.period}`"
            :ref="(el) => { cardRefs[index] = el as HTMLElement | null }"
            :class="[
              'relative flex transition-all duration-700',
              index % 2 === 0 ? 'md:justify-end' : '',
              'md:w-[calc(50%-2rem)]',
              cardVisibility[index]
                ? 'opacity-100 translate-y-0'
                : index % 2 === 0
                  ? 'opacity-0 translate-y-8 md:-translate-x-8'
                  : 'opacity-0 translate-y-8 md:translate-x-8',
            ]"
            :style="{ marginLeft: index % 2 !== 0 ? 'auto' : undefined }"
          >
            <div class="group w-full bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
              <!-- Header -->
              <div class="flex items-start gap-4 mb-4">
                <div
                  :class="[
                    'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
                    item.type === 'work' ? 'bg-primary/10' : 'bg-blue-500/10',
                  ]"
                >
                  <component
                    :is="item.type === 'work' ? Briefcase : GraduationCap"
                    :class="['w-5 h-5', item.type === 'work' ? 'text-primary' : 'text-blue-500']"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      :class="[
                        'text-xs font-semibold uppercase tracking-wider',
                        item.type === 'work' ? 'text-primary' : 'text-blue-500',
                      ]"
                    >
                      {{ item.type === 'work' ? 'Expérience' : 'Formation' }}
                    </span>
                    <span class="text-xs text-muted-foreground">{{ item.period }}</span>
                  </div>
                  <h3 class="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {{ item.title }}
                  </h3>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-sm text-muted-foreground">{{ item.organization }}</span>
                    <span class="text-muted-foreground/50">|</span>
                    <span class="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin class="w-3 h-3" />
                      {{ item.location }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <p class="text-muted-foreground text-sm mb-4 leading-relaxed">{{ item.description }}</p>

              <!-- Achievements -->
              <ul v-if="item.achievements" class="space-y-2">
                <li
                  v-for="(achievement, i) in item.achievements"
                  :key="i"
                  class="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Bottom dot -->
        <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-0 w-4 h-4 rounded-full bg-border" />
      </div>
    </div>
  </section>
</template>
