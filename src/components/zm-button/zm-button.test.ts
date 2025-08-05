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

    expect(wrapper.find('.zm-button').classes()).toContain('zm-button--sm')
  })

  it('render with a theme primary', () => {
    const wrapper = mount(ZmButton, {
      props: { theme: 'primary' },
      slots: { default: 'I am a primary button' }
    })

    expect(wrapper.find('.zm-button').classes()).toContain('zm-button--primary')
  })

  it('render with an outline', () => {
    const wrapper = mount(ZmButton, {
      props: { theme: 'success', outline: true },
      slots: { default: 'I am a outline button' }
    })

    expect(wrapper.find('.zm-button').classes()).toContain('zm-button--outline')
  })

  it('render with an animation', () => {
    const wrapper = mount(ZmButton, {
      props: { theme: 'success', animation: true },
      slots: { default: 'I am a animation button' }
    })

    expect(wrapper.find('.zm-button').classes()).toContain('zm-button--animation')
  })

  it('emits a click event when clicked', async () => {
    const wrapper = mount(ZmButton, {
      slots: {
        default: 'I am clickable button'
      }
    });

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  })
})
