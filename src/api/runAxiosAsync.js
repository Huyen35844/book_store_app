import { AxiosError } from "axios"

/**
 * Purpose: avoid repeating try catch block over and over again
 * Return:  "data" is the result sent by server, "status": false || true (failed || successful)
 */
export const runAxiosAsync = async (promise) => {
    try {
        const response = await promise
        return { data: response.data, status: true }
    } catch (error) {
        let message = error.message
        if (error instanceof AxiosError) {
            const response = error.response
            if (response) {
                message = response.data
            }
        }

        return { data: message, status: false }
    }

}