import { RootState } from '@/store/store'
import { fetchTodos, updateTodo } from '@/store/todoSlice'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import TodoList from '../components/TodoList'

const HomeScreen = () => {
  const todos = useSelector((state: RootState) => state.todos.todos)
  const dispatch: any = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const handleTodoToggle = (id: string, completed: boolean) => {
    dispatch(
      updateTodo({
        id,
        completed,
      })
    )
  }

  return (
    <View style={styles.container}>
      <TodoList
        onTodoToggle={handleTodoToggle}
        todos={todos}
        onTodoPress={(todo) => router.push(`todo/${todo.id}`)}
      />
      <FAB style={styles.fab} icon="plus" onPress={() => router.push('create')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 20,
  },
})

export default HomeScreen
