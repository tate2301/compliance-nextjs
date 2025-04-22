import { User } from "../types";

export interface Login {
    email: string;
    password: string;
    remeberMe: boolean;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface AuthError {
    error?: string;
    message?: string;
}