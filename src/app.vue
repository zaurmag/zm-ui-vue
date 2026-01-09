<script setup lang="ts">
import { ref } from 'vue'
import zmSwitch from '@/ui/atoms/zm-switch/zm-switch.vue'

const switchValue = ref(false)
</script>

<template>
  <main class="main-container">
    <h1>ZM-UI - библиотека UI-компонентов</h1>

    <zm-switch v-model="switchValue" size="lg" label="Свитч" />
    <p>Состояние: {{ switchValue }}</p>
  </main>
</template>

<style lang="scss" scoped>
.main-container {
  padding: 0 1rem;
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
}
</style>
