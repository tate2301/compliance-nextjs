import { api } from "@/lib/auth"
import { User } from "@/lib/types"
import { isAxiosError } from "axios"

export const userService = {
    getUser: async (userId: number): Promise<User> => {
        try {
            const response = await api.get(`/user/single/${userId}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch user data")
            }
            throw error
        }
    },
    updateUser: async (userId: number, data: Partial<User>): Promise<User> => {
        try {
            const response = await api.put(`/user/${userId}`, data)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to update user data")
            }
            throw error
        }
    }
}