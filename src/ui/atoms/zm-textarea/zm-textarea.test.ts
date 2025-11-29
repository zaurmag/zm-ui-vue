import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ZmTextarea from './zm-textarea.vue'

describe('ZmTextarea', () => {
  it('renders textarea correctly', () => {
    const wrapper = mount(ZmTextarea, {
      props: { modelValue: '', placeholder: 'Enter text' },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    expect(textarea.attributes('placeholder')).toBe('Enter text')
  })

  it('updates value via v-model', async () => {
    const wrapper = mount(ZmTextarea, {
      props: { modelValue: 'initial' },
    })

    const textarea = wrapper.find('textarea')
    await textarea.setValue('test value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test value'])
  })

  it('emits blur event', async () => {
    const wrapper = mount(ZmTextarea, {
      props: { modelValue: '' },
    })

    const textarea = wrapper.find('textarea')
    await textarea.trigger('blur')
    expect(wrapper.emitted().blur).toBeTruthy()
  })

  it('displays error message', () => {
    const wrapper = mount(ZmTextarea, {
      props: { error: 'This is an error', modelValue: '' },
    })

    const errorMessage = wrapper.find('.zm-textarea__error-message')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('This is an error')
  })

  it('renders as disabled when isDisabled prop is true', () => {
    const wrapper = mount(ZmTextarea, {
      props: { isDisabled: true, modelValue: '' },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('disabled')).toBeDefined()
    expect(textarea.classes()).toContain('zm-textarea__field')
  })
})
