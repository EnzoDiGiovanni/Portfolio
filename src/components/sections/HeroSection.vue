<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { ArrowDown, Mail, MousePointer2 } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'

// --- TypeWriter ---
const typewriterWords = ['Développeur Full-Stack', 'Architecte Web', 'Problem Solver', 'Créateur de Produits']
const currentWordIndex = ref(0)
const currentText = ref('')
const isDeleting = ref(false)
let typewriterTimer: ReturnType<typeof setTimeout> | null = null

function typewriterTick() {
  const word = typewriterWords[currentWordIndex.value]
  if (!isDeleting.value) {
    if (currentText.value.length < word.length) {
      currentText.value = word.slice(0, currentText.value.length + 1)
      typewriterTimer = setTimeout(typewriterTick, 100)
    } else {
      typewriterTimer = setTimeout(() => {
        isDeleting.value = true
        typewriterTick()
      }, 2000)
    }
  } else {
    if (currentText.value.length > 0) {
      currentText.value = word.slice(0, currentText.value.length - 1)
      typewriterTimer = setTimeout(typewriterTick, 50)
    } else {
      isDeleting.value = false
      currentWordIndex.value = (currentWordIndex.value + 1) % typewriterWords.length
      typewriterTimer = setTimeout(typewriterTick, 100)
    }
  }
}

// --- StatsCounter ---
interface StatItem {
  end: number
  suffix: string
  label: string
  count: number
  animated: boolean
}

const stats = ref<StatItem[]>([
  { end: 5, suffix: '+', label: "Années d'exp.", count: 0, animated: false },
  { end: 30, suffix: '+', label: 'Projets', count: 0, animated: false },
  { end: 15, suffix: '+', label: 'Clients', count: 0, animated: false },
])

const statRefs = ref<(HTMLElement | null)[]>([])
const statsObserver = ref<IntersectionObserver | null>(null)

function animateStat(stat: StatItem) {
  if (stat.animated) return
  stat.animated = true
  const duration = 2000
  const steps = 60
  const increment = stat.end / steps
  let current = 0
  const timer = setInterval(() => {
    current += increment
    if (current >= stat.end) {
      stat.count = stat.end
      clearInterval(timer)
    } else {
      stat.count = Math.floor(current)
    }
  }, duration / steps)
}

// --- Mouse follower ---
const mousePosition = ref({ x: 0, y: 0 })

function handleMouseMove(e: MouseEvent) {
  mousePosition.value = {
    x: (e.clientX / window.innerWidth - 0.5) * 20,
    y: (e.clientY / window.innerHeight - 0.5) * 20,
  }
}

// --- Load animation ---
const isLoaded = ref(false)

function handleNavClick(href: string) {
  const element = document.querySelector(href)
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  isLoaded.value = true
  typewriterTick()
  window.addEventListener('mousemove', handleMouseMove)

  // Stats IntersectionObserver
  statsObserver.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt((entry.target as HTMLElement).dataset.statIndex || '0')
          animateStat(stats.value[idx])
        }
      })
    },
    { threshold: 0.5 }
  )
  statRefs.value.forEach((el) => {
    if (el) statsObserver.value!.observe(el)
  })
})

onUnmounted(() => {
  if (typewriterTimer) clearTimeout(typewriterTimer)
  window.removeEventListener('mousemove', handleMouseMove)
  statsObserver.value?.disconnect()
})
</script>

<template>
  <section class="min-h-screen flex flex-col relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Animated grid -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        :style="{
          backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }"
      />
      <!-- Floating orbs -->
      <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
      <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] animate-pulse" style="animation-delay: 1s" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] animate-pulse" style="animation-delay: 2s" />
      <!-- Animated SVG lines -->
      <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="transparent" />
            <stop offset="50%" stop-color="var(--primary)" stop-opacity="0.3" />
            <stop offset="100%" stop-color="transparent" />
          </linearGradient>
        </defs>
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#line-gradient)" stroke-width="1" class="animate-slide" />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="url(#line-gradient)" stroke-width="1" class="animate-slide-slow" style="animation-delay: 2s" />
      </svg>
    </div>

    <!-- Mouse follower gradient -->
    <div
      class="pointer-events-none absolute w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] transition-transform duration-300 ease-out"
      :style="{
        left: `calc(50% + ${mousePosition.x * 2}px - 400px)`,
        top: `calc(50% + ${mousePosition.y * 2}px - 400px)`,
      }"
    />

    <div class="flex-1 flex items-center justify-center relative z-10">
      <div class="max-w-[1200px] mx-auto px-6 w-full">
        <div
          :class="[
            'transition-all duration-1000',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          ]"
        >
          <!-- Status badge -->
          <div class="flex justify-center mb-8">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span class="text-sm text-muted-foreground">Disponible pour de nouveaux projets</span>
            </div>
          </div>

          <!-- Main heading -->
          <h1 class="text-center mb-6">
            <span class="block text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-4">
              Alexandre Martin
            </span>
            <span class="block text-2xl md:text-3xl lg:text-4xl font-medium">
              <span class="text-primary">
                {{ currentText }}<span class="animate-pulse">|</span>
              </span>
            </span>
          </h1>

          <!-- Description -->
          <p
            :class="[
              'text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-300',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
            ]"
          >
            Je transforme des idées complexes en applications web
            <span class="text-foreground font-medium"> performantes</span>,
            <span class="text-foreground font-medium"> scalables</span> et
            <span class="text-foreground font-medium"> élégantes</span>.
          </p>

          <!-- CTA Buttons -->
          <div
            :class="[
              'flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-500',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
            ]"
          >
            <AppButton
              href="#projects"
              variant="primary"
              size="lg"
              class="group"
              @click.prevent="handleNavClick('#projects')"
            >
              <span class="relative z-10 flex items-center gap-2">
                <MousePointer2 class="h-5 w-5" />
                Découvrir mes projets
              </span>
              <span class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </AppButton>
            <AppButton
              href="#contact"
              variant="outline"
              size="lg"
              class="group"
              @click.prevent="handleNavClick('#contact')"
            >
              <Mail class="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Discutons de votre projet
            </AppButton>
          </div>

          <!-- Stats -->
          <div
            :class="[
              'grid grid-cols-3 gap-8 max-w-xl mx-auto transition-all duration-1000 delay-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
            ]"
          >
            <div
              v-for="(stat, i) in stats"
              :key="stat.label"
              :ref="(el) => { statRefs[i] = el as HTMLElement | null }"
              :data-stat-index="i"
              class="text-center"
            >
              <div class="text-4xl md:text-5xl font-bold text-foreground mb-1">
                {{ stat.count }}{{ stat.suffix }}
              </div>
              <div class="text-sm text-muted-foreground uppercase tracking-wider">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span class="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
      <ArrowDown class="h-4 w-4 text-muted-foreground" />
    </div>

    <!-- Side decorations -->
    <div class="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 text-muted-foreground/20 text-xs font-mono writing-vertical">
      PORTFOLIO 2024
    </div>
    <div class="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground/20 text-xs font-mono writing-vertical">
      FULL-STACK DEV
    </div>
  </section>
</template>
