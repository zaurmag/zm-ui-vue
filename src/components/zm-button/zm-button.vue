<script setup lang="ts">
import type { ZMThemes } from '../../shared/config/types'
import { computed } from 'vue'

export interface IProps {
  size?: 'sm' | 'lg'
  theme?: ZMThemes
  outline?: boolean
  animation?: boolean
}

const props = defineProps<IProps>()

const classList = computed(() => {
  const classes = ['zm-button']

  if (props.size) {
    classes.push(`zm-button--${props.size}`)
  }

  if (props.theme) {
    classes.push(`zm-button--${props.theme}`)
  }

  if (props.outline) {
    classes.push('zm-button--outline')
  }

  if (props.animation) {
    classes.push(`zm-button--animation`)
  }

  return classes.join(' ')
})
</script>

<template>
  <button :class="classList">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@mixin button-size($padding-y, $padding-x, $font-size, $border-radius) {
  padding: $padding-y $padding-x;
  font-size: $font-size;
  border-radius: $border-radius;
}

.zm-button {
  $self: &;

  border-radius: $btn-border-radius;
  background-color: transparent;
  border: none;
  user-select: none;
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: $btn-line-height;
  font-size: $font-size-base;
  padding: $btn-padding-y $btn-padding-x;
  cursor: pointer;
  transition: $btn-transition;

  // Themes
  @each $color, $value in $theme-colors {
    &--#{$color} {
      background-color: $value;
      border: $border-width solid $value;
      color: color-contrast($value);

      // Outline
      &#{$self}--outline {
        background-color: transparent;
        color: $value;

        &:hover {
          background-color: $value;
          color: color-contrast($value);
        }
      }

      &:hover {
        $bg-color: if($color == dark, $color-contrast-light, $color-contrast-dark);
        background-color: mix-color($value, $bg-color, $btn-hover-bg-amount);
        border-color: mix-color($value, $bg-color, $btn-hover-bg-border-amount);
      }
    }

    // Animation
    &--animation {
      animation: progress 0.7s linear infinite;
      background-size: 17px 17px;
      background-image: linear-gradient(
          45deg,
          rgba($value, 0.20) 20%,
          transparent 25%,
          transparent 50%,
          rgba($value, 0.20) 50%,
          rgba($value, 0.20) 70%,
          transparent 80%,
          transparent);
      color: color-contrast($value);
    }
  }

  // Sizes
  &--lg {
    @include button-size(
      $btn-padding-y-lg,
      $btn-padding-x-lg,
      $btn-font-size-lg,
      $btn-border-radius-lg
    );
  }

  &--sm {
    @include button-size(
      $btn-padding-y-sm,
      $btn-padding-x-sm,
      $btn-font-size-sm,
      $btn-border-radius-sm
    );
  }

  &--link {
    background-color: transparent;
    border: none;
    text-decoration: underline;
    color: $btn-link-color;
    padding: 0;
  }
}

@keyframes progress {
  from {
    background-position: 0 0
  }

  to {
    background-position: 17px 34px
  }
}
</style>
