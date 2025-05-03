import { api } from "@/lib/auth"
import { Address } from "@/lib/types"
import { isAxiosError } from "axios"

export const addressService = {
    getUserAddress: async (userId: number): Promise<Address> => {
        try {


            const response = await api.get(`/address/${userId}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to fetch address")
            }
            throw error
        }
    },
    addUserAddress: async (userId: number, address: Address): Promise<Address> => {
        try {
            const response = await api.post(`/address`, {...address, user_id: userId})
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to add address")
            }
            throw error
        }
    },
    updateAddress: async (address: Address): Promise<Address> => {
        try {
            const response = await api.post(`/address/update/${address.id}`, address)
            return response.data 
        }  catch (error) {
            if (isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Failed to update address")
            }
            throw error
        }
    }
}