import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ZmCheckbox from './zm-checkbox.vue'

const meta = {
  title: 'ZM Checkbox',
  component: ZmCheckbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    type: { control: 'select', options: ['checkbox', 'switch'] },
    size: { control: 'select', options: ['sm', 'lg'] },
    isDisabled: { control: 'boolean' },
    // События
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
} satisfies Meta<typeof ZmCheckbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: false,
    label: 'Просто чек-бокс',
  },
}

export const Small: Story = {
  args: {
    modelValue: false,
    label: 'Маленький чек-бокс',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    modelValue: false,
    label: 'Большой чек-бокс',
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: false,
    label: 'Отключенный чек-бокс',
    isDisabled: true,
  },
}

export const Switch: Story = {
  args: {
    modelValue: false,
    label: 'Switch',
    type: 'switch',
  },
}

export const BigSwitch: Story = {
  args: {
    modelValue: false,
    label: 'Большой Switch',
    type: 'switch',
    size: 'lg',
  },
}

export const SmallSwitch: Story = {
  args: {
    modelValue: false,
    label: 'Маленький Switch',
    type: 'switch',
    size: 'sm',
  },
}
