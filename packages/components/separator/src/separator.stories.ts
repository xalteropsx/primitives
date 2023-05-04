import type { Meta, StoryObj } from '@storybook/vue3'

import { OkuSeparator } from './separator'
import type { SeparatorProps } from './separator'

interface StoryProps extends SeparatorProps {
}

const meta = {
  title: 'Components/OkuSeparator',
  component: OkuSeparator,
  tags: ['autodocs'],
  // TODO: `render` TS props same problem as above
  render: (args: StoryProps) => ({
    components: { OkuSeparator },
    setup() {
      return { args }
    },
    template: `
      <div>
        <OkuSeparator class="my-4 h-[1px] bg-slate-500" />
        <h1>Horizontal</h1>
        <p>The following separator is horizontal and has semantic meaning.</p>
        <OkuSeparator class="border-0 bg-gray-300 my-4 h-[1px]" orientation="horizontal" />
        <p>
        The following separator is horizontal and is purely decorative. Assistive technology will
        ignore this element.
        </p>
        <OkuSeparator orientation="horizontal" class="border-0 my-4 bg-gray-500 w-full h-[1px]" decorative />
        <h1>Vertical</h1>
        <div class="flex items-center h-full">
            <p>The following separator is vertical and has semantic meaning.</p>
            <OkuSeparator class="w-[1px] mx-4 bg-slate-500 h-12" orientation="vertical" />
            <p>
                The following separator is vertical and is purely decorative. Assistive technology will
                ignore this element.
            </p>
            <OkuSeparator class="w-[1px] mr-4 bg-slate-400 h-12" orientation="vertical" decorative />
        </div>
        </div>
    `,
  }),
} satisfies Meta<typeof OkuSeparator>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
  },
}
