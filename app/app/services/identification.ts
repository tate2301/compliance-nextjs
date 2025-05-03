import { api } from "@/lib/auth"
import { ID, IDReference } from "@/lib/types"
import { isAxiosError } from "axios"

export const identificationService = {
    getIdReference: async (): Promise<IDReference[]> => {
        try {
            const response = await api.get(`/identification/reference`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch ID reference")
            }
            throw error
        }
    },
    getUserId: async (userId: number): Promise<ID> => {
        try {
            const response = await api.get(`/identification/${userId}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch ID")
            }
            throw error
        }
    },
    addUserId: async (userId: number, id: ID): Promise<ID> => {
        try {
            const response = await api.post(`/identification`, {...id, user_id: userId})
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to add ID")
            }
            throw error
        }
    },
    updateUserId: async (id: number, payload: ID): Promise<ID> => {
        try {
            const response = await api.post(`/identification/update/${id}`, payload)
            return response.data 
        }  catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to update ID")
            }
            throw error
        }
    }
}