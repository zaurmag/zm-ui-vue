import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ZmSwitch from './zm-switch.vue'

describe('ZmSwitch', () => {
  it('renders input correctly', () => {
    const wrapper = mount(ZmSwitch, {
      props: { modelValue: false, label: 'Switch' },
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect(input.exists()).toBe(true)
    expect(wrapper.text()).toContain('Switch')
  })

  it('emits update:modelValue when clicked', async () => {
    const wrapper = mount(ZmSwitch, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (e: boolean) =>
          wrapper.setProps({ modelValue: e }),
      },
    })

    const input = wrapper.find('input')
    await input.setValue(true)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('displays the label when provided', () => {
    const labelText = 'Enable notifications'
    const wrapper = mount(ZmSwitch, {
      props: { modelValue: false, label: labelText },
    })

    expect(wrapper.find('.zm-switch__text').text()).toBe(labelText)
  })

  it('applies disabled class and prevents interaction when isDisabled is true', () => {
    const wrapper = mount(ZmSwitch, {
      props: { modelValue: false, isDisabled: true },
    })

    expect(wrapper.classes()).toContain('zm-switch--disabled')
  })

  it('applies correct size class', () => {
    const wrapper = mount(ZmSwitch, {
      props: { modelValue: false, size: 'sm' },
    })

    expect(wrapper.classes()).toContain('zm-switch--sm')
  })

  it('generates unique id for input and label', () => {
    const wrapper = mount(ZmSwitch, {
      props: { modelValue: false, label: 'Label' },
    })

    const input = wrapper.find('input')
    const label = wrapper.find('label')

    expect(input.attributes('id')).toBeDefined()
    expect(label.attributes('for')).toBe(input.attributes('id'))
  })
})
