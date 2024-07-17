import { router } from 'expo-router'
import React from 'react'
import { useDispatch } from 'react-redux'
import TodoForm from '../components/TodoForm'
import { addTodo } from '../store/todoSlice'

const CreateScreen = () => {
  const dispatch = useDispatch()

  const handleSubmit = (todo: { title: string; description: string }) => {
    dispatch(addTodo({ ...todo, id: Date.now().toString(), completed: false }))
    router.back()
  }

  return <TodoForm onSubmit={handleSubmit} />
}

export default CreateScreen
