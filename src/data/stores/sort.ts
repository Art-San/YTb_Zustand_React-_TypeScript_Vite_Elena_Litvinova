// const handleDragEnd = (event: any) => {
//   const { active, over } = event

//   if (active.id !== over.id) {
//     const newIndex = filteredTodos.findIndex((todo) => todo.id === over.id)
//     setFilteredTodos((filteredTodos) => {
//       const oldIndex = filteredTodos.findIndex((todo) => todo.id === active.id)

//       return arrayMove(filteredTodos, oldIndex, newIndex)
//     })

//     reorderTodo(active.id, newIndex)
//   }
// }

// import { create } from 'zustand'

// export const useTodosStore = create(() => ({
//   todos: [
//     { id: 1, text: 'Learn TypeScript', done: true },
//     { id: 2, text: 'Try immer', done: false },
//     { id: 3, text: 'Tweet about it', done: false }
//   ],
//   addTodo: (text: string, done: boolean) => {
//     useTodosStore.setState((state) => ({
//       todos: [...state.todos, { id: state.todos.length + 1, text, done: done }]
//     }))
//   },
//   toggleTodo: (id: number) =>
//     useTodosStore.setState((state) => ({
//       todos: state.todos.map((todo) =>
//         todo.id === id ? { ...todo, done: !todo.done } : todo
//       )
//     })),
//   removeTodo: (id: number) =>
//     useTodosStore.setState((state) => ({
//       todos: state.todos.filter((todo) => todo.id !== id)
//     })),

//   reorderTodo: (id: number, position: number) =>
//     useTodosStore.setState((state) => {
//       const todos = [...state.todos]
//       const todo = todos.find((todo) => todo.id === id)
//       if (!todo) return
//       const idx = todos.indexOf(todo)
//       todos.splice(idx, 1)
//       todos.splice(position, 0, todo)
//       return { todos }
//     })
// }))
