import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ZmSwitch from './zm-switch.vue'

const meta = {
  title: 'ZM Switch',
  component: ZmSwitch,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: ['sm', 'lg'] },
    isDisabled: { control: 'boolean' },
    // События
    'onUpdate:modelValue': { action: 'update:modelValue' },
  },
} satisfies Meta<typeof ZmSwitch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: false,
    label: 'Просто свитч',
  },
}

export const Small: Story = {
  args: {
    modelValue: false,
    label: 'Маленький свитч',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    modelValue: false,
    label: 'Большой свитч',
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: false,
    label: 'Отключенный свитч',
    isDisabled: true,
  },
}
