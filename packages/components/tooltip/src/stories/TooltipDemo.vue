<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Styled from './Styled.vue'
import Controlled from './Controlled.vue'
import CustomDurations from './CustomDurations.vue'

export interface OkuTooltipProps {
  template?: 'Styled' | 'Controlled' | 'CustomDurations'
  allshow?: boolean
}

withDefaults(defineProps<OkuTooltipProps>(), {
  template: 'Styled',
})

const TooltipRef = ref()
onMounted(() => {
  console.log(TooltipRef.value)
})
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === 'Styled' || allshow" class="flex flex-col">
      <Styled />
    </div>
    <div v-if="template === 'Controlled' || allshow" class="flex flex-col">
      <Controlled />
    </div>

    <div v-if="template === 'CustomDurations' || allshow">
      <CustomDurations />
    </div>
  </div>
</template>

<style>
.triggerClass {}
.positionButtonClass {
  margin: 5px;
  border: 1px solid black;
  background: transparent;
}

.contentClass {
  transform-origin: var(--radix-tooltip-content-transform-origin);
  /* ensures content isn't selectable */
  /* this is just a detterent to people putting interactive content inside a `Tooltip.Root` */
  user-select: none;
  background-color: black;
  color: white;
  font-size: 12px;
  border-radius: 5px;
  padding: 10px;
  max-width: 300px;
}

.arrowClass {
  fill: black;
}

@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.animatedContentClass {
  & [data-state='delayed-open'] {
    animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  & [data-state='instant-open'] {
    animation: fadeIn 0.2s ease-out;
  }

  & [data-state='closed'] {
    animation: fadeOut 0.2s ease-out;
  }
}

.gridClass {
  display: inline-grid;
  grid-template-columns: repeat(3, 50px);
  column-gap: 150px;
  row-gap: 100px;
  padding: 100px;
  border: 1px solid black;
}

.chromaticTriggerClass {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: tomato;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.chromaticContentClass {
  box-sizing: border-box;
  display: grid;
  place-content: center;
  width: 60px;
  height: 60px;
  background-color: royalblue;
  color: white;
  font-size: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.chromaticArrowClass {
  fill: black;
}
</style>
