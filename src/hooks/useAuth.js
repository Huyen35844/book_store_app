import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from "react-redux"
import { getAuthState, updateAuthState } from "../store/auth"
import { runAxiosAsync } from "../api/runAxiosAsync"
import client from "../api/client"
import asyncStorage, { Keys } from "../utils/asycnStorage"
import useClient from "./useClient"
import { showMessage } from "react-native-flash-message"


const useAuth = () => {
    const dispatch = useDispatch()
    const authState = useSelector(getAuthState)
    const { authClient } = useClient()

    const signIn = async (userInfo) => {
        dispatch(updateAuthState({ profile: null, pending: true }))
        const res = await runAxiosAsync(
            client.post("/auth/sign-in", userInfo)
        )

        if (!res.status) {
            dispatch(updateAuthState({ profile: null, pending: false }))
            return {
                data: res.data,
                status: res.status
            }
        }
        else {
            await asyncStorage.save(Keys.ACCESS_TOKEN, res.data.tokens.access)
            await asyncStorage.save(Keys.REFRESH_TOKEN, res.data.tokens.refresh)
            // await AsyncStorage.setItem("access-token", res.data.tokens.access)
            // await AsyncStorage.setItem("refresh-token", res.data.tokens.refresh)
            dispatch(updateAuthState({ profile: { ...res.data.profile, accessToken: res.data.tokens.access }, pending: false }))
            return { data: res.data, status: res.status }
        }
    }

    const signOut = async () => {
        //1. currently we use refreshToken stored in asyncStorage
        const refreshToken = await asyncStorage.get(Keys.REFRESH_TOKEN)
        dispatch(updateAuthState({ profile: authState.profile, pending: true }))
        const res = await runAxiosAsync(
            //2. Inside authClient, start to check acceess token, if it expired, we will get new tokens. 
            //But 1. uses the old refresh token. It causes the problem with signOut
            //The solution in useClient file
            authClient.post("/auth/sign-out", { refreshToken })
        )
        if (!res.status) {
            dispatch(updateAuthState({ profile: authState.profile, pending: false }))
            return showMessage({ message: res.data, type: "danger" })
        }
        await asyncStorage.remove(Keys.ACCESS_TOKEN)
        await asyncStorage.remove(Keys.REFRESH_TOKEN)
        dispatch(updateAuthState({ profile: null, pending: false }))
    }
    const loggedIn = authState.profile ? true : false

    //whenever I want to get the authState, just write as {authState} = useAuth(), avoid repeating const authState = useSelector(getAuthState)
    return { signIn, authState, loggedIn, signOut }
}

export default useAuth