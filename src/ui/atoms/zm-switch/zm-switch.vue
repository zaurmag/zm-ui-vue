<script setup lang="ts">
import { computed, useId } from 'vue'
import type { Size } from '../../../shared/config'

// Types
type Props = {
  id?: string
  label?: string | undefined
  size?: Size | undefined
  isDisabled?: boolean | undefined
}

type Model = boolean

// Props and emits
const { id, size, isDisabled = false } = defineProps<Props>()

// Define model value
const modelValue = defineModel<Model>({
  required: true,
})

const switchId = id ?? useId()

const classList = computed(() => {
  const classes = ['zm-switch']

  if (size) {
    classes.push(`zm-switch--${size}`)
  }

  if (isDisabled) {
    classes.push('zm-switch--disabled')
  }

  return classes.join(' ')
})
</script>

<template>
  <div :class="classList">
    <input
      v-model="modelValue"
      class="zm-switch__field"
      :id="switchId"
      type="checkbox"
      role="checkbox"
    />

    <label class="zm-switch__label" :for="switchId">
      <span class="zm-switch__slider"></span>
      <span v-if="label" class="zm-switch__text">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<style scoped lang="scss">
.zm-switch {
  $self: &;

  display: inline-flex;
  justify-content: start;
  align-items: center;
  font-size: $switch-fz;

  &--disabled {
    pointer-events: none;
    filter: none;
    opacity: $switch-disabled-opacity;
  }

  &__label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;
  }

  &__slider {
    display: flex;
    align-items: center;
    border-radius: 999px;
    gap: 2px;
    border: $switch-input-border;
    background-color: transparent;
    width: $switch-input-width;
    height: $switch-input-height;
    padding: 0 2px;
    transition: background-color 0.2s;

    &::before {
      content: '';
      display: block;
      border-radius: 50%;
      background-color: $switch-inactive-color;
      width: calc($switch-input-height - 6px);
      height: calc($switch-input-height - 6px);
      transition:
        transform 0.2s,
        background-color 0.2s;
    }
  }

  &__text {
    line-height: 1.1;
  }

  &__field {
    display: none;

    &:checked + #{$self}__label #{$self}__slider {
      background-color: $component-active-bg;
      border-color: $component-active-bg;

      &::before {
        background-color: $white;
        transform: translateX(calc($switch-input-width - $switch-input-height));
      }
    }
  }

  // Sizes
  &--sm {
    font-size: $switch-fz-sm;
  }

  &--lg {
    font-size: $switch-fz-lg;
  }
}
</style>
