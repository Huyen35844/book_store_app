import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../views/Home'
import TabNavigator from './TabNavigator'
import EditProfile from '../views/EditProfile'
import Detail from '../views/Detail'

const AppNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='TabNavigator' component={TabNavigator} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='Detail' component={Detail} />
      
    </Stack.Navigator>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})