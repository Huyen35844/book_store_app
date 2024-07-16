import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'

const Navigator = () => {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: "white"
        }
    }

    return (
        <NavigationContainer theme={MyTheme}>
            <AuthNavigator />
            {/* <AppNavigator /> */}
        </NavigationContainer>
    )
}

export default Navigator

const styles = StyleSheet.create({})