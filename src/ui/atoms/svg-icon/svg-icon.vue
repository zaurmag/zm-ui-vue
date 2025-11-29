<template>
  <svg :class="['icon', `${prefix}-${name}`]">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Types
interface Props {
  prefix?: string
  name: string
  color?: string
}

const { prefix = 'icon', name = '' } = defineProps<Props>()

const symbolId = computed<string>(() => `#${prefix}-${name}`)
</script>

<style scoped lang="sass">
.icon
	display: inline-block
	width: 1em
	height: 1em
	fill: currentColor
</style>
