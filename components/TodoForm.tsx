import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

type TodoFormProps = {
  onSubmit: (values: { title: string; description: string }) => void
  initialValues?: { title: string; description: string }
}

const TodoForm = ({
  onSubmit,
  initialValues = {
    title: '',
    description: '',
  },
}: TodoFormProps) => {
  const [title, setTitle] = useState(initialValues.title || '')
  const [description, setDescription] = useState(initialValues.description || '')

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({ title, description })
      setTitle('')
      setDescription('')
    }
  }

  return (
    <View style={styles.form}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
})

export default TodoForm
