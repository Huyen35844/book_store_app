import React, { useEffect } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'
import useAuth from '../hooks/useAuth'
import LoadingSpinner from '../ui/LoadingSpinner'
import { useDispatch } from 'react-redux'
import asyncStorage, { Keys } from '../utils/asycnStorage'
import { runAxiosAsync } from '../api/runAxiosAsync'
import { updateAuthState } from '../store/auth'
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

    //Have just opened the app, run this function to get user's info and store it in profile state.
    //Base one profile state, decide the direction to navigate, app or auth navigator
    const fetchAuthState = async () => {
        const token = await asyncStorage.get(Keys.ACCESS_TOKEN)
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
                dispatch(updateAuthState({ profile: null, pending: false }))
            }
        }
    }

    useEffect(() => {
        fetchAuthState()
    }, [])

    return (
        <NavigationContainer theme={MyTheme}>
            {/* while is loading api, display the modal has animation loading from lottie file
            it depends on pending state  */}
            <LoadingSpinner visiable={authState.pending} />
            {!loggedIn ? <AuthNavigator /> : <AppNavigator />}
        </NavigationContainer>
    )
}

export default Navigator
