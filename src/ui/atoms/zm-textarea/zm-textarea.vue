<template>
  <div
    :class="[
      'zm-textarea',
      {
        'zm-textarea--disabled': isDisabled,
        'zm-textarea--error': error,
      },
    ]"
    :style="{ width, height }"
  >
    <label v-if="label" :for="id ?? generatedId" class="zm-textarea__label">
      {{ label }}
    </label>

    <textarea
      v-model="modelValue"
      class="zm-textarea__field"
      :id="id ?? generatedId"
      :cols="cols"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="isDisabled"
      @blur="$emit('blur', $event)"
    />

    <span v-if="error" class="zm-textarea__error-message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

// Types
interface Props {
  id?: string
  label?: string | undefined
  cols?: number
  rows?: number
  width?: string | undefined
  height?: string | undefined
  isDisabled?: boolean | undefined
  placeholder?: string | undefined
  error?: string | undefined
}

type Emits = {
  blur: [Event]
}

type Model = string

// Props and emits
const {
  cols = 20,
  rows = 7,
  width = '100%',
  height = '100%',
} = defineProps<Props>()
defineEmits<Emits>()

const generatedId: string = useId()
const modelValue = defineModel<Model>({
  required: true,
})
</script>

<style scoped lang="scss">
.zm-textarea {
  $self: &;

  display: grid;
  grid-gap: 0.25rem;

  &__label {
    color: $input-label-color;
    font-size: $font-size-base;
    font-weight: 500;
    display: inline-block;
  }

  &__field {
    border: 1px solid $input-border-color;
    border-radius: 0.25rem;
    padding: $input-padding-y $input-padding-x;
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

  // Error
  &--error {
    #{$self}__field {
      border-color: $red;
    }
  }

  &__error-message {
    color: $red;
    font-size: $font-size-sm;
  }

  // Disabled
  &--disabled {
    #{$self}__field {
      opacity: 1;
      color: $input-disabled-color;
      background-color: $gray-200;
    }
  }
}
</style>
