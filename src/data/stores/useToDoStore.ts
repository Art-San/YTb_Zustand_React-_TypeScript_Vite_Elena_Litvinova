import create from 'zustand'
import { generateId } from '../helpers'
import { persist, devtools } from 'zustand/middleware'

interface Task {
  id: string
  title: string
  createdAt: number
}
interface ToDoStore {
  tasks: Task[]
  tasksDone: Task[]
  createTask: (title: string) => void
  updateTask: (id: string, title: string) => void
  removeTask: (id: string) => void
  createTaskDone: () => void
  deleteEverything: () => void
}
// Persist middleware
// export const useBearStore = create(
//   persist(
//     (set, get) => ({
//       bears: 0,
//       addABear: () => set({ bears: get().bears + 1 }),
//     }),
//     {
//       name: 'food-storage', // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//     },
//   ),
// )

// Redux devtools https://github.com/pmndrs/zustand?tab=readme-ov-file#:~:text=initialState))-,Redux%20devtools,-import%20%7B%20devtools
// Использование с простым хранилищем действий, оно записывает действия как "setState"
// const usePlainStore1 = create(devtools((set) => ..., { name, store: storeName1 }))
// const usePlainStore2 = create(devtools((set) => ..., { name, store: storeName2 }))
// Использование с резервным хранилищем, оно будет регистрировать полные типы действий
// const useReduxStore = create(devtools(redux(reducer, initialState)), , { name, store: storeName3 })
// const useReduxStore = create(devtools(redux(reducer, initialState)), , { name, store: storeName4 })

export const useToDoStore = create<ToDoStore>(
  persist(
    devtools(
      (set, get) => ({
        tasks: [],
        tasksDone: [],
        createTask: (title) => {
          const { tasks } = get()
          console.log('set', set)

          const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now()
          }

          set(
            {
              tasks: [newTask].concat(tasks)
            },
            false,
            'createTask'
          )
        },
        updateTask: (id: string, title: string) => {
          const { tasks } = get()
          set({
            tasks: tasks.map((task) => ({
              ...task,
              title: task.id === id ? title : task.title
            }))
          })
        },
        removeTask: (id: string) => {
          const { tasks, tasksDone } = get()
          set({
            tasks: tasks.filter((task) => task.id !== id),
            tasksDone: [...tasksDone].concat(
              tasks.filter((task) => task.id === id)
            )
          })
        },
        createTaskDone: () => {
          const { tasksDone } = get()
          const newTask = {
            id: generateId(),
            title: 'Fake repeated title',
            createdAt: Date.now()
          }

          set({
            tasksDone: [newTask].concat(tasksDone)
          })
        },
        deleteEverything: () => {
          set({}, true) // Грохает весь стор
        }
      }),
      { name: 'MyStore' }
    ),
    {
      name: 'tasks' // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage) // (необязательно) по умолчанию используется localStorage.
    }
  ) //
)

// const unsub2 = useToDoStore.subscribe(state => state.tasks, console.log)

// function isToDoStore(object: any): object is ToDoStore {
//     return 'tasks' in object;
// }

// const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
//     if (isToDoStore(nextState)) {
//         window.localStorage.setItem('tasks', JSON.stringify(
//             nextState.tasks
//         ));
//     }
//     set(nextState, ...args);
// }, get, api);

// const getCurrentState = () => {
//     try {
//         const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
//         return currentState;
//     } catch(err) {
//         window.localStorage.setItem('tasks', '[]');
//     }

//     return [];
// }
