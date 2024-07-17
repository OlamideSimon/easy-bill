import { AppDispatch, RootState } from '@/store/store'
import { deleteTodo, fetchTodo } from '@/store/todoSlice'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import {
  ActivityIndicator,
  Button,
  Card,
  Paragraph,
  Title,
  useTheme,
} from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

const DetailScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useLocalSearchParams<{ id: string }>()
  const theme = useTheme()

  const { currentTodo, status, error } = useSelector((state: RootState) => state.todos)

  useEffect(() => {
    if (id) {
      dispatch(fetchTodo(id))
    }
  }, [dispatch, id])

  const handleDelete = () => {
    if (id) {
      dispatch(deleteTodo(id))
      router.back()
    }
  }

  if (status === 'loading') {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    )
  }

  if (status === 'failed' || !currentTodo) {
    return (
      <View style={[styles.container, styles.center]}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={50}
          color={theme.colors.error}
        />
        <Paragraph style={styles.errorText}>Error: {error || 'Todo not found'}</Paragraph>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{currentTodo.title}</Title>
          <Paragraph style={styles.description}>{currentTodo.description}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            onPress={() => router.push(`/edit/${id}`)}
            style={styles.editButton}
            icon="pencil"
          >
            Edit
          </Button>
          <Button
            mode="contained"
            onPress={handleDelete}
            style={styles.deleteButton}
            icon="delete"
          >
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  cardActions: {
    justifyContent: 'flex-end',
    padding: 16,
  },
  editButton: {
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
})

export default DetailScreen
