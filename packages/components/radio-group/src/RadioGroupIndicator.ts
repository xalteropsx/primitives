import { defineComponent, h } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import type { RadioElement } from './Radio'
import { useRadioScope } from './Radio'
import { OkuRadioIndicator } from './RadioIndicator'
import type { RadioIndicatorNaviteElement, RadioIndicatorProps } from './RadioIndicator'
import { scopeRadioGroupProps } from './utils'
import { radioGroupProps } from './RadioGroup'

const INDICATOR_NAME = 'OkuRadioGroupIndicator'

export type RadioGroupIndicatorNaviteElement = RadioIndicatorNaviteElement
export type RadioGroupIndicatorElement = RadioElement

export interface RadioGroupIndicatorProps extends RadioIndicatorProps {}

export const radioGroupIndicatorProps = {
  props: {
    ...radioGroupProps.props,
  },
}

const RadioGroupIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: false,
  props: {
    ...radioGroupIndicatorProps.props,
    ...scopeRadioGroupProps,
  },
  setup(props, { attrs }) {
    const { scopeOkuRadioGroup } = props
    const radioScope = useRadioScope(scopeOkuRadioGroup)
    const forwardedRef = useForwardRef()

    return () => h(OkuRadioIndicator,
      {
        ...attrs,
        ...radioScope,
        ref: forwardedRef,
      },
    )
  },
})

export const OkuRadioGroupIndicator = RadioGroupIndicator as typeof RadioGroupIndicator &
(new () => {
  $props: RadioGroupIndicatorNaviteElement
})
