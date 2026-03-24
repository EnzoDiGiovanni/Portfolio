<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Mail, Linkedin, Github, ArrowUpRight, MapPin, Calendar } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'

const iconMap = { Mail, Linkedin, Github } as const

const contactMethods = [
  {
    iconName: 'Mail' as keyof typeof iconMap,
    label: 'Email',
    value: 'alexandre.martin@email.com',
    href: 'mailto:alexandre.martin@email.com',
    colorClass: 'group-hover:text-primary group-hover:border-primary',
  },
  {
    iconName: 'Linkedin' as keyof typeof iconMap,
    label: 'LinkedIn',
    value: '/in/alexandremartin',
    href: 'https://linkedin.com/in/alexandremartin',
    colorClass: 'group-hover:text-blue-500 group-hover:border-blue-500',
  },
  {
    iconName: 'Github' as keyof typeof iconMap,
    label: 'GitHub',
    value: '@alexandremartin',
    href: 'https://github.com/alexandremartin',
    colorClass: 'group-hover:text-foreground group-hover:border-foreground',
  },
]

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) isVisible.value = true },
    { threshold: 0.2 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section id="contact" ref="sectionRef" class="py-24 md:py-32 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0">
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
    </div>

    <div class="max-w-[1200px] mx-auto px-6 relative">
      <!-- Heading -->
      <div
        :class="[
          'max-w-3xl mx-auto text-center transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        ]"
      >
        <span class="inline-block text-primary text-sm font-medium uppercase tracking-wider mb-4">
          Contact
        </span>
        <h2 class="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Travaillons <span class="text-primary">ensemble</span>
        </h2>
        <p class="text-muted-foreground text-xl mb-4 max-w-xl mx-auto">
          Vous avez un projet en tête ? Discutons de comment je peux vous aider à le concrétiser.
        </p>

        <!-- Availability status -->
        <div class="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card border border-border mb-12">
          <div class="flex items-center gap-2">
            <MapPin class="w-4 h-4 text-muted-foreground" />
            <span class="text-sm text-muted-foreground">Paris, France</span>
          </div>
          <div class="w-px h-4 bg-border" />
          <div class="flex items-center gap-2">
            <Calendar class="w-4 h-4 text-muted-foreground" />
            <span class="text-sm text-muted-foreground">Disponible Q2 2024</span>
          </div>
        </div>
      </div>

      <!-- Contact methods -->
      <div
        :class="[
          'grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        ]"
      >
        <a
          v-for="(method, index) in contactMethods"
          :key="method.label"
          :href="method.href"
          :target="method.href.startsWith('http') ? '_blank' : undefined"
          :rel="method.href.startsWith('http') ? 'noopener noreferrer' : undefined"
          :class="[
            'group relative p-6 rounded-2xl bg-card border border-border hover:bg-card/80 transition-all duration-300',
            method.colorClass,
          ]"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="flex items-center justify-between mb-4">
            <component :is="iconMap[method.iconName]" class="w-6 h-6 text-muted-foreground group-hover:scale-110 transition-all" />
            <ArrowUpRight class="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
          </div>
          <div class="text-lg font-semibold text-foreground mb-1">{{ method.label }}</div>
          <div class="text-sm text-muted-foreground">{{ method.value }}</div>
        </a>
      </div>

      <!-- Main CTA -->
      <div
        :class="[
          'text-center transition-all duration-1000 delay-400',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        ]"
      >
        <AppButton
          href="mailto:alexandre.martin@email.com"
          variant="primary"
          size="lg"
          class="h-16 px-12 text-lg font-semibold group"
        >
          <span class="relative z-10 flex items-center gap-3">
            <Mail class="w-5 h-5" />
            Démarrer une conversation
          </span>
          <span class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </AppButton>

        <p class="mt-6 text-sm text-muted-foreground">Réponse garantie sous 24h</p>
      </div>
    </div>
  </section>
</template>
