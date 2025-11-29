import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ZmTextarea from './zm-textarea.vue'

const meta = {
  title: 'ZM Textarea',
  component: ZmTextarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    error: { control: 'text' },
    cols: { control: 'number' },
    rows: { control: 'number' },
    isDisabled: { control: 'boolean' },
    width: { control: 'text' },
    height: { control: 'text' },
    // События
    'onUpdate:modelValue': { action: 'update:modelValue' },
    onBlur: { action: 'blur' },
  },
} satisfies Meta<typeof ZmTextarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: '',
    label: 'Поле текста',
    placeholder: 'Default placeholder',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: 'Поле отключено',
    label: 'Текстовое поле',
    isDisabled: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    modelValue: '',
    placeholder: 'Без заголовка',
  },
}

export const Error: Story = {
  args: {
    modelValue: '',
    label: 'Поле с ошибкой',
    error: 'Поле не должно быть пустым',
  },
}
