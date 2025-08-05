import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ZmInput from './zm-input.vue'

describe('ZmInput', () => {
  it('renders input correctly', () => {
    const wrapper = mount(ZmInput, {
      props: { type: 'text', modelValue: '', placeholder: 'Enter text' },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('placeholder')).toBe('Enter text')
  })

  it('updates value via v-model', async () => {
    const wrapper = mount(ZmInput, {
      props: { modelValue: '' },
    })

    const input = wrapper.find('input')
    await input.setValue('test value')
    expect(wrapper.emitted().change[0]).toEqual(['test value'])
  })

  it('emits blur event', async () => {
    const wrapper = mount(ZmInput, {
      props: { modelValue: '' },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')
    expect(wrapper.emitted().blur).toBeTruthy()
  })

  it('displays error message', () => {
    const wrapper = mount(ZmInput, {
      props: { error: 'This is an error', modelValue: '' },
    })

    const errorMessage = wrapper.find('.zm-input__error-message')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('This is an error')
  })

  // Проверка переключателя видимости пароля
  it('toggles password visibility', async () => {
    const wrapper = mount(ZmInput, {
      props: { type: 'password', modelValue: '' },
    })

    const button = wrapper.find('.zm-input__password-btn')
    const input = wrapper.find('input')

    expect(input.attributes('type')).toBe('password')

    await button.trigger('click')
    expect(input.attributes('type')).toBe('text')

    await button.trigger('click')
    expect(input.attributes('type')).toBe('password')
  })

  it('applies proper size classes', () => {
    const wrapper = mount(ZmInput, {
      props: { size: 'lg', modelValue: '' },
    })

    expect(wrapper.classes()).toContain('zm-input--lg')
  })

  it('renders as disabled when isDisabled prop is true', () => {
    const wrapper = mount(ZmInput, {
      props: { isDisabled: true, modelValue: '' },
    })

    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.classes()).toContain('zm-input__field')
  })
})
