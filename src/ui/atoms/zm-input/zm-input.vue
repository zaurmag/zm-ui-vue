<template>
  <div
    :class="[
      'zm-input',
      size ? `zm-input--${size}` : '',
      {
        'zm-input--disabled': isDisabled,
        'zm-input--password': isPassword,
        'zm-input--error': error,
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
      :type="inputType"
      :placeholder="placeholder"
      :disabled="isDisabled"
      @blur="$emit('blur', $event)"
    />

    <button
      v-if="isPassword"
      type="button"
      class="zm-input__password-btn"
      @click="togglePassword"
    >
      <img :src="passwordBtnIcon" alt="Eye" />
    </button>

    <span v-if="error" class="zm-input__error-message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, useId, computed } from 'vue'
import Eye from '../../../shared/assets/icons/eye.svg'
import EyeSlash from '../../../shared/assets/icons/eye-slash.svg'
import type { Size } from '../../../shared/config'

// Types
type Model = string | number
type Type = 'text' | 'password' | 'email' | 'tel' | 'number'

interface Props {
  id?: string
  type?: Type | undefined
  label?: string | undefined
  width?: string | undefined
  isDisabled?: boolean | undefined
  size?: Size | undefined
  placeholder?: string | undefined
  error?: string | undefined
}

type Emits = {
  blur: [Event]
}

// Emits and props
const $emit = defineEmits<Emits>()
const { type = 'text', width = '100%' } = defineProps<Props>()

// Vars
const generatedId: string = useId()

// Refs
const inputType = ref<Type>(type)
const isDisplayPassword = ref(false)
const passwordBtnIcon = ref(Eye)

const modelValue = defineModel<Model>({
  required: true,
})

const isPassword = computed<boolean>(() => type === 'password')

// Methods
const togglePassword = () => {
  isDisplayPassword.value = !isDisplayPassword.value

  if (isDisplayPassword.value) {
    inputType.value = 'text'
    passwordBtnIcon.value = EyeSlash
  } else {
    inputType.value = 'password'
    passwordBtnIcon.value = Eye
  }
}
</script>

<style scoped lang="scss">
.zm-input {
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

  // Password button
  &--password {
    position: relative;
  }

  &__password-btn {
    position: absolute;
    right: $input-padding-x;
    top: 0;
    transform: translateY(calc(2.2em - 2px));
    background-color: transparent;
    cursor: pointer;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-base;
    height: 1.5em;
    width: 1.5em;

    &-icon {
      color: $input-password-btn-icon-color;
    }
  }

  // Sizes
  &--sm {
    #{$self} {
      &__label {
        font-size: $font-size-sm;
      }

      &__field {
        padding: $input-padding-y-sm $input-padding-x-sm;
        font-size: $font-size-sm;
        min-height: $input-height-sm;

        // Placeholder
        &::placeholder {
          font-size: $font-size-sm;
        }
      }

      // Password button
      &__password-btn {
        font-size: $font-size-sm;
        right: $input-padding-x-sm;
      }
    }
  }

  &--lg {
    #{$self} {
      &__label {
        font-size: $font-size-lg;
      }

      &__field {
        padding: $input-padding-y-lg $input-padding-x-lg;
        font-size: $font-size-lg;
        min-height: $input-height-lg;

        &::placeholder {
          font-size: $font-size-lg;
        }
      }

      // Password button
      &__password-btn {
        font-size: $font-size-lg;
        right: $input-padding-x-lg;
      }
    }
  }
}
</style>
