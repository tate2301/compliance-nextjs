import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.compliance-aid.co.uk/api/v1';

// Configure axios defaults
const api = axios.create({
    baseURL: API_BASE,
    // withCredentials: true,
    validateStatus: (status) => {
        return status >= 200 && status < 400; // Accept 3xx status codes
    }
});

// Add request interceptor to ensure headers are set
api.interceptors.request.use((config) => {
    // Set headers explicitly
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';

    // Log the full request configuration for debugging
    console.log('Full Request Config:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        withCredentials: config.withCredentials,
        data: config.data
    });

    return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log('Response Details:', {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data,
            config: response.config
        });
        return response;
    },
    (error) => {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error Details:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                headers: error.response?.headers,
                data: error.response?.data,
                config: error.config
            });

            // If we got a redirect, log the location
            if (error.response?.status === 302) {
                console.log('Redirect Location:', error.response.headers.location);
            }
        }
        throw error;
    }
);

export const authService = {
    async login(credentials: { email: string; password: string }) {
        try {
            const response = await api.post('/authentication/login', credentials, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            // If we get a redirect response, follow it manually
            if (response.status === 302 && response.headers.location) {
                console.log('Following redirect to:', response.headers.location);
                const redirectResponse = await api.get(response.headers.location);
                return redirectResponse;
            }

            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Login Error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    headers: error.response?.headers
                });
                throw new Error(error.response?.data?.message || 'Login failed');
            }
            throw error;
        }
    },

    async resetPassword(email: string) {
        try {
            const response = await api.post('/authentication/forgot-password', { email });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Password reset failed');
            }
            throw error;
        }
    },

    async setNewPassword(token: string, password: string) {
        try {
            const response = await api.post('/authentication/reset-password', { token, password });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Setting new password failed');
            }
            throw error;
        }
    },

    async verifyEmail(token: string) {
        try {
            const response = await api.get(`/authentication/verify-account/${token}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Email verification failed');
            }
            throw error;
        }
    },

    async resendVerification(email: string) {
        try {
            const response = await api.get(`/authentication/resend-welcome-email/${email}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Failed to resend verification');
            }
            throw error;
        }
    }
};