import type { ComputedRef, Ref,App } from "vue"
import type { Calculator } from "@/components/calculator/interface"

declare global {
  interface Window {
    global_vue_app_instance:App,
    ethereum: any,
    tronWeb: any
    global_properties_userToken:string
  }
}

export { }