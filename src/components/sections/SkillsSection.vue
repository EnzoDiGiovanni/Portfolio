<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { skillCategories } from '@/data/skills'

// Track visibility per category
const categoryVisibility = ref<boolean[]>(skillCategories.map(() => false))
const categoryRefs = ref<(HTMLElement | null)[]>([])

// Track width per skill (flat: category * 5 + skill index)
const skillWidths = ref<number[]>(skillCategories.flatMap((cat) => cat.skills.map(() => 0)))
const skillRefs = ref<(HTMLElement | null)[]>([])

let observers: IntersectionObserver[] = []

function getSkillIndex(catIndex: number, skillIndex: number) {
  return skillCategories.slice(0, catIndex).reduce((acc, c) => acc + c.skills.length, 0) + skillIndex
}

onMounted(() => {
  // Category observers (fade in)
  categoryRefs.value.forEach((el, index) => {
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { categoryVisibility.value[index] = true }, index * 150)
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    observers.push(obs)
  })

  // Skill bar observers (fill animation)
  skillRefs.value.forEach((el, flatIndex) => {
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const level = parseInt(el.dataset.level || '0')
          const delay = parseInt(el.dataset.delay || '0')
          setTimeout(() => { skillWidths.value[flatIndex] = level }, delay)
        }
      },
      { threshold: 0.5 }
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
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full" />
      <div class="absolute bottom-20 right-10 w-48 h-48 border border-primary/10 rounded-full" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/50 rounded-full" />
    </div>

    <div class="max-w-[1200px] mx-auto px-6 relative">
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

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(category, catIndex) in skillCategories"
          :key="category.title"
          :ref="(el) => { categoryRefs[catIndex] = el as HTMLElement | null }"
          :class="[
            'group relative bg-card border border-border rounded-2xl p-8 transition-all duration-700',
            category.borderColor,
            categoryVisibility[catIndex] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
          ]"
        >
          <!-- Gradient background on hover -->
          <div :class="`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`" />

          <div class="relative">
            <h3 class="text-xl font-bold text-foreground mb-8 pb-4 border-b border-border">
              {{ category.title }}
            </h3>

            <div class="space-y-5">
              <div
                v-for="(skill, skillIndex) in category.skills"
                :key="skill.name"
                :ref="(el) => { skillRefs[getSkillIndex(catIndex, skillIndex)] = el as HTMLElement | null }"
                :data-level="skill.level"
                :data-delay="skillIndex * 100 + catIndex * 200"
                class="group/skill"
              >
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-foreground group-hover/skill:text-primary transition-colors">
                    {{ skill.name }}
                  </span>
                  <span class="text-xs text-muted-foreground">{{ skill.level }}%</span>
                </div>
                <div class="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-out"
                    :style="{ width: `${skillWidths[getSkillIndex(catIndex, skillIndex)]}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
