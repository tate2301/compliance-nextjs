import { api } from "@/lib/auth"
import { Document, DocumentReference, DocumentPayload } from "@/lib/types"
import { isAxiosError } from "axios"

export const documentsService = {
    getDocumentReference: async (): Promise<DocumentReference[]> => {
        try {
            const response = await api.get(`/documents/reference`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch document reference")
            }
            throw error
        }
    },
    getUserDocuments: async (userId: number): Promise<Document[]> => {
        try {
            const response = await api.get(`/documents/${userId}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch documents")
            }
            throw error
        }
    },
    uploadDocument: async (payload: any): Promise<any> => {
        try {
            const response = await api.post(`/documents`, payload)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to upload document")
            }
            throw error
        }
    },
    deleteDocument: async (id: number): Promise<any> => {
        try {
            const response = await api.delete(`/documents/delete/${id}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to delete document")
            }
            throw error
        }
    }
}