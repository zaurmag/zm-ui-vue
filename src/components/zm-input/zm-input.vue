<template>
  <div
    :class="[
      'zm-input',
      size ? `zm-input--${size}` : '',
      { 'is-disabled': isDisabled },
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
      :disabled="isDisabled"
    />
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

type Model = string | number

// Emits and props
const $emit = defineEmits<{
  change: [value: Model]
}>()

const { type = 'text', width = '100%' } = defineProps<{
  id?: string
  type?: string
  label?: string
  width?: string
  isDisabled?: boolean
  size?: 'sm' | 'lg'
  placeholder?: string
}>()

// Vars
const generatedId = useId()

// Refs
const modelValue = defineModel<Model>({
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
  grid-gap: 0.5rem;

  &__label {
    color: $gray-900;
    font-size: $font-size-base;
    font-weight: 500;
    display: inline-block;
  }

  &__field {
    border: 1px solid $input-border-color;
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    outline: none;
    font-size: $font-size-base;
    font-weight: 400;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: $blue;
    }

    &::placeholder {
      font-size: $font-size-base;
      font-family: $font-family;
    }
  }

  // Disabled
  &.is-disabled {
    #{$self}__field {
      opacity: 1;
      color: $input-disabled-color;
      background-color: $gray-200;
    }
  }

  // Sizes
  &--sm {
    #{$self}__field {
      padding: $input-padding-y-sm $input-padding-x-sm;
      font-size: $font-size-sm;
      min-height: $input-height-sm;

      &::placeholder {
        font-size: $font-size-sm;
      }
    }
  }

  &--lg {
    #{$self}__field {
      padding: $input-padding-y-lg $input-padding-x-lg;
      font-size: $font-size-lg;
      min-height: $input-height-lg;

      &::placeholder {
        font-size: $font-size-lg;
      }
    }
  }
}
</style>
