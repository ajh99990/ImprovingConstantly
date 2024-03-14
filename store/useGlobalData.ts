import { defineStore } from "pinia"

interface GlobalDataState {
  language: string,
  test1: string,
  test2: string,
  testObj: {myAge:string},
}


export default defineStore<string, GlobalDataState>("globalData", {
  state: () => {
    return {
      language:'zh',
      test1: "1",
      test2: "2",
      testObj: { myAge: "3" }
    }
  },
  /** 需要缓存的state的key值 */
  persistentState: (names) => {
    return [names.test1, names.testObj]
  },
})