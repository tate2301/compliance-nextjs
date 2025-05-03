import { api } from "@/lib/auth"
import { Reference } from "@/lib/types"
import { isAxiosError } from "axios"

export const referenceService = {
    getUserReferences: async (userId: number): Promise<Reference[]> => {
        try {
            const response = await api.get(`/reference/for-user/${userId}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch references")
            }
            throw error
        }
    },
    getReference: async (id: number): Promise<Reference> => {
        try {
            const response = await api.get(`/reference/complete/${id}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch reference")
            }
            throw error
        }
    },
    addReference: async (reference: Reference): Promise<Reference> => {
        try {
            const response = await api.post(`/reference`, reference)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to add reference")
            }
            throw error
        }
    },
    updateReference: async (reference: Reference): Promise<Reference> => {
        try {
            const response = await api.post(`/reference/update/${reference.token}`, reference)
            return response.data 
        }  catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to update reference")
            }
            throw error
        }
    },
    deleteReference: async (id: number): Promise<any> => {
        try {
            const response = await api.delete(`/reference/delete/${id}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to delete reference")
            }
            throw error
        }
    },
    downloadReference: async (token: string): Promise<Blob> => {
        try {
            const response = await api.get(`/reference/download/${token}`, { responseType: 'blob' })
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to download reference")
            }
            throw error
        }
    }
}