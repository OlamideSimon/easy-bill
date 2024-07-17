import { Todo } from '@/store/todoSlice'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Divider, List, Text } from 'react-native-paper'
import TodoItem from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  onTodoPress: (todo: Todo) => void
  onTodoToggle: (id: string, completed: boolean) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onTodoPress, onTodoToggle }) => (
  <FlatList
    data={todos}
    renderItem={({ item }) => (
      <TodoItem
        todo={item}
        onPress={() => onTodoPress(item)}
        onToggle={(completed) => onTodoToggle(item.id, completed)}
      />
    )}
    keyExtractor={(item) => item.id}
    ItemSeparatorComponent={() => <Divider />}
    contentContainerStyle={styles.listContent}
    ListEmptyComponent={
      <View style={styles.emptyList}>
        <List.Icon icon="playlist-remove" color="#888" />
        <Text style={styles.emptyText}>No todos yet</Text>
      </View>
    }
  />
)

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    marginTop: 10,
    color: '#888',
    fontSize: 16,
  },
})

export default TodoList
