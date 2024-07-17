import { Todo } from '@/store/todoSlice'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TouchableRipple, useTheme } from 'react-native-paper'

type TodoItemProps = {
  todo: Todo
  onPress: () => void
  onToggle: (completed: boolean) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onPress, onToggle }) => {
  const theme = useTheme()

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.container}>
        <TouchableRipple
          onPress={() => onToggle(!todo.completed)}
          style={styles.checkbox}
        >
          <MaterialCommunityIcons
            name={
              todo.completed ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'
            }
            size={24}
            color={todo.completed ? theme.colors.primary : theme.colors.backdrop}
          />
        </TouchableRipple>
        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              todo.completed && styles.completedTitle,
              { color: theme.colors.onSurface },
            ]}
            numberOfLines={1}
          >
            {todo.title}
          </Text>
          {todo.description ? (
            <Text
              style={[
                styles.description,
                todo.completed && styles.completedDescription,
                { color: theme.colors.onSurfaceVariant },
              ]}
              numberOfLines={2}
            >
              {todo.description}
            </Text>
          ) : null}
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={theme.colors.onSurfaceVariant}
          style={styles.chevron}
        />
      </View>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  checkbox: {
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.8,
  },
  completedDescription: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  chevron: {
    marginLeft: 8,
  },
})

export default TodoItem
