<script setup lang="ts">
import { ref } from 'vue'
import zmInput from './components/zm-input/zm-input.vue'

const test = ref('')

const changeInput = value => {
  console.log(value)
}
</script>

<template>
  <main class="main-container">
    <h1>ZM Input</h1>

    <zm-input
      v-model="test"
      label="Инпут с типом text"
      placeholder="Альтернативный текст"
      width="300px"
      type="password"
      @change="changeInput"
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
