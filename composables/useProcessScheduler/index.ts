import useScheduler from "./scheduler"
import type { ManagerScheduler } from "./scheduler"
let managerScheduler: ManagerScheduler
export default (() => {
  return managerScheduler ? managerScheduler : (managerScheduler = useScheduler());
})
