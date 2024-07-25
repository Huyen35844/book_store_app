import axios from "axios"
import client, { baseURL } from "../api/client"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import asyncStorage, { Keys } from "../utils/asycnStorage"
import { runAxiosAsync } from "../api/runAxiosAsync"
import { useDispatch, useSelector } from "react-redux"
import { getAuthState, updateAuthState } from "../store/auth"

const authClient = axios.create({ baseURL: baseURL })

const useClient = () => {
    const authState = useSelector(getAuthState)
    const dispatch = useDispatch()

    const token = authState.profile?.accessToken

    // An interceptor in the context of HTTP requests refers to a middleware function to intercept outgoing requests 
    // or incoming responses before they are handled by the application
    authClient.interceptors.request.use((config) => {
        if (!config.headers.Authorization) {
            config.headers.Authorization = "Bearer " + token
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })


    // This asynchronous function is triggered whenever a request fails due to an expired or invalid access token (typically resulting in a 401 response).
    const refreshAuthLogic = async (failedRequest) => {
        //read the refresh token from async storage
        const refreshToken = await asyncStorage.get(Keys.REFRESH_TOKEN)
        //then send request with that token to get new access and refresh token
        const options = { method: "POST", data: { refreshToken }, url: `${baseURL}/auth/grant-token` }
        const res = await runAxiosAsync(axios(options))
        // console.log("failed: ", JSON.stringify(failedRequest.response, null, 2));

        if (res.data.tokens) {
            failedRequest.response.config.headers.Authorization = "Bearer " + res.data.tokens.accessToken

            //to handle sign out if the token expired, updated the latest refresh token
            if (failedRequest.response.config.url === '/auth/sign-out') {
                failedRequest.response.config.data = { refreshToken: res.data.tokens.refreshToken }
            }

            await asyncStorage.save(Keys.ACCESS_TOKEN, res.data.tokens.accessToken)
            await asyncStorage.save(Keys.REFRESH_TOKEN, res.data.tokens.refreshToken)
            dispatch(updateAuthState({ profile: { ...authState.profile, accessToken: res.data.tokens.accessToken }, pending: false }))
            return Promise.resolve()
        }
    }

    // This function from axios-auth-refresh library sets up an interceptor on authClient that automatically calls refreshAuthLogic whenever a request receives a 401 response. 
    createAuthRefreshInterceptor(authClient, refreshAuthLogic)

    return { authClient }
}

export default useClient


