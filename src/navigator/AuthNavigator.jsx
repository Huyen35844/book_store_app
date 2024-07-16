import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import ForgetPassword from '../views/ForgetPassword'

const AuthNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
        </Stack.Navigator>
    )
}

export default AuthNavigator

const styles = StyleSheet.create({})