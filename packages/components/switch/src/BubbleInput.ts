import type { OkuElement } from '@oku-ui/primitive'
import { usePrevious, useSize } from '@oku-ui/use-composable'
import type {
  PropType,
  Ref,
} from 'vue'
import {
  defineComponent,
  h,
  ref,
  toRefs,
  watchEffect,
} from 'vue'

const BUBBLE_INPUT = 'OkuBubbleInput'

export type BubbleInputNaviteElement = OkuElement<'input'>
export type BubbleInputElement = HTMLInputElement

export interface BubbleInputProps extends Omit<BubbleInputElement, 'checked'> {
  checked: boolean
  control: HTMLElement | null
  bubbles: boolean
}

const bubbleInputProps = {
  props: {
    checked: {
      type: Boolean,
      default: undefined,
    },
    bubbles: {
      type: Boolean,
      default: true,
    },
    control: {
      type: Object as PropType<HTMLElement | null>,
      default: null,
    },
  },
}

export const BubbleInput = defineComponent({
  name: BUBBLE_INPUT,
  inheritAttrs: false,
  props: {
    ...bubbleInputProps.props,
  },
  setup(props, { attrs }) {
    const { control, checked, bubbles } = toRefs(props)
    const inputRef = ref<HTMLInputElement | null>(null)
    const prevChecked = usePrevious(checked)
    const controlSize = useSize(control as Ref<HTMLElement>)

    watchEffect(() => {
      const input = inputRef.value!
      const inputProto = window.HTMLInputElement.prototype
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        'checked',
      ) as PropertyDescriptor
      const setChecked = descriptor.set

      if (prevChecked.value !== checked.value && setChecked) {
        const event = new Event('click', { bubbles: bubbles.value })
        setChecked.call(input, checked.value)
        input.dispatchEvent(event)
      }
    })

    const originalReturn = () =>
      h('input', {
        'type': 'checkbox',
        'aria-hidden': true,
        'defaultChecked': checked.value,
        ...attrs,
        'tabindex': -1,
        'ref': inputRef,
        'style': {
          ...attrs.style as any,
          ...controlSize.value,
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          margin: 0,
        },
      })

    return originalReturn
  },
})

export const OkuBubbleInput = BubbleInput as typeof BubbleInput &
(new () => {
  $props: BubbleInputNaviteElement
})
