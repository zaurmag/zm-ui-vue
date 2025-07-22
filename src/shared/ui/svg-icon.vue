<template>
  <svg :class="['icon', `${prefix}-${name}`]">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { prefix = 'icon', name = '' } = defineProps<{
  prefix?: string
  name: string
  color?: string
}>()

const symbolId = computed<string>(() => `#${prefix}-${name}`)
</script>

<style scoped lang="sass">
.icon
	display: inline-block
	width: 1em
	height: 1em
	fill: currentColor
</style>
