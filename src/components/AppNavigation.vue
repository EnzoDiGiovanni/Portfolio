<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import { navLinks } from '@/data/navigation'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('')

function handleScroll() {
  isScrolled.value = window.scrollY > 20

  const sections = navLinks.map((link) => link.href.replace('#', ''))
  for (const section of [...sections].reverse()) {
    const element = document.getElementById(section)
    if (element && element.getBoundingClientRect().top <= 200) {
      activeSection.value = section
      break
    }
  }
}

function handleNavClick(href: string) {
  isMobileMenuOpen.value = false
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 py-3'
        : 'bg-transparent py-5',
    ]"
  >
    <nav class="mx-auto max-w-[1200px] px-6">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a
          href="#"
          class="relative group"
          @click.prevent="scrollToTop"
        >
          <span class="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            AM<span class="text-primary">.</span>
          </span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            :class="[
              'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
              activeSection === link.href.replace('#', '')
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            ]"
            @click.prevent="handleNavClick(link.href)"
          >
            {{ link.label }}
            <span
              v-if="activeSection === link.href.replace('#', '')"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
            />
          </a>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:block">
          <AppButton variant="primary" @click="handleNavClick('#contact')">
            Contact
            <ArrowUpRight class="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </AppButton>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden relative w-10 h-10 flex items-center justify-center text-foreground"
          aria-label="Toggle menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span :class="['absolute transition-all duration-300', isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0']">
            <Menu :size="24" />
          </span>
          <span :class="['absolute transition-all duration-300', isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90']">
            <X :size="24" />
          </span>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        :class="[
          'md:hidden overflow-hidden transition-all duration-300',
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0',
        ]"
      >
        <div class="py-4 border-t border-border">
          <div class="flex flex-col gap-2">
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              :class="[
                'px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                activeSection === link.href.replace('#', '')
                  ? 'text-foreground bg-card'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/50',
              ]"
              @click.prevent="handleNavClick(link.href)"
            >
              {{ link.label }}
            </a>
            <AppButton variant="primary" class="mt-2" @click="handleNavClick('#contact')">
              Me contacter
              <ArrowUpRight class="ml-1 h-4 w-4" />
            </AppButton>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
