import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ZmButton from './zm-button.vue'

describe('ZmButton', () => {
  it('render default slot content', () => {
    const wrapper = mount(ZmButton, {
      slots: { default: 'Hello, I am a button' },
    })

    expect(wrapper.text()).toContain('Hello, I am a button')
    expect(wrapper.find('button').exists()).toBe(true);
  })

  it('render with a size small', () => {
    const wrapper = mount(ZmButton, {
      props: { size: 'sm' },
      slots: { default: 'I am a small button' }
    })

    expect(wrapper.find('button').classes()).toContain('zm-button')
    expect(wrapper.find('button').classes()).toContain('zm-button--sm')
  })
})
