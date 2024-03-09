import create from 'zustand'
import { devtools } from 'zustand/middleware'

export const createStore = (fn, name: string) => {
  if (process.env.NODE_ENV === 'development') {
    return create(devtools(fn, { name }))
  }

  return create(fn)
}

// import create, {
//   GetState,
//   SetState,
//   State,
//   StoreApi,
//   UseBoundStore
// } from 'zustand'
// import { devtools } from 'zustand/middleware'

// export type Store<T extends State> = UseBoundStore<T>

// export const createStore = <T extends State>(
//   fn: (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) => T,
//   name: string
// ): Store<T> => {
//   if (process.env.NODE_ENV === 'development') {
//     return create(devtools(fn, { name }))
//   }

//   return create(fn)
// }

//   "Я хочу создать универсальную функцию createStore с использованием zustand и devtools, которая позволит мне определять хранилища состояния с любым типом состояния. Функция должна принимать функцию инициализации состояния и имя хранилища в качестве параметров. В режиме разработки функция должна использовать devtools для отладки. Как я могу корректно определить типы для этой функции, учитывая специфику zustand и devtools?"
