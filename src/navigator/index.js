import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from '../ui/LoadingSpinner'
import { useDispatch } from 'react-redux'
import client from '../api/client'
import asyncStorage, { Keys } from '../utils/asycnStorage'
import { runAxiosAsync } from '../api/runAxiosAsync'
import { updateAuthState } from '../store/auth'
import { showMessage } from 'react-native-flash-message'
import useClient from '../hooks/useClient'

const Navigator = () => {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: "white"
        }
    }

    const dispatch = useDispatch()
    const { loggedIn, authState } = useAuth()
    const { authClient } = useClient()

    //Why don't we store loggedIn in asyncStorage because it causes the delay and show signIn screen
    const fetchAuthState = async () => {
        const token = await asyncStorage.get(Keys.ACCESS_TOKEN)
        // const token = await AsyncStorage.getItem("access-token")
        if (token) {
            dispatch(updateAuthState({ profile: null, pending: true }))
            const res = await runAxiosAsync(
                authClient.get("/auth/profile", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
            )
            if (res.status) {
                dispatch(updateAuthState({ profile: { ...res.data, accessToken: token }, pending: false }))
            } else {
                console.log(res.data);
                // showMessage({ message: res.data, type: 'danger' })
                dispatch(updateAuthState({ profile: null, pending: false }))
            }
        }
    }

    useEffect(() => {
        fetchAuthState()
    }, [])

    return (
        <NavigationContainer theme={MyTheme}>
            <LoadingSpinner visiable={authState.pending} />
            {!loggedIn ? <AuthNavigator /> : <AppNavigator />}
        </NavigationContainer>
    )
}

export default Navigator
