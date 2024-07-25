import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import EditProfile from '../views/EditProfile'
import Detail from '../views/Detail'
import Payment from '../views/Payment'
import Cart from '../views/Cart'
import History from '../views/History'
import SecurityPolicy from '../views/SecurityPolicy'
import TermsAndConditions from '../views/TermsAndConditions'
import QAndA from '../views/QAndA'

const AppNavigator = () => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='TabNavigator' component={TabNavigator} />
      {/* Screens display without bottomTab */}
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='Detail' component={Detail} />
      <Stack.Screen name='Payment' component={Payment} />
      <Stack.Screen name='Cart' component={Cart} />
      <Stack.Screen name='History' component={History} />
      <Stack.Screen name='SecurityPolicy' component={SecurityPolicy} />
      <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} />
      <Stack.Screen name='QAndA' component={QAndA} />
    </Stack.Navigator>
  )
}

export default AppNavigator
