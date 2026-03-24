<script setup lang="ts">
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="py-12 border-t border-border relative">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="grid md:grid-cols-3 gap-8 items-center">
        <!-- Logo & tagline -->
        <div>
          <a
            href="#"
            class="text-2xl font-bold text-foreground hover:text-primary transition-colors"
            @click.prevent="scrollToTop"
          >
            AM<span class="text-primary">.</span>
          </a>
          <p class="text-sm text-muted-foreground mt-2">Développeur Full-Stack</p>
        </div>

        <!-- Navigation -->
        <div class="flex justify-center gap-6">
          <a
            v-for="item in ['Projets', 'Expérience', 'Contact']"
            :key="item"
            :href="`#${item.toLowerCase().replace('é', 'e')}`"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ item }}
          </a>
        </div>

        <!-- Social & back to top -->
        <div class="flex items-center justify-end gap-4">
          <div class="flex items-center gap-3">
            <a
              href="https://github.com/alexandremartin"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
              aria-label="GitHub"
            >
              <Github class="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/alexandremartin"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin class="h-4 w-4" />
            </a>
            <a
              href="mailto:alexandre.martin@email.com"
              class="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
              aria-label="Email"
            >
              <Mail class="h-4 w-4" />
            </a>
          </div>

          <div class="w-px h-6 bg-border" />

          <button
            class="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all group cursor-pointer"
            aria-label="Retour en haut"
            @click="scrollToTop"
          >
            <ArrowUp class="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-muted-foreground">
          © {{ currentYear }} Alexandre Martin. Construit avec Vue.js &amp; Tailwind CSS.
        </p>
        <p class="text-xs text-muted-foreground">Design &amp; Développement par AM</p>
      </div>
    </div>
  </footer>
</template>
