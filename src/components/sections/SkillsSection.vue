<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { skillCategories } from '@/data/skills'

const categoryVisibility = ref<boolean[]>(skillCategories.map(() => false))
const categoryRefs = ref<(HTMLElement | null)[]>([])
let observers: IntersectionObserver[] = []

onMounted(() => {
  categoryRefs.value.forEach((el, index) => {
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { categoryVisibility.value[index] = true }, index * 120)
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    observers.push(obs)
  })
})

onUnmounted(() => observers.forEach((o) => o.disconnect()))
</script>

<template>
  <section id="skills" class="py-24 md:py-32 bg-card/50 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full" />
      <div class="absolute bottom-20 right-10 w-48 h-48 border border-primary/10 rounded-full" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/50 rounded-full" />
    </div>

    <div class="max-w-[1200px] mx-auto px-6 relative">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-4">
          Expertise
        </span>
        <h2 class="text-4xl md:text-5xl font-bold text-foreground mb-6">Stack Technique</h2>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
          Des technologies modernes et éprouvées pour construire des applications
          performantes et maintenables.
        </p>
      </div>

      <!-- Categories -->
      <div class="space-y-12">
        <div
          v-for="(category, catIndex) in skillCategories"
          :key="category.title"
          :ref="(el) => { categoryRefs[catIndex] = el as HTMLElement | null }"
          :class="[
            'transition-all duration-700',
            categoryVisibility[catIndex] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          ]"
        >
          <!-- Category header -->
          <div class="flex items-center gap-4 mb-6">
            <div class="flex flex-col">
              <span :class="['text-xs font-semibold uppercase tracking-widest mb-0.5', category.accentClass]">
                {{ category.label }}
              </span>
              <h3 class="text-xl font-bold text-foreground">{{ category.title }}</h3>
            </div>
            <div class="flex-1 h-px bg-border" />
          </div>

          <!-- Skills grid -->
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            <div
              v-for="(skill, skillIndex) in category.skills"
              :key="skill.name"
              :class="[
                'group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border',
                'hover:border-primary/50 hover:bg-card/80 transition-all duration-300 cursor-default',
                'transition-all duration-500',
              ]"
              :style="{ transitionDelay: categoryVisibility[catIndex] ? `${skillIndex * 50}ms` : '0ms' }"
            >
              <!-- Glow on hover -->
              <div class="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <!-- Icon -->
              <div class="relative w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon
                  :icon="skill.icon"
                  class="w-8 h-8"
                />
              </div>

              <!-- Name -->
              <span class="relative text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200 text-center leading-tight">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
