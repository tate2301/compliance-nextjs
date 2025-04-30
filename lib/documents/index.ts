import axios from "axios";
import { api } from "../auth";
import { StaffDocument } from "../types";

export const documentsService = {
  getDocuments: async (params?: {
    page: number;
    limit: number;
  }): Promise<Array<StaffDocument>> => {
    try {
      const response = await api.get("/form", { params });
      return response.data as Array<StaffDocument>;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch documents"
        );
      }
      throw error;
    }
  },
  getDocumentById: async (params: { id: string }): Promise<StaffDocument> => {
    try {
      const response = await api.get(`/form/${params.id}`);
      return response.data as StaffDocument;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch document"
        );
      }
      throw error;
    }
  },

  getPendingDocuments: async (
    userId: string
  ): Promise<Array<StaffDocument>> => {
    try {
      const response = await api.get(`/user-form/${userId}`);
      return response.data as Array<StaffDocument>;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch documents"
        );
      }
      throw error;
    }
  },
  getDocumentsByStatus: async (
    status: "completed" | "archived"
  ): Promise<Array<StaffDocument>> => {
    try {
      const response = await api.get("/user-form");
      return response.data as Array<StaffDocument>;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch documents"
        );
      }
      throw error;
    }
  },
};
