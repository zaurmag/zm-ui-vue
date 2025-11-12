<script setup lang="ts">
import { ref } from 'vue'
import zmInput from '@/ui/atoms/zm-input/zm-input.vue'

const test = ref('')
</script>

<template>
  <main class="main-container">
    <h1>ZM-UI - библиотека UI-компонентов</h1>

    <zm-input
      v-model="test"
      label="Инпут с типом text"
      placeholder="Альтернативный текст"
      width="300px"
      type="password"
    />
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
