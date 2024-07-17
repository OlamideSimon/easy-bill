import { RootState } from '@/store/store'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoForm from '../../components/TodoForm'
import { Todo, fetchTodo, updateTodo } from '../../store/todoSlice'

const EditScreen = () => {
  const dispatch: any = useDispatch()
  const { id } = useLocalSearchParams<{ id: string }>()

  const { currentTodo, status, error } = useSelector((state: RootState) => state.todos)

  useEffect(() => {
    if (id) {
      dispatch(fetchTodo(id))
    }
  }, [dispatch, id])

  const handleSubmit = (updatedTodo: { title: string; description: string }) => {
    dispatch(updateTodo({ ...(currentTodo as Todo), ...updatedTodo }))
    router.back()
  }

  return <TodoForm onSubmit={handleSubmit} initialValues={currentTodo as Todo} />
}

export default EditScreen
