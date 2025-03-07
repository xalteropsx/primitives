import type { PropType } from 'vue'
import { Transition, defineComponent, h, toRefs } from 'vue'

import { useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import type { isPresent } from '@oku-ui/presence'
import { OkuPresence } from '@oku-ui/presence'
import { OkuCollapsibleContentImpl } from './collapsibleContentImpl'
import { useCollapsibleInject } from './collapsible'
import { scopeCollapsibleProps } from './utils'

export const CONTENT_NAME = 'OkuCollapsibleContent'

export type CollapsibleContentNaviteElement = OkuElement<'div'>
export type CollapsibleContentElement = HTMLDivElement

export interface CollapsibleContentProps extends PrimitiveProps {
  /**
 * Used to force mounting when more control is needed. Useful when
 * controlling animation with React animation libraries.
 */
  forceMount?: true
}

export const collapsibleContentProps = {
  props: {
    /**
    * Used to force mounting when more control is needed. Useful when
    * controlling animation with React animation libraries.
    */
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
}

const collapsibleContent = defineComponent({
  name: CONTENT_NAME,
  components: {
    OkuCollapsibleContentImpl,
    Transition,
  },
  inheritAttrs: false,
  props: {
    ...collapsibleContentProps.props,
    ...scopeCollapsibleProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuCollapsible, forceMount } = toRefs(props)
    const { ...contentAttrs } = attrs as CollapsibleContentNaviteElement

    const context = useCollapsibleInject(CONTENT_NAME, scopeOkuCollapsible.value)

    const forwardedRef = useForwardRef()

    // TODO: Transition
    const originalReturn = () => h(
      OkuPresence,
      {
        present: forceMount.value || context.open.value,
      },
      {
        default: ({ isPresent }: { isPresent: isPresent }) => h(
          OkuCollapsibleContentImpl,
          {
            ...contentAttrs as any,
            ref: forwardedRef,
            asChild: props.asChild,
            scopeCollapsible: scopeOkuCollapsible.value,
            present: isPresent,
          },
          {
            default: () => slots.default && slots.default(),
          },
        ),
      },
    )

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCollapsibleContent = collapsibleContent as typeof collapsibleContent &
(new () => {
  $props: CollapsibleContentNaviteElement
})
