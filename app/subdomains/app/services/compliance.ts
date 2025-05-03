import { api } from "@/lib/auth"
import { BasicRequirements, UpdatePayload } from "@/lib/types"
import axios from "axios"

export const complianceService = {
    getBasicComplianceReq: async (): Promise<BasicRequirements> => {
        try {
            const response = await api.get('/compliance/basic-compliance')
            return response.data
        }
        catch(error) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                  error.response?.data?.message || "Failed to fetch documents"
                );
              }
              throw error;
        }
    },
    generateProfile: async (id: number, provider: "cygnet" | "elysium") => {
        const response = await api.get(`/profiles/${provider}/${id}`, {responseType: "blob"})
        return response
    },
    updateTrainings: async ( payload: UpdatePayload) => {
        const response = await api.post(`/compliance/update-trainings`, payload)
        return response 
    },
    updateDocuments: async (payload: UpdatePayload) => {
        const response = await api.post(`/compliance/update-documents`, payload)
        return response
    },
    updateBasicReq: async (payload: BasicRequirements) => {
        const response = await api.post(`/compliance/update-basic-req`, payload)
        return response 
    }
}