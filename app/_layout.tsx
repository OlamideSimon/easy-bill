import { store } from '@/store/store'
import { Stack } from 'expo-router'
import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
}

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Todos' }} />
          <Stack.Screen name="todo/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="create" options={{ title: 'Create Todo' }} />
          <Stack.Screen name="edit/[id]" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </ReduxProvider>
  )
}

export default App
