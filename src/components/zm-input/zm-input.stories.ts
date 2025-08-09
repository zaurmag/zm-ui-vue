import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ZmInput from './zm-input.vue'

const meta = {
  title: 'ZM Input',
  component: ZmInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    isDisabled: { control: 'boolean' },
    width: { control: 'text' },
  },
} satisfies Meta<typeof ZmInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: '',
    type: 'text',
    label: 'Стандартный размер',
    placeholder: 'Default',
  },
}

export const Small: Story = {
  args: {
    modelValue: '',
    type: 'text',
    label: 'Маленький размер',
    placeholder: 'sm',
    size: 'sm'
  },
}

export const Large: Story = {
  args: {
    modelValue: '',
    type: 'text',
    label: 'Большой размер',
    placeholder: 'lg',
    size: 'lg'
  },
}

export const Disabled: Story = {
  args: {
    modelValue: 'Поле отключено',
    type: 'text',
    label: 'Текстовый инпут',
    isDisabled: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    modelValue: '',
    type: 'text',
    placeholder: 'Без заголовка'
  },
}

export const Password: Story = {
  args: {
    modelValue: '',
    label: 'Поле пароля',
    type: 'password',
    placeholder: 'Введите пароль',
    // size: 'lg'
  },
}

export const Error: Story = {
  args: {
    modelValue: '',
    label: 'Поле с ошибкой',
    type: 'text',
    error: 'Поле не должно быть пустым'
  },
}
