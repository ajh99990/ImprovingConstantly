import type { ComputedRef } from "vue"

export interface Calculator {
  calculation: (num1: string | number) => void,
  result: ComputedRef<string>
}

declare module "~~/composables/useProcessScheduler/scheduler" {
   export interface componFuncCollectors{
    calculatorProvider?: Calculator 
  }
}