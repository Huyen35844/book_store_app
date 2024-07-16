import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from '../ui/LoadingSpinner'

const Navigator = () => {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: "white"
        }
    }

    const { loggedIn, authState } = useAuth()

    return (
        <NavigationContainer theme={MyTheme}>
            <LoadingSpinner visiable={authState.pending} />
            {!loggedIn ? <AuthNavigator /> : <AppNavigator />}
        </NavigationContainer>
    )
}

export default Navigator
