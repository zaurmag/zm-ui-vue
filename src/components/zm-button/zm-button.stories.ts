import type { Meta, StoryObj } from '@storybook/vue3'
import { THEMES } from '@/shared/config'
import ZmButton from './zm-button.vue'

const meta = {
  title: 'ZM Button',
  component: ZmButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
    theme: { control: 'select', options: THEMES },
    isAnimation: { control: 'boolean' },
  },
} satisfies Meta<typeof ZmButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Для default слота
    default: 'Стандартная кнопка',

    // Для именованных слотов
    // slots: {
    //   header: '<h2>Заголовок</h2>',
    //   footer: '<footer>Подвал</footer>',
    // },
  },
}

export const Animation: Story = {
  args: {
    // Для default слота
    default: 'Кнопка с анимацией',
    theme: 'primary',
    isAnimation: true,

    // Для именованных слотов
    // slots: {
    //   header: '<h2>Заголовок</h2>',
    //   footer: '<footer>Подвал</footer>',
    // },
  },
}
