import type { Meta, StoryObj } from '@storybook/vue3'
import ZmInput from './zm-input.vue'

const meta = {
  title: 'ZM Input',
  component: ZmInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['md', 'lg'] },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof ZmInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modelValue: '',
    type: 'text',
    label: 'Текстовый инпут',
    placeholder: 'Проверка',
  },
}

export const Disabled: Story = {
  args: {
    modelValue: '',
    type: 'text',
    placeholder: 'Проверка',
    label: 'Текстовый инпут',
    isDisabled: true,
  },
}
