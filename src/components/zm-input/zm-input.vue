<template>
  <div
    :class="[
      'zm-input',
      size ? `zm-input--${size}` : '',
      {
        'is-disabled': isDisabled,
        'zm-input--password': isPassword
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
    />

    <button
      v-if="isPassword"
      type="button"
      class="zm-input__password-btn"
      @click="togglePassword"
    >
      <svg-icon class="zm-input__password-btn-icon" :name="passwordBtnIcon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, useId, defineAsyncComponent, computed } from 'vue'

// Types
type Model = string | number
type BtnIcon = 'eye' | 'eye-slash'
type Type = 'text' | 'password' | 'email' | 'tel' | 'number'
type Size = 'sm' | 'lg'

export interface IProps {
  id?: string
  type?: Type | undefined
  label?: string | undefined
  width?: string | undefined
  isDisabled?: boolean | undefined
  size?: Size | undefined
  placeholder?: string | undefined
}

type Emits = {
  change: [value: Model]
}

// Components
const svgIcon = defineAsyncComponent(() => import('@/shared/ui/svg-icon.vue'))

// Emits and props
const $emit = defineEmits<Emits>()
const { type = 'text', width = '100%' } = defineProps<IProps>()

// Vars
const generatedId: string = useId()

// Refs
const inputType = ref<Type>(type)
const isDisplayPassword = ref(false)
const passwordBtnIcon = ref<BtnIcon>('eye')

const modelValue = defineModel<Model>({
  required: true,
  set(value) {
    $emit('change', value)

    return value
  },
})

const isPassword = computed<boolean>(() => type === 'password')

// Methods
const togglePassword = () => {
  isDisplayPassword.value = !isDisplayPassword.value

  if (isDisplayPassword.value) {
    inputType.value = 'text'
    passwordBtnIcon.value = 'eye-slash'
  } else {
    inputType.value = 'password'
    passwordBtnIcon.value = 'eye'
  }
}
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

  // Disabled
  &.is-disabled {
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
    bottom: 0;
    transform: translateY(calc(-1.5em / 4));
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
        transform: translateY(calc(-1.5em / 4 - 2px));
      }
    }
  }
}
</style>
