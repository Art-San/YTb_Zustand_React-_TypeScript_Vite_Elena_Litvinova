// import create from 'zustand'
// import { generateId } from '../helpers'
// import { persist, devtools } from 'zustand/middleware'
// import { createStore } from './createStore'

// interface Task {
//   id: string
//   title: string
//   createdAt: number
// }
// interface ToDoStore {
//   tasks: Task[]
//   tasksDone: Task[]
//   createTask: (title: string) => void
//   updateTask: (id: string, title: string) => void
//   removeTask: (id: string) => void
//   createTaskDone: () => void
//   deleteEverything: () => void
// }

// export const useToDoStore = createStore<ToDoStore>(
//   (set, get) => ({
//     tasks: [],
//     tasksDone: [],
//     createTask: (title) => {
//       const { tasks } = get()
//       console.log('set', set)

//       const newTask = {
//         id: generateId(),
//         title,
//         createdAt: Date.now()
//       }

//       set({
//         tasks: [newTask].concat(tasks)
//       })
//     },
//     updateTask: (id: string, title: string) => {
//       const { tasks } = get()
//       set({
//         tasks: tasks.map((task) => ({
//           ...task,
//           title: task.id === id ? title : task.title
//         }))
//       })
//     },
//     removeTask: (id: string) => {
//       const { tasks, tasksDone } = get()
//       set({
//         tasks: tasks.filter((task) => task.id !== id),
//         tasksDone: [...tasksDone].concat(tasks.filter((task) => task.id === id))
//       })
//     },
//     createTaskDone: () => {
//       const { tasksDone } = get()
//       const newTask = {
//         id: generateId(),
//         title: 'Fake repeated title',
//         createdAt: Date.now()
//       }

//       set({
//         tasksDone: [newTask].concat(tasksDone)
//       })
//     },
//     deleteEverything: () => {
//       set({}, true) // Грохает весь стор
//     }
//   }),
//   'Tasks-Test'
// )

// Работает хранилище и Редакс-тулс только TS ругается
import { generateId } from '../helpers'
import { persist, devtools } from 'zustand/middleware'
import { createStore } from './createStore'

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

export const useToDoStore = createStore<ToDoStore>(
  persist(
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

        set({
          tasks: [newTask].concat(tasks)
        })
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
        set({}, true)
      }
    }),
    { name: 'MyStore' }
  ),
  'Tasks-Test-test'
)
