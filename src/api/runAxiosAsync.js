import axios, { AxiosError } from "axios"

export const runAxiosAsync = async (promise) => {
    try {
        const response = await promise
        return { data: response.data, status: true }
    } catch (error) {
        let message = error.message
        if (error instanceof AxiosError) {
            const response = error.response
            if (response) {
                message = response.data.message
            }
        }

        return { data: message, status: false }
    }

}