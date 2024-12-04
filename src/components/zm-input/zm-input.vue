<template>
  <div
    :class="[
      'zm-input',
      {
        'zm-input--lg': size === 'lg',
        'zm-input--md': size === 'md',
        'is-disabled': isDisabled,
      },
    ]"
    :style="{ width }"
  >
    <label v-if="label" :for="id ?? generatedId" class="zm-input__label">
      {{ label }}
    </label>

    <input
      v-model="modelValue"
      class="zm-input__field"
      :id="id ?? generatedId"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

const $emit = defineEmits<{
  change: [value: string | number]
}>()

const { type = 'text', width = '100%' } = defineProps<{
  id?: string
  type?: string
  label?: string
  width?: string
  isDisabled?: boolean
  size?: 'md' | 'lg'
  placeholder?: string
}>()

// Vars
const generatedId = useId()

// Refs
const modelValue = defineModel<string | number>({
  required: true,
  set(value) {
    $emit('change', value)

    return value
  },
})
</script>

<style scoped lang="scss">
.zm-input {
  $self: &;

  display: grid;
  grid-gap: 0.75rem;

  &.is-disabled {
    pointer-events: none;
  }

  &__label {
    color: $dark;
    font-size: 1rem;
    font-weight: 500;

    .is-disabled & {
      color: lighten($dark, 50%);
    }
  }

  &__field {
    border: 2px solid $lightGray;
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    height: 1.5rem;
    width: 100%;
    outline: none;
    transition: border-color 0.3s ease;

    #{$self}--md & {
      height: 1rem;
    }

    #{$self}--lg & {
      height: 2rem;
    }

    &:focus {
      border-color: $blue;
    }

    &::placeholder {
      font-size: 1rem;
      font-family: 'Raleway', sans-serif;
    }

    .is-disabled & {
      color: lighten($lightGray, 50%);
    }
  }
}
</style>
