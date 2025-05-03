import { api } from "@/lib/auth"
import { DBS, DBSReference } from "@/lib/types"
import { isAxiosError } from "axios"

export const dbsService = {
    getDbsReference: async (): Promise<DBSReference[]> => {
        try {
            const response = await api.get(`/dbs/dbs-reference`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch DBS reference")
            }
            throw error
        }
    },
    getUserDbs: async (userId: number): Promise<DBS> => {
        try {
            const response = await api.get(`/dbs/${userId}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch DBS")
            }
            throw error
        }
    },
    addUserDbs: async (userId: number, dbs: DBS): Promise<DBS> => {
        try {
            const response = await api.post(`/dbs`, {...dbs, user_id: userId})
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to add DBS")
            }
            throw error
        }
    },
    updateUserDbs: async (id: number, dbs: DBS): Promise<DBS> => {
        try {
            const response = await api.post(`/dbs/update/${id}`, dbs)
            return response.data 
        }  catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to update DBS")
            }
            throw error
        }
    }
}