import { api } from "@/lib/auth"
import { Training, TrainingReference } from "@/lib/types"
import { isAxiosError } from "axios"

export const trainingsService = {
    getTrainingReference: async (): Promise<TrainingReference[]> => {
        try {
            const response = await api.get(`/trainings/reference`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch training reference")
            }
            throw error
        }
    },
    getUserTrainings: async (userId: number): Promise<Training[]> => {
        try {
            const response = await api.get(`/trainings/${userId}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch trainings")
            }
            throw error
        }
    },
    uploadTraining: async (formData: FormData): Promise<any> => {
        try {
            const response = await api.post(`/trainings`, formData)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to upload training")
            }
            throw error
        }
    },
    deleteTraining: async (payload: { id: number; withLinked: boolean }): Promise<any> => {
        try {
            const response = await api.post(`/trainings/delete`, payload)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to delete training")
            }
            throw error
        }
    }
}