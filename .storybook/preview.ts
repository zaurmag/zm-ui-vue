import type { Preview } from '@storybook/vue3-vite'
import { StyleDecorator } from '../src/app/config/storybook/style-decorator'
import { IconsDecorator } from '../src/app/config/storybook/icons-decorator'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [StyleDecorator, IconsDecorator],
}

export default preview
