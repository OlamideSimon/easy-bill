import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
}

interface TodoState {
  todos: Todo[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  currentTodo: Todo | null
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
  currentTodo: null,
}

export const fetchTodos = createAsyncThunk<Todo[]>('todos/fetchTodos', async () => {
  const todosJson = await AsyncStorage.getItem('todos')
  return todosJson ? JSON.parse(todosJson) : []
})

export const fetchTodo = createAsyncThunk<Todo, string, { state: { todos: TodoState } }>(
  'todos/fetchTodo',
  async (id, { getState, rejectWithValue }) => {
    const state = getState()
    const todo = state.todos.todos.find((todo) => todo.id === id)
    if (todo) {
      return todo
    }
    // If not found in state, try to fetch from AsyncStorage
    const todosJson = await AsyncStorage.getItem('todos')
    const todos: Todo[] = todosJson ? JSON.parse(todosJson) : []
    const storedTodo = todos.find((todo) => todo.id === id)
    if (storedTodo) {
      return storedTodo
    }
    return rejectWithValue('Todo not found')
  }
)

export const saveTodos = createAsyncThunk<void, Todo[]>(
  'todos/saveTodos',
  async (todos) => {
    await AsyncStorage.setItem('todos', JSON.stringify(todos))
  }
)

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
      saveTodos(state.todos)
    },
    updateTodo: (state, action: PayloadAction<Partial<Todo>>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload }
        saveTodos(state.todos)
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      saveTodos(state.todos)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
      .addCase(fetchTodo.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentTodo = action.payload
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) || 'Could not fetch todo'
      })
  },
})

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer
