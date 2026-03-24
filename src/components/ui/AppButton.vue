<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="target"
    :rel="rel"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 relative overflow-hidden group',
      variant === 'primary'
        ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
        : 'border border-border text-foreground hover:bg-card hover:border-primary bg-transparent',
      size === 'sm' ? 'px-4 py-2 text-sm rounded-lg h-9'
        : size === 'lg' ? 'px-8 h-14 text-base rounded-xl'
        : 'px-5 h-10 text-sm rounded-lg',
    ]"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 relative overflow-hidden group cursor-pointer',
      variant === 'primary'
        ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
        : 'border border-border text-foreground hover:bg-card hover:border-primary bg-transparent',
      size === 'sm' ? 'px-4 py-2 text-sm rounded-lg h-9'
        : size === 'lg' ? 'px-8 h-14 text-base rounded-xl'
        : 'px-5 h-10 text-sm rounded-lg',
    ]"
  >
    <slot />
  </button>
</template>
