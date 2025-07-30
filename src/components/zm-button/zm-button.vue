<script setup lang="ts">
import type { ZMThemes } from '@/shared/types'

export interface IProps {
  size?: 'sm' | 'lg'
  theme?: ZMThemes
  isAnimation?: boolean | undefined
}

defineProps<IProps>()
</script>

<template>
  <button
    :class="[
      'zm-button',
      size ? `zm-button--${size}` : '',
      theme ? `zm-button--${theme}` : '',
      isAnimation ? 'zm-button--animation' : ''
    ]"
  >
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
  border: none;
  border-radius: $btn-border-radius;
  background-color: transparent;
  user-select: none;
  display: inline-flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: $btn-line-height;
  font-size: $font-size-base;
  padding: $btn-padding-y $btn-padding-x;
  cursor: pointer;

  // Themes
  @each $color, $value in $theme-colors {
    &--#{$color} {
      background-color: $value;
      border-color: $value;
      color: $white;
      //color: color-contrast($value);
    }

    // Animation
    &--animation {
      animation: progress 0.5s linear infinite;
      background-size: 25px 25px;
      background-image: linear-gradient(
          45deg,
          rgba($value, 0.25) 25%,
          transparent 25%,
          transparent 50%,
          rgba($value, 0.25) 50%,
          rgba($value, 0.25) 75%,
          transparent 75%,
          transparent);
      color: $white;
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
    background-position: 50px 25px
  }
}
</style>
