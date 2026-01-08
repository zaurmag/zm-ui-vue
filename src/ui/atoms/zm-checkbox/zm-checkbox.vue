<template>
  <div :class="classList">
    <input
      v-model="modelValue"
      class="zm-checkbox__field"
      type="checkbox"
      :role="type"
      :id="checkboxId"
      :disabled="isDisabled"
    />
    <label class="zm-checkbox__label" :for="checkboxId">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import { useId, computed } from 'vue'
import type { Size } from '../../../shared/config'

// Types
type Props = {
  id?: string
  label: string
  type?: 'checkbox' | 'switch'
  size?: Size | undefined
  isDisabled?: boolean | undefined
}

type Model = boolean

// Props and emits
const { id, size, isDisabled = false, type = 'checkbox' } = defineProps<Props>()

// Define model value
const modelValue = defineModel<Model>({
  required: true,
})

const generatedId: string = useId()

// Computed
const checkboxId = computed(() => id ?? generatedId)
const classList = computed(() => {
  const classes = ['zm-checkbox']

  if (type === 'switch') {
    classes.push('zm-checkbox--switch')
  }

  if (size) {
    classes.push(`zm-checkbox--${size}`)
  }

  if (isDisabled) {
    classes.push('zm-checkbox--disabled')
  }

  return classes.join(' ')
})
</script>

<style scoped lang="scss">
.zm-checkbox {
  $self: &;

  display: grid;
  grid-auto-flow: column;
  gap: 0.25rem;
  justify-content: start;
  align-items: center;
  font-size: $checkbox-fz;

  &__field {
    width: $checkbox-input-width;
    height: $checkbox-input-width;
    background-color: $checkbox-input-bg;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: $checkbox-input-border;
    appearance: none;
    print-color-adjust: exact; // Keep themed appearance for print

    &[type='checkbox'] {
      border-radius: $checkbox-input-border-radius;
    }

    &:checked {
      background-color: $checkbox-checked-bg-color;
      border-color: $checkbox-checked-border-color;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
    }
  }

  &--disabled {
    pointer-events: none;
    filter: none;
    opacity: $checkbox-disabled-opacity;
  }

  // Sizes:
  &--sm {
    font-size: $font-size-sm;

    #{$self}__field {
      width: $checkbox-input-width-sm;
      height: $checkbox-input-width-sm;
    }
  }

  &--lg {
    font-size: $font-size-lg;
    gap: 0.5rem;

    #{$self}__field {
      width: $checkbox-input-width-lg;
      height: $checkbox-input-width-lg;
    }
  }

  // Switch
  &--switch {
    padding-left: $switch-padding-start;

    #{$self}__field {
      width: $switch-width;
      margin-left: $switch-padding-start * -1;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
      background-position: left center;
      border-radius: $switch-border-radius;
      transition: $switch-transition;

      &:checked {
        background-position: right center;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
      }
    }
  }
}
</style>
