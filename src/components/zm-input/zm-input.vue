<template>
  <div class="zm-input" :style="{ width }">
    <label v-if="label" :for="id ?? generatedId" class="zm-input__label">
      {{ label }}
    </label>

    <input
      v-model="value"
      class="zm-input__field"
      :id="id ?? generatedId"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { useId, computed } from 'vue'

// Emits && props
const $emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const {
  type = 'text',
  width = '100%',
  modelValue = '',
} = defineProps<{
  id?: string
  type?: string
  label?: string
  width?: string
  placeholder?: string
  modelValue: string | number
}>()

// Vars
const generatedId = useId()

// Refs
const value = computed({
  get() {
    return modelValue
  },
  set(val) {
    $emit('update:modelValue', val)
    $emit('change', val)
  },
})
</script>

<style scoped lang="scss">
.zm-input {
  display: grid;
  grid-gap: 0.25rem;

  &__label {
    color: $dark;
    font-size: 1rem;
  }

  &__field {
    border: 1px solid $gray;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    height: 1.5rem;
    width: 100%;
  }
}
</style>
